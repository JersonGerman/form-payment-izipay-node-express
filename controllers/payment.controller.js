const axios = require("axios").default;
const { HmacSHA256 } = require("crypto-js");
const Hex = require("crypto-js/enc-hex");
const dotenv = require("dotenv");
const { v4: uuid } = require("uuid");
const { genRandonString, getDateUTC, getSignature } = require("../helpers/helpers");

// Variable de entorno
dotenv.config({ path: "./.env" });

let PASSWORD = "";
let KEY = "";

if(process.env.MODE === "TEST") {
  KEY = process.env.CLAVE_TEST;
  PASSWORD = process.env.TEST_PASSWORD;
}
else {
  KEY = process.env.CLAVE_PRODUCCION;
  PASSWORD = process.env.PROD_PASSWORD;
}

const createPayment = (req, res) => {
  const {name, lastName, amount, email} = req.body;

  const body = {
    amount: amount * 100,
    currency: "USD",
    customer: {
      email,
      billingDetails: {
        firstName: name,
        lastName,
      }
    },
    orderId: `order-${ uuid() }`
  }
  
  const auth = btoa(`${process.env.ID_TIENDA}:${PASSWORD}`);
  axios
    .post(
      "https://api.micuentaweb.pe/api-payment/V4/Charge/CreatePayment",
      body,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    )
    .then((rpta) => {
      { 
        // console.log(rpta);
        res.status(200).json({ formToken: rpta.data.answer.formToken });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json("Error server");
    });
};

const validatePayment = (req, res) => {
  const { clientAnswer, hash, hashKey } = req.body;
  let key = "";
  if (hashKey === "sha256_hmac") {
    // key => HMAC-SHA-256 OF YOUR BACK OFFICE
    key = process.env.TEST_KEY_HMAC_SHA_256;
  } else if (hashKey === "password") {
    // key => testPassword OF YOUR BACK OFFICE
    key = process.env.TEST_PASSWORD;
  }

  const answerHash = Hex.stringify(
    HmacSHA256(JSON.stringify(clientAnswer), key)
  );

  if (hash === answerHash) res.status(200).json("Valid Payment");
  else res.status(500).json("Payment hash mismatch");
};

const paymentForm = (req, res) => {
  const {amount, email, currency} = req.body;
  const params = new URLSearchParams();
  const obj = {
    vads_action_mode: "INTERACTIVE",
    vads_amount: amount*100,
    vads_ctx_mode: process.env.MODE,
    vads_currency: currency=="PEN"?604:840,
    vads_cust_email: email && "example@gmail.com",
    vads_order_id: new Date().getTime(),
    vads_page_action: "PAYMENT",
    vads_payment_config: "SINGLE",
    vads_site_id: process.env.ID_TIENDA,
    vads_trans_date: getDateUTC(),
    vads_trans_id: genRandonString(6),
    vads_version: "V2",
  }

  for (const property in obj) {
    params.append(property, obj[property])
  }

  const signature = getSignature(obj, KEY);
  params.append("signature", signature);

  axios.post("https://secure.micuentaweb.pe/vads-payment/entry.silentInit.a", params)
  .then(response => {
    res.status(200).json(response.data)
  })
  .catch(error => {
    res.status(400).json(error.message)
  })

}




module.exports = { createPayment, validatePayment, paymentForm };
 
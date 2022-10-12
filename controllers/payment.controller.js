const axios = require("axios").default;
const { HmacSHA256 } = require("crypto-js");
const Hex = require("crypto-js/enc-hex");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const createPayment = (req, res) => {
  const body = req.body;
  const auth = btoa(`${process.env.ID_STORE}:${process.env.TEST_PASSWORD}`);
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

module.exports = { createPayment, validatePayment };
 
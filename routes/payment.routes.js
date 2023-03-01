const express = require("express");

const router = express.Router();

const {
  createPayment,
  validatePayment,
  paymentForm,
} = require("../controllers/payment.controller");

router.post("/createPayment", createPayment);
router.post("/validatePayment", validatePayment);

router.post("/paymentForm", paymentForm)

module.exports = { paymentRouter: router };
const express = require("express");

const router = express.Router();

const {
  createPayment,
  validatePayment,
} = require("../controllers/payment.controller");

router.post("/createPayment", createPayment);

router.post("/validatePayment", validatePayment);

module.exports = { paymentRouter: router };

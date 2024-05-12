const express = require("express");
const { fetchAllProducts, createCheckoutSession, verifySession } = require("../resources/stripe.controllers.js");
const router = express.Router();

router.get("/products", fetchAllProducts);
router.post("/create-checkout-session", createCheckoutSession);
router.post("/verify-session", verifySession);

module.exports = router;
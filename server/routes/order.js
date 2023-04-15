const express = require("express");
const { Order } = require("../models/order");
const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

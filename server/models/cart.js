const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  cartItems: [
    {
      productId: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      color: {
        type: String,
      },
      images: {
        type: String,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      retailPrice: {
        type: Number,
      },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

exports.Cart = Cart;

const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
  },
  // You can add more fields as needed
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;

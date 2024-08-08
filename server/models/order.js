// orderModel.js
const mongoose = require('mongoose');

// Define the Mongoose schema for orders
const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
});

// Create the Mongoose model
const Order = mongoose.model('Order', orderSchema);

// Export the Order model
module.exports = Order;

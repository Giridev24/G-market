// controllers/orderController.js
const Order = require('../models/order');

const createOrder = async (req, res) => {
  try {
    const { uname, name, address, contact } = req.body;
    const order = new Order({ uname, name, address, contact });
    await order.save();
    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const orderDetails = async (req, res) => {
  try {
    const allData = await Order.find();
    res.json(allData);
    
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data"); 
  }
}

module.exports = { createOrder, orderDetails };

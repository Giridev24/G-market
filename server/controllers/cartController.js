// controllers/cartController.js
const CartItem = require('../models/cart');


const getAllCartIds = async(req,res) => {
  const id = await CartItem.find()
  res.json(id)
};

const addToCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    if (!itemId) return res.status(400).json({ error: 'itemId is required' });

    const existingCartItem = await CartItem.findOne({ itemId });
    if (existingCartItem) return res.status(400).json({ error: 'Product already in cart' });

    const newCartItem = new CartItem({ itemId });
    const savedCartItem = await newCartItem.save();
    res.json(savedCartItem);
  } catch (error) {
    res.status(500).json({ error: 'Could not add item to cart' });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    if (!itemId) return res.status(400).json({ error: 'itemId is required' });

    const deletedItem = await CartItem.findOneAndDelete({ itemId });
    if (!deletedItem) return res.status(404).json({ error: 'Item not found in cart' });

    res.json(deletedItem);
  } catch (error) {
    res.status(500).json({ error: 'Could not remove item from cart' });
  }
};

module.exports = { addToCart, removeFromCart, getAllCartIds };

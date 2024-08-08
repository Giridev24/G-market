// controllers/searchController.js
const imageModel = require('../models/product');

const searchProducts = async (req, res) => {
  const { q } = req.query;
  try {
    const regex = new RegExp(q, 'i');
    const products = await imageModel.find({
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } }
      ]
    });
    if (products.length === 0) return res.status(404).json({ message: 'No products found' });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { searchProducts };

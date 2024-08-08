// controllers/favoriteController.js
const FavoriteItem = require('../models/favorites');


const getAllFavoriteIds = async(req,res) => {
  const id = await FavoriteItem.find()
  res.json(id)
};

const addToFavorites = async (req, res) => {
  try {
    const { itemId } = req.body;
    if (!itemId) return res.status(400).json({ error: 'itemId is required' });

    const existingFavoriteItem = await FavoriteItem.findOne({ itemId });
    if (existingFavoriteItem) return res.status(400).json({ error: 'Product already in favorites' });

    const newFavoriteItem = new FavoriteItem({ itemId });
    const savedFavoriteItem = await newFavoriteItem.save();
    res.json('Added to favorites');
  } catch (error) {
    res.status(500).json({ error: 'Could not add item to favorites' });
  }
};

const removeFromFavorites = async (req, res) => {
  try {
    const { itemId } = req.params;
    if (!itemId) return res.status(400).json({ error: 'itemId is required' });

    const deletedItem = await FavoriteItem.findOneAndDelete({ itemId });
    if (!deletedItem) return res.status(404).json({ error: 'Item not found in favorites' });

    res.json('Product removed from favorites');
  } catch (error) {
    res.status(500).json({ error: 'Could not remove item from favorites' });
  }
};

module.exports = { addToFavorites, removeFromFavorites, getAllFavoriteIds };

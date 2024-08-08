// routes/favoriteRoutes.js
const express = require('express');
const router = express.Router();
const { addToFavorites, removeFromFavorites, getAllFavoriteIds } = require('../controllers/favoriteController');

router.get('/favorite', getAllFavoriteIds);
router.post('/favorites/:id', addToFavorites);
router.delete('/favorite/:itemId', removeFromFavorites);

module.exports = router;

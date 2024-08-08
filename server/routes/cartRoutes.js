// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart, getAllCartIds } = require('../controllers/cartController');


router.get('/cart', getAllCartIds);
router.post('/card/:id', addToCart);
router.delete('/cart/:itemId', removeFromCart);

module.exports = router;

// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { createOrder, orderDetails } = require('../controllers/orderController');

router.get('/orders', orderDetails);
router.post('/detail', createOrder);

module.exports = router;

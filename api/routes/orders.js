// Comment
// Import Depandancies
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check_auth');
const orderController = require('../controllers/order');

// Comment
// Import order-model
const Order = require('../models/order');
const Product = require('../models/product');



router.get('/', checkAuth, orderController.order_get_all);
router.post('/', checkAuth, orderController.order_create);
router.get('/:id', checkAuth, orderController.order_get_one);
router.delete('/:id', checkAuth, orderController.order_delete);





// Comment
// Export module
module.exports = router;
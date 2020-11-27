// Comment
// Import Depandancies
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check_auth');
const orderController = require('../controllers/order');


// Comments
// All routes
router.get('/', checkAuth, orderController.order_get_all);
router.post('/', checkAuth, orderController.order_create);
router.get('/:id', checkAuth, orderController.order_get_one);
router.delete('/:id', checkAuth, orderController.order_delete);


// Comment
// Export module
module.exports = router;
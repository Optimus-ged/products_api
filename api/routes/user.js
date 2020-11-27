// Comment
// Import dependancies 
const express = require('express');
const router = express.Router();
const checkAth = require('../middleware/check_auth')
const userController = require('../controllers/user');

// Comments
// All routes
router.get('/', checkAth, userController.user_get_all);
router.post('/signup', checkAth, userController.user_signUp);
router.post('/login', userController.user_auth);
router.delete('/:id', checkAth, userController.user_delete);

// Comment
// Export module
module.exports = router;
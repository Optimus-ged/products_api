// Comment
// Import Depandancies
const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check_auth');

const productController = require('../controllers/products');


// Comment
// function to filter my images, accept or reject some images
// extensions
const fileFilter = (req, file, cb) => {
    // Comment
    // Reject
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        // Comment
        // Accept
        cb(null, false);
    }

}

// Comment
// Definition of the storage : destination and fileName
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// Comment
// with this constant i will be able to upload the image
// using my post-request 
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// Comment
// Handling all routes
router.get('/', checkAuth, productController.products_get_all);
router.get('/:id', checkAuth, productController.product_get_one);
router.post('/', checkAuth, upload.single('productImage'), productController.product_create);
router.delete('/:id', checkAuth, productController.product_delete);
router.patch('/:id', checkAuth, productController.product_update);


// Comment
// Exporting module
module.exports = router;
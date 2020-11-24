const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// Comment
// Import order-model
const Order = require('../models/order');


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling get Orders'
    });
});

// Comment
// Handling post-request
router.post('/', (req, res) => {
    let order = new Order({
        _id: mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity
    });
    order.save()
        .then(
            result => {
                console.log(result);
                res.status(200).json({
                    message: "data successfully posted",
                    result: result
                });
            }
        )
        .catch(
            err => {
                errorFunction(err, res);
            }
        );
});

router.get('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Order details'
    });
});

router.delete('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'deleting ordres by id',
        id: req.params.id
    });
});

// Comment
// Error function for try-catch
function errorFunction(res, err) {
    console.log(err);
    res.status(500).json({
        status: 500,
        message: err.message
    });
}


// Comment
// Export module
module.exports = router;
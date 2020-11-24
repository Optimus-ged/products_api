const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Comment
// Import order-model
const Order = require('../models/order');
const Product = require('../models/product');


// Comment
// Handling get-request
router.get('/', (req, res) => {
    Order.find()
        .select('_id product quantity')
        .exec()
        .then(
            data => {
                res.status(200).json({
                    message: "data Successfully getted",
                    status: 200,
                    count: data.length,
                    all_product: data.map(
                        order => {
                            return {
                                id: order._id,
                                product: order.product,
                                quantity: order.quantity,
                                request: {
                                    type: "Get-request",
                                    ulr: "http://localhost:3000/orders" + order._id
                                }
                            }
                        }
                    )
                });
            }
        )
        .catch(
            err => {
                errorFunction(res, err);
            }
        )
});

// Comment
// Handling Post-request
router.post('/', (req, res) => {
    Product.findOne(req.body.productId)
        .then(
            prod => {
                if (!prod)
                    res.status(404).json({
                        status: 404,
                        message: "Invalid productId"
                    });
                let order = new Order({
                    _id: mongoose.Types.ObjectId(),
                    product: req.body.productId,
                    quantity: req.body.quantity
                });
                return order.save().then(
                    result => {
                        res.status(201).json({
                            status: 201,
                            message: "Data successfully Stored",
                            oredrStored: {
                                id: result._id,
                                product: result.productId,
                                quantity: result.quantity
                            }
                        });
                    }
                )
            }
        )
        .catch(
            err => {
                errorFunction(res, err);
            }
        )
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
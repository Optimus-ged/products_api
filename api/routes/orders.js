// Comment
// Import Depandancies
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Comment
// Import order-model
const Order = require('../models/order');
const Product = require('../models/product');


// Comment
// Handling get-request
router.get('/', (req, res, next) => {
    Order.find()
        .select('_id product quantity')
        .populate("product", "_id name price")
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
                                    ulr: "http://localhost:3000/orders/" + order._id
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
// Handling post-request
router.post('/', (req, res, next) => {
    console.log(req.file);
    Product.findById(req.body.productId)
        .then(
            result => {
                if (!result)
                    return res.status(404).json({
                        error: {
                            status: 404,
                            message: "Invalid product Id"
                        }
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
                            message: "Successfully stored",
                            product_stored: {
                                _id: result._id,
                                product: result.product,
                                quantity: result.quantity
                            }
                        });
                    }
                );
            }
        )
        .catch(
            err => {
                errorFunction(res, err);
            }
        )
});


// Comment
// Handling get-request for one product
router.get('/:id', (req, res, next) => {
    Order.findById(req.params.id)
        .select('_id product quantity')
        .populate('product', '_id name price')
        .exec()
        .then(
            result => {
                if (!result)
                    return res.status(404).json({
                        error: {
                            status: 404,
                            message: "Invalid Order Id"
                        }
                    });
                res.status(200).json({
                    status: 200,
                    message: "Product successfully getted",
                    product: result,
                    request: {
                        type: "Get-request",
                        url: "http://localhost:3000/orders"
                    }
                });
            }
        )
        .catch(
            err => {
                errorFunction(res, err);
            }
        );
});


// Comment
// Handling delete-request
router.delete('/:id', (req, res, next) => {
    Order.deleteOne({ _id: req.params.id }).exec().then(
        result => {
            if (result.n == 0)
                return res.status(404).json({
                    error: {
                        status: 404,
                        message: "Order id Not exist"
                    }
                });
            return res.status(201).json({
                status: 201,
                message: "Order successfully deleted"
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
// Error function for try-catch
function errorFunction(res, err) {
    console.log(err);
    res.status(500).json({
        error: {
            status: 500,
            message: err.message
        }

    });
}


// Comment
// Export module
module.exports = router;
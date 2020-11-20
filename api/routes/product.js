const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/Product');

// Comment
// Handling get-request for all items
router.get('/', (req, res, next) => {
    Product.find().exec().then(data => {
        res.status(200).json({
            status: 200,
            products: data
        })
    }
    )
        .catch(
            err => {
                console.log(err);
                res.status(500).json({
                    status: 500,
                    error: {
                        message: error.message
                    }
                });
            }
        )
});


// comment
// Handling get-equest for one item
router.get('/:id', (req, res) => {
    let id = req.params.id;
    Product.findById(id).exec().then(prod => {
        if (prod)
            return res.status(200).json({
                status: 200,
                message: "Success getted",
                product: prod
            })

        res.status(404).json({
            status: 404,
            message: "Product not found"
        })

    }
    )
        .catch(
            err => {
                console.log(err);
                res.status(500).json({
                    status: 500,
                    error: {
                        message: error.message
                    }
                });
            }
        )
});


// Comment
// Handling post-request
router.post('/', (req, res, next) => {
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        console.log(result); res.status(201).json({
            status: 201,
            message: 'Handling a post request',
            createdProduct: product
        });
    })
        .catch(
            err => {
                console.log(err);
                res.status(500).json({
                    status: 500,
                    error: {
                        message: error.message
                    }
                });
            }
        )


});


// Comment
// Handling delete-request
router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    Product.remove({ _id: id }).exec().then(result => {
        if (result)
            return res.status(200).json({
                status: 200,
                message: "Successfully Deleted"
            })
        res.status(404).json({
            error: {
                message: "Invalid product Id"
            }
        })
    })
        .catch(
            err => {
                console.log(err);
                res.status(500).json({
                    status: 500,
                    error: {
                        message: error.message
                    }
                });
            }
        )
});


// Comment
// Handling patch-request
router.patch('/:id', (req, res) => {
    let id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.OpsKey] = ops.value;
    }
    Product.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(
            result => {
                console.log(result);
                if (!result)
                    return res.status(404).json({
                        status: 404,
                        error: {
                            message: "Product not found"
                        }
                    })
                res.status(200).json({
                    status: 200,
                    message: "Product Success Updated",

                });
            }
        )
        .catch(
            err => {
                console.log(err);
                res.status(500).json({
                    status: 500,
                    error: {
                        message: err.message
                    }
                });
            })
});

// Comment
// Exporting module
module.exports = router;
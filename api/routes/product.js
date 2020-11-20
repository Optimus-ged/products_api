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
    ).catch(err => res.status(500).json({
        status: 500,
        message: err.message
    }))
});


// comment
// Handling get-equest for one item
router.get('/:id', (req, res) => {
    let id = req.params.id;
    Product.findById(id).exec().then(prod => {
        if (prod) {
            res.status(200).json({
                status: 200,
                message: "Success getted",
                product: prod
            })
        } else {
            res.status(404).json({
                status: 404,
                message: "Product not found"
            })
        }
    }
    ).catch(err => res.status(500).json({
        status: 500,
        message: err.message
    }))
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
    }).catch(err => console.log(err.message));


});

router.delete('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Handling a delete method'
    });
});

router.patch('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Handling a patch method'
    });
});

module.exports = router;
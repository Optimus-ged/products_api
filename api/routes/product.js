const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/Product');


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling a get request'
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    if (id === 'special') return res.status(200).json({
        status: 200,
        message: 'success',
        id: req.params.id
    });

    res.status(200).json(res.status(200).json({ id: id }));
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => console.log(result)).catch(err => console.log(err));

    res.status(201).json({
        status: 201,
        message: 'Handling a post request',
        createdProduct: product
    });
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
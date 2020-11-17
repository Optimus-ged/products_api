const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling get Orders'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        status: '201',
        message: 'Handling post Orders',
        order: order
    });
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

module.exports = router;
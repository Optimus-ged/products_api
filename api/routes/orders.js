const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling get Orders'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling post Orders'
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
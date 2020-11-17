const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling a get request'
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    if (id === 'special') return res.status(200).json({
        message: 'success',
        'id': req.params.id
    });

    res.status(200).json(res.status(200).json(id));
});

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(201).json({
        status: "201",
        message: 'Handling a post request',
        product: product
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
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
    res.status(201).json({
        message: 'Handling a post request'
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
// Commentaires
// IMPORTS DEPANDENCIES
const express = require('express');
const morgan = require('morgan');
const app = express();

// Commentaires
// IMPORTS ROUTES
const productsRoutes = require('./api/routes/product');
const ordersRoutes = require('./api/routes/orders');

// MIDDLEWARE
app.use(morgan('dev'));
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);


// GESTION DES ERREURS
app.use((req, res, next) => {
    const error = new Error('THE REQUEST WAS NOT FOUND ON THE SERVER');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// EXPORTS
module.exports = app;
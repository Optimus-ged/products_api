// Commentaires
// IMPORTS DEPANDENCIES
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();


// Commentaires
// IMPORTS ROUTES
const productsRoutes = require('./api/routes/product');
const ordersRoutes = require('./api/routes/orders');

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

// Allow Access Control
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, DELETE, GET');
        res.status(200).json({});
    }
    next();
});

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

const port = 3000;
app.listen(port, () => console.log(`THE SERVER IS RUNNING AT PORT ${port}`));

// EXPORTS
// module.exports = app;
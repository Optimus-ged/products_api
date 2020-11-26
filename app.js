// Comment
// IMPORTS DEPANDENCIES
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');


// Comment
// Connection to Db
// mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb+srv://optimus:' + process.env.MONGO_ATLAS_PWD + '@cluster0.hefqw.mongodb.net/productsDb?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
);
mongoose.Promise = global.Promise;
// Comment
// IMPORTS ROUTES
const productsRoutes = require('./api/routes/product');
const ordersRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

// Comment
// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use('/users', userRoutes);
app.use('/uploads', express.static('uploads'));

// Comment
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


// Comment
// Handling errors
app.use((req, res, next) => {
    const error = new Error('Not found on the server');
    res.status(404);
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`THE SERVER IS RUNNING AT PORT ${port}`));


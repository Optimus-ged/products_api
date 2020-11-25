// Comment 
// Import Dependance
const mongoose = require('mongoose');

// Comment
// Product model
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productImage: { type: String, required: true }
});


// Comment
// Export module for product model
module.exports = mongoose.model('product', productSchema);
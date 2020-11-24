const mongoose = require('mongoose');

// Comment
// Order model
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.type.ObjectId, ref: 'Product', require: true },
    quantity: { type: Number, default: 1 }
});

// Comment
// Export for order module
module.exports = mongoose.model('Order', orderSchema);
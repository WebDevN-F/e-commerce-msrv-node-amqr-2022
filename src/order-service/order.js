const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const OrderScheme = new Scheme({
    products: [
        {
            productId: String
        }
    ],
    user: String,
    totalPrice: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = Order = mongoose.model('order', OrderScheme);
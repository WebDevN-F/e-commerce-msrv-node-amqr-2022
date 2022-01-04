const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const ProductScheme = new Scheme({
    name: String,
    description: String,
    price: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('product', ProductScheme);
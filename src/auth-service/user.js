const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const UserScheme = new Scheme({
    name: String,
    email: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', UserScheme);
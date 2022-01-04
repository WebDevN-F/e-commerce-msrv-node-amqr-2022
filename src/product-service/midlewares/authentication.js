const jwt = require('jsonwebtoken');

module.exports = async function isAuthenticated(req, res, next) {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'supersecret', (err, decoded) => {
            if (err) {
                return res.status(401).send({ error: 'You are not authenticated' });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        return res.status(401).send({ error: 'You are not authenticated' });
    }
}
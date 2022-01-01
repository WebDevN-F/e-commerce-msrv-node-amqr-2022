const User = require('../user');
const jwt = require('jsonwebtoken');

module.exports.login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ error: 'Request body is missing' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).send({ error: 'User not found' });
    } else {
        // check if the entered password is invalid
        if (user.password !== password) {
            return res.status(401).send({ error: 'Password does not match' });
        }

        const payload = {
            email,
            name: user.name,
            id: user._id
        }
        jwt.sign(payload, 'supersecret', { expiresIn: '2h' }, (err, token) => {
            if (err) {
                return res.status(500).send({ error: 'An error has occurred' });
            } else {
                return res.send({ token: token });
            }
        });
    }
}

module.exports.register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).send({error: 'Request body is missing'});
    }

    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
        return res.status(400).send({error: 'User already exist'});
    } else {
        const user = new User({ name, email, password });
        await user.save();
        return res.status(201).send(user);
    }
}
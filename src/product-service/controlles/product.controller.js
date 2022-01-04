// Create a new product
// Buy a product

const Product = require('../product');

module.exports.create = async (req, res) => {
    if (!req.body.name || !req.body.description || !req.body.price) {
        return res.status(400).send({ error: 'Request body is missing' });
    }

    const { name, description, price } = req.body;

    try {
        const product = new Product({
            name,
            description,
            price,
        });

        await product.save();

        return res.status(201).send(product);
    } catch (e) {
        console.log(e);
        return res.status(400).send({error: e.message});
    }
}
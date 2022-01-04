// Create a new product
// Buy a product

const Product = require('../product');
const amqp = require('amqplib');
var connection, channel;

// amqp connection
async function connect() {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect({
        protocol: 'amqp',
        hostname: 'localhost',
        port: 5672,
        username: 'admin',
        password: 'admin2022',
    });
    channel = await connection.createChannel();
    await channel.assertQueue('PRODUCT_QUEUE');
    await channel.consume('PRODUCT_QUEUE', message => {
        console.log(message.content.toString());
        channel.ack(message);
    })
}
connect();

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

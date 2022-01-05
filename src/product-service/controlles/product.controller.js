// Create a new product
// Buy a product

const Product = require('../product');
const amqp = require('amqplib');
var connection, channel, order;

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

module.exports.buy = async (req, res) => {
    if (!req.body.ids ) {
        return res.status(400).send({ error: 'Request body is missing' });
    }

    const { ids } = req.body;

    const products = await Product.find({ _id: { $in: ids } });

    if (products.length !== ids.length) {
        return res.status(400).send({ error: 'Invalid product ids' });
    }

    try {
        channel.sendToQueue('ORDER_QUEUE', Buffer.from(JSON.stringify({ products, userEmail: req.user.email })));

        channel.consume('PRODUCT_QUEUE', data => { 
            console.log('consume', new Date());
            order = JSON.parse(data.content);
            channel.ack(data);
        });
        return res.status(201).send({data: order});
        
    } catch (e) {
        console.log(e);
        return res.status(400).send({error: e.message});
    }

}

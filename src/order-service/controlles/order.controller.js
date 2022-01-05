// Create a new product
// Buy a product

const Order = require('../order');
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
    await channel.assertQueue('ORDER_QUEUE');
}


function createOrder(products, userEmail) {
    const order = new Order({
        products,
        user: userEmail,
        totalPrice: products.reduce((total, product) => total + product.price, 0),
    });
    order.save();
    return order;
}

connect().then(() => {
    channel.consume('ORDER_QUEUE', data => {
        console.log('Consuming ORDER_QUEUE', data.content.toString());

        const { products, userEmail } = JSON.parse(data.content);
        const newOrder = createOrder(products, userEmail);

        channel.ack(data);

        channel.sendToQueue('PRODUCT_QUEUE', Buffer.from(JSON.stringify({ newOrder })));

    })
});

module.exports.getAll = async (req, res) => {
    try {
        const orders = await Order.find({}).limit(100);
        return res.status(200).send(orders);
    } catch (e) {
        console.log(e);
        return res.status(400).send({error: e.message});
    }
}

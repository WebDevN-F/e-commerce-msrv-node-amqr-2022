// Create a new product
// Buy a product

const Order = require('../order');
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
    })
});

// module.exports.create = async (req, res) => {
//     if (!req.body.name || !req.body.description || !req.body.price) {
//         return res.status(400).send({ error: 'Request body is missing' });
//     }

//     const { name, description, price } = req.body;

//     try {
//         const product = new Product({
//             name,
//             description,
//             price,
//         });

//         await product.save();

//         return res.status(201).send(product);
//     } catch (e) {
//         console.log(e);
//         return res.status(400).send({error: e.message});
//     }
// }

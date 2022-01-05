const express = require('express');
const app = express();
const PORT = process.env.PORT || 7070;
const mongoose = require('mongoose');
const Order = require('./order');
const amqp = require('amqplib');
var connection, channel;

// const swaggerUi = require('swagger-ui-express');
// const swaggerJsdoc = require('swagger-jsdoc');

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
// const options = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'Order Service',
//             version: '1.0.0',
//             contact: {
//                 name: 'Nguyen Van Nam',
//                 url: 'https://github.com/ngnam/',
//             },
//         },
//         servers: [
//             {
//                 url: 'http://localhost:7070',
//                 description: 'Development server',
//             },
//         ],
//     },
//     apis: ['./routes/*.js'], // files containing annotations as above
    
// };
// const openapiSpecification = swaggerJsdoc(options);

mongoose.connect('mongodb://localhost/order-service',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, () => {
        console.log('Connected to MongoDB order-service');
    }
);

app.use(express.json());

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

// app.use('/', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.listen(PORT, (err) => {
    if (err) {
        console.log("Something went wrong", err);
    }
    console.log(`Orders Servive started on port ${PORT}`);
});
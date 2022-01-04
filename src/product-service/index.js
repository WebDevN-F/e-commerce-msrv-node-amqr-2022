const express = require('express');
const app = express();
const PORT = process.env.PORT || 6070;
const mongoose = require('mongoose');
const productRouter = require('./routes/product.router');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const amqp = require('amqplib');
var connection, channel;

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Product Service',
            version: '1.0.0',
            contact: {
                name: 'Nguyen Van Nam',
                url: 'https://github.com/ngnam/',
            },
        },
        servers: [
            {
                url: 'http://localhost:6070',
                description: 'Development server',
            },
        ],
    },
    apis: ['./routes/*.js'], // files containing annotations as above
    
};
const openapiSpecification = swaggerJsdoc(options);

mongoose.connect('mongodb://localhost/product-service',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, () => {
        console.log('Connected to MongoDB product-service');
    }
);

// controllers
// register
// login
app.use(express.json());

app.use('/product', productRouter);

app.use('/', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

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

app.listen(PORT, (err) => {
    if (err) {
        console.log("Something went wrong", err);
    }
    console.log(`Products Servive started on port ${PORT}`);
});
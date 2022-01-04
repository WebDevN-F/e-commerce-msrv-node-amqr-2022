const express = require('express');
const app = express();
const PORT = process.env.PORT || 6070;
const mongoose = require('mongoose');
const productRouter = require('./routes/product.router');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

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

app.listen(PORT, (err) => {
    if (err) {
        console.log("Something went wrong", err);
    }
    console.log(`Products Servive started on port ${PORT}`);
});
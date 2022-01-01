const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const authRouter = require('./routes/auth.router');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Auth Service',
            version: '1.0.0',
            contact: {
                name: 'Nguyen Van Nam',
                url: 'https://github.com/ngnam/',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
        ],
    },
    apis: ['./routes/*.js'], // files containing annotations as above
    
};
const openapiSpecification = swaggerJsdoc(options);

mongoose.connect('mongodb://localhost/auth-service',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, () => {
        console.log('Connected to MongoDB auth-service');
    }
);

// controllers
// register
// login
app.use(express.json());

app.use('/auth', authRouter);

app.use('/', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.listen(PORT, (err) => {
    if (err) {
        console.log("Something went wrong", err);
    }
    console.log(`Auth Servive started on port ${PORT}`);
});
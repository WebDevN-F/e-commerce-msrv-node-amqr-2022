// routes/auth.router.js
const express = require('express');
const router = express();
const controller = require('../controlles/auth.controller');

/**
 * @openapi
 * /auth/login:
 *     post:
 *         summary: login user
 *         description: login user
 *         requestBody:
 *          required: true
 *          content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *              email:
 *                  type: string
 *                  example: nguyenvannam@gmail.com
 *              password:
 *                  type: string
 *                  example: 123456
 *         responses:
 *          200:
 *           description: login successfully
 *           content:
 *            application/json:
 *             schema:
 *              type: object
 *              properties:
 *               token:
 *                type: string
 *          401:
 *           description: login failed
 *           content:
 *            application/json:
 *             schema:
 *              type: object
 *              properties:
 *               error:
 *                type: any
 */
router.post('/login', controller.login);

/**
 * @openapi
 * /auth/register:
 *      post:
 *          summary: register user
 *          description: Register a new user
 *          requestBody:
 *           required: true
 *           content:
 *            application/json:
 *             schema:
 *              type: object
 *              properties:
 *               name:
 *                type: string
 *                example: Nguyen Van Nam
 *               email:
 *                type: string
 *                example: nguyenvannam@gmail.com
 *               password:
 *                type: string
 *                example: 123456
 *          responses:
 *           400:
 *            description: Bad request
 *            content:
 *             application/json:
 *              schema:
 *               type: object
 *               properties:
 *                error:
 *                 type: any
 *           201:
 *            description: User created successfully
 *            content:
 *             application/json:
 *              schema:
 *               type: object
 *               properties:
 *                _id:
 *                 type: string
 *                name:
 *                 type: string
 *                email: 
 *                 type: string
 *                createdAt:
 *                 type: string
 *                 format: date-time
 */
router.post('/register', controller.register);

module.exports = router;

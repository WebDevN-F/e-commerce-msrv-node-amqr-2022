// routes/auth.router.js
const express = require('express');
const router = express();
const controller = require('../controlles/order.controller');
const isAuthenticated = require('../midlewares/authentication');

/**
 * @openapi: 3.0.0
 * components:
 *  securitySchemes:
 *   bearerAuth:
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT
 * /order:
 *     get:
 *         security:
 *          - bearerAuth: []
 *         summary: List orders
 *         description: List orders
 *         responses:
 *          200:
 *           description: list all orders
 *           content:
 *            application/json:
 *             schema:
 *              type: array
 *              properties:
 *               products:
 *                  type: array
 *               user:
 *                  type: string
 *               totalPrice:
 *                  type: number
 *               _id:
 *                  type: string
 *               createdAt:
 *                  type: string
 *                  format: date-time
 *          401:
 *           description: get failed
 *           content:
 *            application/json:
 *             schema:
 *              type: object
 *              properties:
 *               error:
 *                type: string
 */
router.get('/', isAuthenticated, controller.getAll);

module.exports = router;

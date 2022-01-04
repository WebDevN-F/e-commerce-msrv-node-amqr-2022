// routes/auth.router.js
const express = require('express');
const router = express();
const controller = require('../controlles/product.controller');
const isAuthenticated = require('../midlewares/authentication');

/**
 * @openapi: 3.0.0
 * components:
 *  securitySchemes:
 *   bearerAuth:
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT
 * /product/create:
 *     post:
 *         security:
 *          - bearerAuth: []
 *         summary: create product
 *         description: create product
 *         requestBody:
 *          required: true
 *          content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *              name:
 *                  type: string
 *                  example: baby
 *              description:
 *                  type: string
 *                  example: a baby
 *              price:
 *                  type: number
 *                  example: 100000
 *         responses:
 *          201:
 *           description: create product successfully
 *           content:
 *            application/json:
 *             schema:
 *              type: object
 *              properties:
 *               name:
 *                  type: string
 *               description:
 *                  type: string
 *               price:
 *                  type: number
 *               createdAt:
 *                  type: string
 *                  format: date-time
 *          401:
 *           description: create failed
 *           content:
 *            application/json:
 *             schema:
 *              type: object
 *              properties:
 *               error:
 *                type: any
 */
router.post('/create', isAuthenticated, controller.create);

module.exports = router;

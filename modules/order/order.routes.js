const express = require('express');
const orderController = require('./order.controller');
const authenticateJWT = require('../../middlewares/authenticate');
const validate = require('../../middlewares/validate');
const { orderSchema } = require('./validation/order.validation');
const router = express.Router();

// Routes for order operations with JWT authentication
router.post('/', authenticateJWT, validate(orderSchema), (req, res) => orderController.createOrder(req, res));
router.get('/', authenticateJWT, (req, res) => orderController.getOrders(req, res));
router.get('/:id', authenticateJWT, (req, res) => orderController.getOrderById(req, res));
router.put('/:id', authenticateJWT, validate(orderSchema), (req, res) => orderController.updateOrder(req, res));
router.delete('/:id', authenticateJWT, (req, res) => orderController.deleteOrder(req, res));

module.exports = router;

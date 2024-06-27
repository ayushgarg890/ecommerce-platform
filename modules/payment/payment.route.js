const express = require('express');
const paymentController = require('./payment.controller');
const authenticateJWT = require('../../middlewares/authenticate');
const validate = require('../../middlewares/validate');
const { paymentSchema } = require('./validation/payment.validation');
const router = express.Router();

// Routes for payment operations with JWT authentication
router.post('/', (req, res) => paymentController.processPayment(req, res));
router.delete('/:id', authenticateJWT, (req, res) => paymentController.deletePayment(req, res));

module.exports = router;

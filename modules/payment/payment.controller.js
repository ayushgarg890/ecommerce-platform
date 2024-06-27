const paymentService = require("./payment.service");
const logger = require("../../middlewares/logger");

class PaymentController {
  async processPayment(req, res) {
    try {
      const payment = await paymentService.processPayment(req.body);
      logger.info("Payment created successfully", {
        payment: { id: payment._id, user: payment.user },
      });
      res.status(201).json(payment);
    } catch (error) {
      logger.error("Payment creation failed", { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  async getPaymentById(req, res) {
    try {
      const payment = await paymentService.getPaymentById(req.params.id);
      if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
      }
      res.status(200).json(payment);
    } catch (error) {
      logger.error("Fetching payment failed", { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }


}

module.exports = new PaymentController();

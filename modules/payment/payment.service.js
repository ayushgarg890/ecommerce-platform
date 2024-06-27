const Payment = require("./model/payment.model");
const { mockPayment } = require("../../utils/payment.mock");
const axios = require('axios');
const stripeBaseUrl = 'https://api.stripe.com';

class PaymentService {
  async processPayment(paymentData) {
    try {
      mockPayment(paymentData.totalAmount);

      const paymentResponse = await this.makePayment(paymentData);

      const payment = new Payment({
        user : paymentData.user,
        order: paymentData._id,        
        transactionId: paymentResponse.id,
        amount : paymentData.totalAmount,
        status: paymentResponse.status || paymentResponse.state,
        method : paymentResponse['payment_method']
      });

      await payment.save();
      return payment;
    } catch (error) {
      const payment = new Payment({
        user : paymentData.user,
        order: paymentData._id,        
        amount : paymentData.totalAmount,
        status: 'failed',
      });

      await payment.save();
      throw new Error(`Payment processing failed: ${error.message}`);
    }
  }

  async makePayment(paymentData) {
    try {
      const response = await axios.post(`${stripeBaseUrl}/v1/charges`, {
        amount: paymentData.totalAmount,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(
          `Stripe payment failed: ${error.response.data.error.message}`
        );
      } else {
        throw new Error(`Stripe payment failed: ${error.message}`);
      }
    }
  }

  async getPaymentById(paymentId) {
    return Payment.findById(paymentId).populate("user").populate("order");
  }
}

module.exports = new PaymentService();

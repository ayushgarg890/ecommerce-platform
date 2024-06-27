const Order = require("./model/order.model");
const PaymentService = require("../payment/payment.service");
const mongoose = require('mongoose');
const ProductService = require("../product/product.service");

class OrderService {
  async createOrder(orderData) {
    // const session = await mongoose.startSession();
    // session.startTransaction();
    //sunce its not the replica or hosted
    let orderId="";
    try {
      const order = new Order(orderData);

      for (const item of order.products) {
        await ProductService.reserveProductStock(
          item.product,
          item.quantity,
          // { session }
        );
      }

      await order.save();
      orderId = order._id.toString();

      // Process payment
      const payment = await PaymentService.processPayment(order);

      
      if (payment.status === "succeeded" || payment.status === "approved") {
        await this.updateOrderStatus(order._id, "approved");
        await this.updateProductStocks(order);
      } else {
        await this.updateOrderStatus(order._id, "cancelled");
        for (const item of order.products) {
          await ProductService.releaseProductStock(
            item.product,
            item.quantity,
            // { session }
          );
        }
      }

      // await session.commitTransaction();
      // session.endSession();
      return order;
    } catch (error) {
      // await session.abortTransaction();
      // session.endSession();
      const order = new Order(orderData);
      await this.updateOrderStatus(orderId, "cancelled");
      for (const item of order.products) {
        await ProductService.releaseProductStock(item.product, item.quantity);
      }
      throw error;
    }
  }

  async updateOrderStatus(orderId, status) {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    if (status === "cancelled") {
      for (const item of order.products) {
        await ProductService.releaseProductStock(item.product, item.quantity);
      }
    }

    order.status = status;
    await order.save();
    return order;
  }

  async updateProductStocks(order) {
    for (const item of order.products) {
      await ProductService.updateProductStock(item.product, item.quantity);
    }
  }
  async getOrders() {
    return Order.find().populate("user").populate("products.product");
  }

  async getOrderById(orderId) {
    return Order.findById(orderId)
      .populate("user")
      .populate("products.product");
  }

  async updateOrder(orderId, orderData) {
    return Order.findByIdAndUpdate(orderId, orderData, { new: true });
  }

  async deleteOrder(orderId) {
    return Order.findByIdAndDelete(orderId);
  }
}

module.exports = new OrderService();

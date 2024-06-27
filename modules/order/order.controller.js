const orderService = require("./order.service");
const logger = require("../../middlewares/logger");

class OrderController {
  async createOrder(req, res) {
    try {
      const order = await orderService.createOrder(req.body);
      logger.info("Order created successfully", {
        order: { id: order._id, user: order.user },
      });
      res.status(201).json(order);
    } catch (error) {
      logger.error("Order creation failed", { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  async getOrders(req, res) {
    try {
      const orders = await orderService.getOrders();
      res.status(200).json(orders);
    } catch (error) {
      logger.error("Fetching orders failed", { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  async getOrderById(req, res) {
    try {
      const order = await orderService.getOrderById(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.status(200).json(order);
    } catch (error) {
      logger.error("Fetching order failed", { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  async updateOrder(req, res) {
    try {
      const order = await orderService.updateOrder(req.params.id, req.body);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.status(200).json(order);
    } catch (error) {
      logger.error("Updating order failed", { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  async deleteOrder(req, res) {
    try {
      const order = await orderService.deleteOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      logger.error("Deleting order failed", { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new OrderController();

const productService = require("./product.service");
const logger = require("../../middlewares/logger");

class ProductController {
  async createProduct(req, res) {
    try {
      const product = await productService.createProduct(req.body);
      logger.info("Product created successfully", {
        product: { id: product._id, name: product.name },
      });
      res.status(201).json(product);
    } catch (error) {
      logger.error("Product creation failed", { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  async getProducts(req, res) {
    try {
      const products = await productService.getProducts();
      res.status(200).json(products);
    } catch (error) {
      logger.error("Fetching products failed", { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      logger.error("Fetching product failed", { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  async getProductByName(req, res) {
    try {
      const product = await productService.getProductByName(req.params.name);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      logger.error("Fetching product failed", { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const product = await productService.updateProduct(
        req.params.id,
        req.body
      );
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      logger.error("Updating product failed", { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const product = await productService.deleteProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      logger.error("Deleting product failed", { error: error.message });
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ProductController();

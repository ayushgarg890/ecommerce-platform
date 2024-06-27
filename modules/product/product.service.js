const Product = require("./model/product.model");

class ProductService {
  async createProduct(productData) {
    try {
      const product = new Product(productData);
      await product.save();
      return product;
    } catch (error) {
      if (error.code === 11000) {
        throw new Error("Product name must be unique");
      }
      throw new Error(`Error creating product: ${error.message}`);
    }
  }

  async getProducts() {
    try {
      const products = Product.find();
      return products;
    } catch (error) {
      throw new Error(`Error while fetching product: ${error.message}`);
    }
  }

  async getProductById(productId) {
    try {
      const product = Product.findById(productId);
      return product;
    } catch (error) {
      throw new Error(`Error while fetching product: ${error.message}`);
    }
  }

  async updateProduct(productId, productData) {
    try {
      const product = await Product.findByIdAndUpdate(productId, productData, {
        new: true,
        runValidators: true,
      });
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      throw new Error(`Error updating product: ${error.message}`);
    }
  }

  async reserveProductStock(productId, quantity) {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.stock < quantity) {
      throw new Error("Insufficient stock");
    }

    // Atomically update stock and holdStock
    const result = await Product.updateOne(
      { _id: productId, stock: { $gte: quantity } },
      { $inc: { stock: -quantity, holdStock: quantity } }
    );

    if (result.nModified === 0) {
      throw new Error("Failed to reserve stock");
    }
  }

  async releaseProductStock(productId, quantity) {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    // Ensure holdStock does not go below zero
    if (product.holdStock < quantity) {
      throw new Error("Insufficient hold stock to release");
    }

    // Atomically update stock and holdStock
    await Product.updateOne(
      { _id: productId },
      { $inc: { stock: quantity, holdStock: -quantity } }
    );
  }

  async deleteProduct(productId) {
    try {
      return Product.findByIdAndDelete(productId);
    } catch (error) {
      throw new Error(`Error updating product: ${error.message}`);
    }
  }

  async updateProductStock(productId, quantity) {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    await Product.updateOne(
      { _id: productId },
      { $inc: { holdStock: -quantity } }
    );
  }

  async getProductByName(name) {
    try {
      const product = await Product.findOne({ name: new RegExp(name, "i") });
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      throw new Error(`Error searching for product: ${error.message}`);
    }
  }
}

module.exports = new ProductService();

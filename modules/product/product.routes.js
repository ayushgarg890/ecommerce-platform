const express = require('express');
const productController = require('./product.controller');
const authenticateJWT = require('../../middlewares/authenticate');
const validate = require('../../middlewares/validate');
const { productSchema } = require('./validation/product.validation');
const router = express.Router();

router.post('/', authenticateJWT, validate(productSchema), (req, res) => productController.createProduct(req, res));
router.get('/', authenticateJWT, (req, res) => productController.getProducts(req, res));
router.get('/id/:id', authenticateJWT, (req, res) => productController.getProductById(req, res));
router.get('/name/:name', authenticateJWT, (req, res) => productController.getProductByName(req, res));
router.put('/:id', authenticateJWT, validate(productSchema), (req, res) => productController.updateProduct(req, res));
router.delete('/:id', authenticateJWT, (req, res) => productController.deleteProduct(req, res));

module.exports = router;

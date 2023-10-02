const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// API to add products to the database
router.post('/create', productController.createProduct);

// Route to list products
router.get('/', productController.renderProductInfo);

// Route to handle the form submission and add product data to the database
router.post('/send-data', productController.sendData);

// API to delete products by ID
router.delete('/:id/delete', productController.deleteProduct);

// API to update quantity of a product by ID
router.put('/:id/update', productController.updateProduct);

// Route to view product details by ID and render 'product.ejs' template
router.get('/:id/details', productController.viewProductDetails);

// Route to render the product information page
router.get('/product-info', productController.renderProductInfo);

// Route to view the update product page
router.get('/:id/update', productController.renderUpdateProduct);

module.exports = router;

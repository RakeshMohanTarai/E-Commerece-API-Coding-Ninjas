const Product = require('../models/productModel');

// Controller function to create a product
exports.createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const product = new Product({ name, quantity });
    await product.save();
    res.json({ data: { product } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to render the product information page
exports.renderProductInfo = async (req, res) => {
  try {
    // Fetch the product data from your database or wherever you store it
    const products = await Product.find(); // Example assuming you're using Mongoose

    // You may have more logic here to retrieve and format your product data

    res.render('product-info', { products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Controller function to handle form submission and add product data to the database
exports.sendData = async (req, res) => {
  try {
      console.log('Request body:', req.body); // Log the request body to the console
      const { productName, productQuantity } = req.body;
      
      // Create a new Product instance and save it to the database
      const product = new Product({
          name: productName,
          quantity: parseInt(productQuantity, 10), // Convert productQuantity to a number
      });
      
      await product.save();

      res.render('success', { product }); // Render the 'success.ejs' template with the product data
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndRemove(productId);
    res.sendStatus(200); // Respond with a success status code
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to update product quantity by ID
exports.updateProductQuantity = async (req, res) => {
  try {
    const productId = req.params.id;
    const { number } = req.query;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.quantity += parseInt(number, 10);
    await product.save();

    res.json({ data: { product, message: 'Product quantity updated' } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to view product details by ID and render 'product.ejs' template
exports.viewProductDetails = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.render('product', { product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to render the update product page
exports.renderUpdateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.render('update', { product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Controller function to update product data by ID
// Controller function to update product data by ID
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { productName, productQuantity } = req.body;

    // Find the product by ID and update its name and quantity
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name: productName, quantity: productQuantity },
      { new: true } // This option ensures that the updated product data is returned
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.redirect('/product-info'); // Redirect to the product-info page after successful update
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



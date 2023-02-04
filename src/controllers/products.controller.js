const productsService = require('../services/products.service');

const findProductById = async (req, res) => {
  const { productId } = req.params;

  const data = await productsService.findProductById(productId);

  return res.json(data);
};


const findProducts = async (req, res) => {
  const data = await productsService.findProducts();
  return res.json(data);
};


const createProduct = async (req, res) => {
  const { title, amount, price, expirationDate } = req.body;

  const { userId } = req.user;

  const result = await productsService.createProduct({
    title, amount, price, expirationDate, userId, 
  });

  return res.json({
    message: result,
  });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, amount, price } = req.body;

  const result = await productsService.updateProduct({
    id, title, amount, price
  });

  return res.json({ message: result });

};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  const result = await productsService.deleteProduct(productId);

  return res.status(404).json({
    message: result,
  });
};


module.exports = {
  findProductById,
  findProducts,
  createProduct,
  updateProduct,
  deleteProduct
};
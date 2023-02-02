const Product = require('../database/product.model');

const findProductById = (productId) => Product.findByPk(productId);

const findProducts = () => Product.findAll();

const createProduct = async ({
  title,
  amount,
  price
}) => {

  if (!title || !amount || !price) throw new Error();

  if (price < 0) throw new Error();


  const productInDb = await Product.findOne({
    where: {
      title,
    }
  });

  if (productInDb) throw new Error();

  await Product.create({
    title,
    amount,
    price
  });

  return 'CREATED';
};


const updateProduct = async ({
  id, title, amount, price
}) => {

  const product = await Product.findByPk(id);

  if (!product) throw new Error();

  // 1
  // product.title = title;
  // product.amount = amount;
  // product.price = price;


  // await product.save();


  // 2

  await Product.update({
    title, amount, price
  }, {
    where: {
      id
    }
  });

  return 'UPDATED';
};


const deleteProduct = async (productId) => {
  const product = await Product.findByPk(productId);

  if (!product) throw new Error();

  await Product.destroy({
    where: {
      id: productId
    }
  });

  return 'DELETED';
};

module.exports = {
  findProductById,
  findProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
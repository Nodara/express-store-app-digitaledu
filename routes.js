// api/ products
// api/ users
const router = require('express').Router();

const productRoutes = require('./modules/products/productRoutes')

// api/ products /
router.use('/products', productRoutes);

// TODO: 
router.use('/users', (req, res) => {
  return res.json({
    message: 'you requested users'
  })
});


module.exports = router;

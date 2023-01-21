const router = require('express').Router();

const productsStore = require('./productsStore');

const findActiveProduct = (productId) => productsStore.find((pr) => pr.id === Number(productId) && pr.isDeleted === 0 && pr.isExpired === 0);


// GET: api/products/:productId
router.get('/:productId', (req, res) => {
  const { productId } = req.params;

  const product = productsStore.find((pr) => pr.id === Number(productId));

  if (product) {
    return res.json(product);
  };

  return res.status(404).json({
    message: 'NOT FOUND'
  })
});

// GET: api/products/
router.get('/', (req, res) => {
  return res.json({
    products: productsStore.filter((pr) => pr.isDeleted === 0 && pr.isExpired === 0)
  })
});

// POST: api/products/ 
router.post('/', (req, res) => {
  const { title, amount, price } = req.body;

  const productInStore = productsStore.find((pr) => pr.title === title && pr.isDeleted === 0 && pr.isExpired === 0);

  if (productInStore) {
    return res.status(403).json(
      {
        message: 'ALREADY_EXIST'
      }
    )
  }

  const latestId = productsStore[productsStore.length - 1].id;

  productsStore.push({
    id: latestId + 1,
    title,
    amount,
    price,
    isDeleted: 0,
    isExpired: 0,
  });


  console.log('updated store is: ', productsStore);

  return res.json({
    message: 'CREATED'
  });

})


// POST api/products/sell/:product
router.post('/sell/:productId', (req, res) => {
  const { productId } = req.params;
  const { amount } = req.body;

  const product = findActiveProduct(productId);

  if (product) {

    console.log(product.amount, amount)
    if (product.amount >= amount) {
      product.amount -= amount;

      console.log('products left ', product);

      return res.json({
        message: 'SUCCESSFUL',
      })
    }

    return res.status(403).json({
      message: 'AMOUNT_IS_HIGHER_THAN_STORE'
    })
  };

  return res.status(404).json({
    message: 'NOT FOUND'
  })
})

// PUT: api/products/1
router.put('/:productId', (req, res) => {
  // TODO: 1. იპოვეთ პროდუქტი პირველრიგში, თუ ვერ იპოვეთ მოიქეცით შესაბამისად
  // TODO: 2. გაანახლეთ პროდუქტი გადაცემული მნიშნველობებით, (title, price, amount, isExpired)
  // TODO: 3. ასევე გააკეთეთ ცვლადების ვალიდაცია, title იყოს ლოგიკური ზომის, price, amount არ იყოს უარყოფითი რიცხვი და ა.შ
  // TODO: 4. წარმატებულად მოქმედების შემთხვევაში დააბრუნეთ მესიჯი
})

// DELETE  .../:productId
router.delete('/:productId', (req, res) => {
  const { productId } = req.params;

  const productInStore = productsStore.find((pr) => pr.id === Number(productId) && pr.isDeleted === 0);

  if (productInStore) {
    productInStore.isDeleted = 1;

    return res.json({
      message: 'DELETED'
    });
  };

  return res.status(404).json({
    message: 'NOT_FOUND'
  })
})


module.exports = router;
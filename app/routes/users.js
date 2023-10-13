var express = require('express');
var router = express.Router();

let usersController = require('../controllers/index');
router.get('/', usersController.home);
router.get('/products', usersController.getProduct);
router.get('/products/:itemId', usersController.getProductById);
router.post('/products', usersController.addNew);
router.put('/products/:itemId', usersController.updateProduct);
router.delete('/products/:itemId', usersController.removeProduct);

module.exports = router;

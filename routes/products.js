const express = require('express');
const router = express.Router();
const { productValidation, handleValidation } = require('../middleware/validation');
const { isAuthenticated } = require('../middleware/authenticate');

const productsController = require('../controllers/productsController');

router.get('/', productsController.getAll);

router.get('/:id', productsController.getSingle);

router.post('/', isAuthenticated ,productValidation, handleValidation, productsController.createProduct);

router.put('/:id', isAuthenticated ,productValidation, handleValidation, productsController.updateProduct);

router.delete('/:id',isAuthenticated, productsController.deleteProduct);

module.exports = router;

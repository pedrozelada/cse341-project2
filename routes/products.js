const express = require('express');
const router = express.Router();
const { productValidation, handleValidation } = require('../middleware/validation');

const productsController = require('../controllers/productsController');

router.get('/', productsController.getAll);

router.get('/:id', productsController.getSingle);

router.post('/', productValidation, handleValidation, productsController.createProduct);

router.put('/:id', productValidation, handleValidation, productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;

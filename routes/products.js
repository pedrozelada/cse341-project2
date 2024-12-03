const express = require('express');
const router = express.Router();
// const { contactValidation , contactValidationRules , validate } = require('../middleware/validation1');



const usersController = require('../controllers/productsController');

router.get('/',   usersController.getAll);

router.get('/:id',  usersController.getSingle);

router.post('/',   usersController.createProduct);

router.put('/:id',  usersController.updateProduct);

router.delete('/:id', usersController.deleteProduct);

module.exports = router;
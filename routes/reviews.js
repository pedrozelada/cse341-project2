const express = require('express');
const router = express.Router();
const { reviewValidation, handleValidation } = require('../middleware/validation');

const reviewsController = require('../controllers/reviewsController');

router.get('/product/:productId', reviewsController.getAllReviews);

router.get('/:id', reviewsController.getReviewById);

router.post('/', reviewValidation, handleValidation, reviewsController.createReview);

router.put('/:id', reviewValidation, handleValidation, reviewsController.updateReview);

router.delete('/:id', reviewsController.deleteReview);

module.exports = router;

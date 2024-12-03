const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all reviews for a specific product
const getAllReviews = async (req, res) => {
    const productId = req.params.productId;
    try {
        const result = await mongodb.getDatabase().db().collection('reviews').find({ productId: productId }).toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: error.message || 'Some error occurred while fetching reviews.' });
    }
};

// Get a single review by its ID
const getReviewById = async (req, res) => {
    const reviewId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDatabase().db().collection('reviews').find({ _id: reviewId }).toArray();
        if (result.length === 0) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (error) {
        console.error('Error fetching review:', error);
        res.status(500).json({ error: error.message || 'Some error occurred while fetching the review.' });
    }
};

// Create a new review
const createReview = async (req, res) => {
    const review = {
        userId: req.body.userId,
        productId: req.body.productId,
        rating: req.body.rating,
        reviewText: req.body.reviewText,
        createdAt: new Date()  // Automatically set the creation date to current date
    };

    try {
        const response = await mongodb.getDatabase().db().collection('reviews').insertOne(review);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Review created successfully', reviewId: response.insertedId });
        } else {
            res.status(500).json({ error: 'Error creating review' });
        }
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ error: error.message || 'Some error occurred while creating the review.' });
    }
};

// Update a review
const updateReview = async (req, res) => {
    const reviewId = new ObjectId(req.params.id);
    const updatedReview = {
        rating: req.body.rating,
        reviewText: req.body.reviewText
    };

    try {
        const response = await mongodb.getDatabase().db().collection('reviews').updateOne(
            { _id: reviewId },
            { $set: updatedReview }
        );

        if (response.modifiedCount > 0) {
            res.status(204).send();  // Successfully updated
        } else {
            res.status(404).json({ error: 'Review not found or no changes made' });
        }
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ error: error.message || 'Some error occurred while updating the review.' });
    }
};

// Delete a review
const deleteReview = async (req, res) => {
    const reviewId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDatabase().db().collection('reviews').deleteOne({ _id: reviewId });

        if (response.deletedCount > 0) {
            res.status(204).send();  // Successfully deleted
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ error: error.message || 'Some error occurred while deleting the review.' });
    }
};

module.exports = {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
};

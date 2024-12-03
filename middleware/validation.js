const { body, validationResult } = require('express-validator');

// Validation rules for products
const productValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required.")
    .isString()
    .withMessage("Product name must be a string."),
  
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required.")
    .isString()
    .withMessage("Description must be a string."),
  
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required.")
    .isString()
    .withMessage("Category must be a string."),
  
  body("price")
    .notEmpty()
    .withMessage("Price is required.")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number."),
  
  body("stockQuantity")
    .notEmpty()
    .withMessage("Stock quantity is required.")
    .isInt({ min: 0 })
    .withMessage("Stock quantity must be a non-negative integer."),
  
  body("weight")
    .notEmpty()
    .withMessage("Weight is required.")
    .isFloat({ gt: 0 })
    .withMessage("Weight must be a positive number."),
  
  body("isActive")
    .notEmpty()
    .withMessage("Active status is required.")
    .isBoolean()
    .withMessage("Active status must be a boolean."),
];

// Validation rules for reviews
const reviewValidation = [
  body("productId")
    .notEmpty()
    .withMessage("Product ID is required.")
    .isMongoId()
    .withMessage("Product ID must be a valid MongoDB ObjectId."),
  
  body("userId")
    .notEmpty()
    .withMessage("User ID is required.")
    .isString()
    .withMessage("User ID must be a string."),
  
  body("rating")
    .notEmpty()
    .withMessage("Rating is required.")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5."),
  
  body("reviewText")
    .trim()
    .notEmpty()
    .withMessage("Review text is required.")
    .isString()
    .withMessage("Review text must be a string."),
];

// Error handler middleware
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

module.exports = { productValidation, reviewValidation, handleValidation };

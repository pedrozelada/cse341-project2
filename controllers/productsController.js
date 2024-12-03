const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
    const result = await mongodb.getDatabase().db().collection('products').find();
    result.toArray().then((products) => {
       res.setHeader('Content-Type', 'application/json');
       res.status(200).json(products)
    });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: error.message || 'Some error occurred while fetching the product.' });
    }

};


const getSingle = async (req, res) => {
    const productId = new ObjectId(req.params.id);
    try {
    const result = await mongodb.getDatabase().db().collection('products').find({ _id: productId}).toArray();
    if (result.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: error.message || 'Some error occurred while fetching the product.' });
    }
};

const createProduct = async (req, res) => {
    const product = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        stockQuantity: req.body.stockQuantity,
        weight: req.body.weight,
        isActive: req.body.isActive
    };
    const response = await mongodb.getDatabase().db().collection('products').insertOne(product);
    if (response.acknowledged) {
        res.status(204).json({ message: 'Product created successfully', productId: response.insertedId });
    } else {
        res.status(500).json(response.error || 'Some error ocurred while creating new product');
    }
};

const updateProduct = async (req, res) => {
    const productId = new ObjectId(req.params.id);
    const product = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        stockQuantity: req.body.stockQuantity,
        weight: req.body.weight,
        isActive: req.body.isActive
    };
    try {
        const response = await mongodb.getDatabase().db().collection('products').replaceOne({ _id: new ObjectId(productId) }, product);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'User not found or no changes made' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: error.message || 'Some error occurred while updating the product' });
    }
};

const deleteProduct = async (req, res) => {
    const productId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: productId });

        if (response.deletedCount > 0) {
            res.status(204).send(); 
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: error.message || 'Some error occurred while deleting the product.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createProduct,
    updateProduct,
    deleteProduct
}
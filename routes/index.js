const router = require('express').Router();

// router.use('/', require ('./swagger'));

router.get('/', (req, res) => {
    // swagger.tags=['Hello World']
    res.send('Hello World');
});

router.use('/products', require('./products'));
router.use('/reviews', require('./routes/reviews'));


module.exports = router;
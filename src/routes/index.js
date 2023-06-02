const express = require('express');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const productRouter = require('./product.router');
const productImgRouter = require('./productImg.router');
const router = express.Router();

router.use('/users', userRouter)
router.use('/categories', categoryRouter)
router.use('/products', productRouter)
router.use('/products_images', productImgRouter)


module.exports = router;
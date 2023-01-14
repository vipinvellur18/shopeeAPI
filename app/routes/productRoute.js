const express = require('express')
const router = express.Router();
const productController = require('../controller/productController');
const {authenticateJWT, isAdmin, isShop} = require('../middlewares/auth');
const {registerValidation, validate, loginValidation, updationValidation} = require('../validator/shopValidator');

router.post('/create',authenticateJWT, isShop, productController.productCreate);
router.get('/list',authenticateJWT, isShop, productController.productListing);
router.get('/view/:pid',authenticateJWT, isShop, productController.productView);
router.delete('/delete/:pid',authenticateJWT, isShop, productController.deleteProduct);
router.delete('/deleteByVarient/:vid',authenticateJWT, isShop, productController.deleteProductByVarient);


module.exports = router;
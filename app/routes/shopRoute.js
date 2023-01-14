const express = require('express')
const router = express.Router();
const shopController = require('../controller/shopController');
const {authenticateJWT, isAdmin, isShop} = require('../middlewares/auth');
const {registerValidation, validate, loginValidation, updationValidation} = require('../validator/shopValidator');

router.post('/create',authenticateJWT, isAdmin, registerValidation(), validate, shopController.shopRegistration);
router.post('/login', loginValidation(), validate, shopController.shopLogin);
router.get('/view', authenticateJWT, isShop, shopController.viewShopProfile);
router.put('/update', authenticateJWT, isShop, updationValidation(), validate, shopController.updateShop);


module.exports = router;
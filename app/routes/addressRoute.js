const express = require('express')
const router = express.Router();
const addressController = require('../controller/addressController');
const {authenticateJWT, isUser} = require('../middlewares/auth');
const { createValidator, validate} = require('../validator/addressValidator');


router.post('/',authenticateJWT, isUser, createValidator(), validate, addressController.addressCreate);
router.get('/',authenticateJWT, isUser, addressController.addressListing);
router.get('/:id',authenticateJWT, isUser, addressController.addressView);
router.put('/:id',authenticateJWT, isUser, createValidator(), validate, addressController.addressUpdate);
router.delete('/:id',authenticateJWT, isUser, addressController.addressDelete);


module.exports = router;
const express = require('express')
const router = express.Router();
const userController = require('../controller/userController');
const {authenticateJWT} = require('../middlewares/auth');
const {registerValidation, validate, loginValidation, updationValidation} = require('../validator/userValidator');

router.post('/signup', registerValidation(), validate, userController.userRegistration);
router.post('/login', loginValidation(), validate, userController.userLogin);
router.get('/me',authenticateJWT,  userController.viewProfile);
router.put('/update',authenticateJWT, updationValidation(), validate,  userController.updateProfile);

module.exports = router;
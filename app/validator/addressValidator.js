const { body, validationResult } = require('express-validator');
const User = require('../model/User')

const createValidator = () => {
    return [
        body('name')
        .exists().withMessage('Name field is required.').bail()
        .trim()
        .not().isEmpty().withMessage('Name is required.')
        .escape(),
        body('address')
        .exists().withMessage('Address field is required.').bail()
        .trim()
        .not().isEmpty().withMessage('Address is required.')
        .isLength({max: 250 }).withMessage('Address should contain maximum of 250 charactors.')
        .isLength({min: 8 }).withMessage('Address must be more than 8 charactors.') 
        .escape(),
        body('location')
        .exists().withMessage('location field is required.').bail()
        .trim()
        .not().isEmpty().withMessage('location is required.')
        .isLength({max: 250 }).withMessage('location should contain maximum of 250 charactors.')
        .escape(),
        body('city')
        .exists().withMessage('city field is required.').bail()
        .trim()
        .not().isEmpty().withMessage('city is required.')
        .isLength({max: 250 }).withMessage('city should contain maximum of 250 charactors.')
        .escape(),
        body('state')
        .exists().withMessage('state field is required.').bail()
        .trim()
        .not().isEmpty().withMessage('state is required.')
        .isLength({max: 250 }).withMessage('state should contain maximum of 250 charactors.')
        .escape(),
        body('pin')
        .exists().withMessage('pin field is required.').bail()
        .trim()
        .not().isEmpty().withMessage('pin is required.')
        .isLength({max: 6, min:6 }).withMessage('pin should contain 6 charactors.')
        .escape(),
    ]
}



const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return res.status(422).json({
      message :"Error",error:extractedErrors
    })
  }

module.exports = {
    createValidator,
    validate
  }
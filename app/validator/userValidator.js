const { body, validationResult } = require('express-validator');
const Auth = require('../model/Auth')
const User = require('../model/User')

const registerValidation = () => {
    return [
        body('username')
        .exists().withMessage('Name field is required.').bail()
        .trim()
        .not().isEmpty().withMessage('Username is required.')
        .isLength({max: 250 }).withMessage('Userame should contain maximum of 250 charactors.')
        .isLength({min: 5 }).withMessage('Userame must be more than 5 charactors.') 
        .escape()
        .custom((value, {req}) => {
            return new Promise((resolve, reject) => {
                if(value!=''){   
                    Auth.findOne({
                        username: value
                    }).then(user => {
                        if(user){
                            reject(new Error('Username is already in use'))
                        }else{
                            resolve(true)
                        }
                    })                 
                }else{
                    resolve(true)
                }
            });
        }),  
        body('email')
        .exists().withMessage('Email field is required.').bail()
        .trim()
        .not().isEmpty().withMessage('Email is required.')
        .escape()
        .custom((value, {req}) => {
            return new Promise((resolve, reject) => {
                if(value!=''){   
                    Auth.findOne({
                        email: value
                    }).then(user => {
                        if(user){
                            reject(new Error('Email is already in use'))
                        }else{
                            resolve(true)
                        }
                    })                 
                }else{
                    resolve(true)
                }
            });
        }), 
        
        body('password')
        .exists().withMessage('Password field is required.').bail()
        .trim()
        .not().isEmpty().withMessage('Password is required.')
        .escape()
        .isLength({max: 16 , min: 6}).withMessage('Password should be countain 8-16 characters.')
    ]
}


const loginValidation = () => {
    return [
        body('userOrEmail')
        .exists().withMessage('Username or Email field is required.').bail()
        .trim()
        .not().isEmpty().withMessage('Username or Email is required.')
        .escape(),
        body('password')
        .exists().withMessage('Password field is required.').bail()
        .trim()
        .not().isEmpty().withMessage('Password is required.')
        .escape()
        .isLength({max: 16 , min: 6}).withMessage('Password should be countain 8-16 characters.')
    ]
}

const updationValidation = () => {
    return [
        body('mobile')
        .isLength({max: 10 , min: 10}).withMessage('Please, Enter 10 digit mobile number.')
        .custom((value, {req}) => {
            return new Promise((resolve, reject) => {
                if(value!=''){   
                    User.findOne({
                        $and: [
                            { mobile: value },
                            { uid: {$ne: req.user.id} }
                        ]
                    }).then(user => {
                        if(user){
                            reject(new Error('Mobile is already in use'))
                        }else{
                            resolve(true)
                        }
                    })                 
                }else{
                    resolve(true)
                }
            });
        }), 
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
    registerValidation,
    loginValidation,
    updationValidation,
    validate,
    
  }
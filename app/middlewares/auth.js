const jwt = require('jsonwebtoken');
const User = require('../model/Auth');


const authenticateJWT = (req, res, next) => {


    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.AUTHSECRET, (err, user) => {
            if (err) {
                return res.status(403).json({
                    message: "User authentication failed."
                });
            }
            // console.log(user);
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({
            message: "You are not authorized to perform this action."
          });
        res.sendStatus(401);
    }
};

const isUser = (req, res, next) => {
    const userId = req.user.id;
    User.findById(userId).then(user => {
        if (user.role === "user") {
            next();
            return;
        }
        res.status(403).send({
            message: "You are not authorized to perform this action."
        });
        return;
    });
};  


const isAdmin = (req, res, next) => {
    const userId = req.user.id;
    User.findById(userId).then(user => {
        if (user.role === "admin") {
            next();
            return;
        }
        res.status(403).send({
            message: "You are not authorized to perform this action."
        });
        return;
    });
};  


const isShop = (req, res, next) => {
    const userId = req.user.id;
    User.findById(userId).then(user => {
        if (user.role === "shop") {
            next();
            return;
        }
        res.status(403).send({
            message: "You are not authorized to perform this action."
        });
        return;
    });
};  



module.exports={authenticateJWT, isUser, isAdmin, isShop};


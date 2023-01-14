const  Auth  =  require('../model/Auth');
const  Shop  =  require('../model/Shop');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const generator = require('generate-password');
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const path = require('path')

exports.shopRegistration = async (req, res, next) => {

    const passwords = generator.generate({
        length: 8,
        uppercase: true
    });

    // mailSending(req.body.email, passwords)

    
    Auth.create({
        username:req.body.username,
        email:req.body.email,
        password:bcrypt.hashSync(passwords, 8),
        role:"shop"
    }).then(user =>{
        Shop.create({
            uid:user._id,
            shop_name: req.body.shop_name,
            email: req.body.email,
            mobile: req.body.mobile,
            owner_name: req.body.owner_name,
            address: req.body.address,
            location: req.body.location,
            city: req.body.city,
            state: req.body.state,
            pin: req.body.pin
        }).then(shops =>{

            mailSending(req.body.email, passwords)

            res.status(200).json({message:"Registration Success",data:shops})
        })
    }).catch(err =>{
        res.status(500).json(err)
    })
    
};



exports.shopLogin = async (req, res, next) => {

    Auth.findOne({
        $or: [
            { username: req.body.userOrEmail },
            { email: req.body.userOrEmail }
        ]
      }).then(async user => {
  
          if (!user) {
            return res.status(404).send({ message: "Couldn't find account" });
          }
          var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          ); 
          if (!passwordIsValid) {
            return res.status(404).send({ message: "Password is incorrect." });
          }    

        var token = jwt.sign({ id: user.id, username: user.username,email:user.email, role: user.role }, process.env.AUTHSECRET, {
            expiresIn: 86400 // 24 hours
        });

          user.last_login = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
          user.save()
          res.json({message:"Login successfull",data:{
            id : user.id,
            username : user.username,
            email: user.email,
            role : user.role,
            token: token
          }});                            
      }).catch(err => {
        res.status(500).send({ message: err.message });
      })
    
};



exports.viewShopProfile = async (req, res, next) => {

  Shop.findOne({
    uid:req.user.id
  }).then(result =>{
    res.json({message:"success", data: result})
  }).catch(err => {
    res.json({message:err})
  })
  
};



exports.updateShop = async (req, res, next) => {

  Shop.findOne({
    uid:req.user.id
  }).then(result =>{
    result.shop_name =  req.body.shop_name,
    result.mobile =  req.body.mobile,
    result.owner_name =  req.body.owner_name,
    result.address =  req.body.address,
    result.location =  req.body.location,
    result.city =  req.body.city,
    result.state =  req.body.state,
    result.pin =  req.body.pin
    result.save();
    res.json({message:"success", data: result})
  }).catch(err => {
    res.json({message:err})
  })
  
};




const mailSending = async (email, password) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
        },
    });

    const handlebarOptions = {
        viewEngine: {
          extName: ".handlebars",
        //   partialsDir: path.resolve('./app/template'),
          partialsDir: path.join(__dirname, '../template'),
          defaultLayout: false,
        },
        viewPath: path.join(__dirname, '../template'),
        extName: ".handlebars",
    }

    transporter.use('compile', hbs(handlebarOptions));

    let info = await transporter.sendMail({
        from: {
        name:"noreplay@vipin.com",
        address: process.env.EMAIL
        },
        to: email,
        subject: "Congratulations, Shope added successfully",
        template: 'email',
        context: {
          email: email,
          password: password
        }
    });
    
}
const  Auth  =  require('../model/Auth');
const  User  =  require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.userRegistration = async (req, res, next) => {
    Auth.create({
        username:req.body.username,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, 8),
    }).then(user =>{
        User.create({
            uid:user._id,
            username:req.body.username,
            email:req.body.email,
        })
        res.status(200).json({message:"Registration Success",data:user})
    }).catch(err =>{
        res.status(500).json(err)
    })
};

exports.userLogin = async (req, res, next) => {

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




exports.viewProfile = async (req, res, next) => {

    if(!req.user){
        return res.json({message:"user not exist"})
    }

    Auth.findOne({
        _id:req.user.id
    }).then(async userData =>{
        let usersData = await User.findOne({uid:req.user.id})
        res.json({
            message:"success", 
            data: {
                id: userData._id,
                firstname:usersData.firstname,
                lastname:usersData.lastname,
                username:userData.username,
                email:userData.email,
                mobile:usersData.mobile,
                dp:usersData.dp,
                role:userData.role,
            }
        })
    })


};



exports.updateProfile = async (req, res, next) => {

    if(!req.user){
        return res.json({message:"user not exist"})
    }

    User.updateOne(
        {uid:req.user.id},
        {
            $set: {
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                mobile: req.body.mobile, 
                dp: req.body.dp,
            },
        },
        {upsert: true}
    ).then(userData =>{
        res.json({
            message:"successfully updated profile"
        })
    })


};
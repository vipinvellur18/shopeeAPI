const  Address  =  require('../model/Address');


exports.addressCreate = async (req, res, next) => {

    const {name, address, location, city, state, pin, type} = req.body;

    Address.create({
        uid:req.user.id,
        name:name,
        address:address,
        location:location,
        city:city,
        state:state,
        pin:pin,
        type:type
    }).then(result =>{
        res.json({message:"success", data: result})
    }).catch(err =>{
        res.status(500).json({message:err})
    })

};

exports.addressListing = async (req, res, next) => {

    Address.find({
       uid:req.user.id
    }).then(result => {
        res.json({message:"success", data: result})
    }).catch(err =>{
        res.status(500).json({message:err})
    })

};

exports.addressView = async (req, res, next) => {

    Address.findOne({  
       $and: [
        { _id:req.params.id },
        { uid: req.user.id }
    ]
    }).then(result => {
        if(result){
            res.status(200).json({message:"success", data: result})
        }else{
            res.status(404).json({message:"sorry no result found"}) 
        }
    }).catch(err =>{
        res.status(500).json({message:err})
    })

};


exports.addressUpdate = async (req, res, next) => {

    Address.findOne({  
       $and: [
        { _id:req.params.id },
        { uid: req.user.id }
    ]
    }).then(result => {
        if(result){
            result.name = req.body.name,
            result.address = req.body.address,
            result.location = req.body.location,
            result.city = req.body.city,
            result.state = req.body.state,
            result.pin = req.body.pin,
            result.type = req.body.type
            result.save();

            res.status(404).json({message:"success", data:result}) 

        }else{
            res.status(404).json({message:"sorry no result found"}) 
        }
    }).catch(err =>{
        res.status(500).json({message:err})
    })

};



exports.addressDelete = async (req, res, next) => {

    Address.findOne({  
       $and: [
        { _id:req.params.id },
        { uid: req.user.id }
    ]
    }).then(result => {
        if(result){
            result.deleteOne();
            res.status(200).json({message:"deleted successfully"}) 
        }else{
            res.status(404).json({message:"sorry no result found"}) 
        }
    }).catch(err =>{
        res.status(500).json({message:err})
    })

};
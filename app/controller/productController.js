const Shop = require('../model/Shop');
const Product = require('../model/Product');
const  MobileSpecs  =  require('../model/Category/mobile/MobileSpecs');
const  MobileSensor  =  require('../model/Category/mobile/Sensor');
const  MobileVarient  =  require('../model/Category/mobile/Varient');
const  MobileVarientImage  =  require('../model/Category/mobile/VarientImages');

exports.productCreate = async (req, res, next) => {

    const { name, description, category, image } = req.body

    let shopData = await Shop.findOne({uid:req.user.id})
    
    if(!shopData){
        return res.json({message:"shop not found"})
    }

    Product.create({
        sid: shopData._id,
        name: name,
        description: description,
        category: category,
        image: image
    }).then(async prod =>{
        if(category === "mobile"){
            VarientCreate(prod, req.body.varient)
            SpecificationCreate(prod._id, req)
        }else if(category === "fashion"){
            console.log("error")
        }
        res.json({message:"success", data: prod})
    })

};


const VarientCreate =async (prod, varient)=>{

  for(let i=0; i < varient.length; i++){
    
    let varientSubmit = await MobileVarient.create({
        pid: prod._id,
        ram: varient[i].ram,
        internal: varient[i].internal,
        color: varient[i].color,
        price: varient[i].price,
        offer:varient[i].offer
    })

    console.log(varient[i].offer)
    
    for(let j=0; j < varient[i].image.length; j++){
        MobileVarientImage.create({
            pid:prod._id,
            vid: varientSubmit._id,
            image: varient[i].image[j]
        })
    }
    
  }

}



const SpecificationCreate =(pid, req)=> {

    const { 
        model_number, model_name, browse_type, sim_type, touchscreen, otg, sound, sar, brand, os, processor_brand, 
        processor, core, primary_clock, secondary_clock, disaplay_type, display_colors, display_size, resolution, 
        resolution_type, frame_rate, graphic_ppi, gpu, aspect_ratio, hybrid_sim, rear_cam_count, rear_cam1, rear_cam2, 
        rear_cam3, front_cam_count, front_cam1, pri_cam_feat, sec_cam_feat, hd_recording, fullhd_recording, video_recor_res, 
        digital_zoom, video_rec_res, video_fps, network_type, volte, bluetooth, bluetooth_version, wifi, wifi_version, 
        nfc, usb_connectivity, audio_jack, gps_support, battery, width, height, depth, weight, other_features 
    } = req.body

    MobileSpecs.create({
        pid:pid,
        model_number:model_number,
        model_name:model_name,
        browse_type:browse_type,
        sim_type:sim_type,
        touchscreen:touchscreen,
        otg:otg,
        sound:sound,
        sar:sar,
        brand:brand,
        os:os,
        processor_brand:processor_brand,
        processor:processor,
        core:core,
        primary_clock:primary_clock,
        secondary_clock:secondary_clock,
        disaplay_type:disaplay_type,
        display_colors:display_colors,
        display_size:display_size,
        resolution:resolution,
        resolution_type:resolution_type,
        frame_rate:frame_rate,
        graphic_ppi:graphic_ppi,
        gpu:gpu,
        aspect_ratio:aspect_ratio,
        hybrid_sim:hybrid_sim,
        rear_cam_count:rear_cam_count,
        rear_cam1:rear_cam1,
        rear_cam2:rear_cam2,
        rear_cam3:rear_cam3,
        front_cam_count:front_cam_count,
        front_cam1:front_cam1,
        pri_cam_feat:pri_cam_feat,
        sec_cam_feat:sec_cam_feat,
        hd_recording:hd_recording,
        fullhd_recording:fullhd_recording,
        video_recor_res:video_recor_res,
        digital_zoom:digital_zoom,
        video_rec_res:video_rec_res,
        video_fps:video_fps,
        network_type:network_type,
        volte:volte,
        bluetooth:bluetooth,
        bluetooth_version:bluetooth_version,
        wifi:wifi,
        wifi_version:wifi_version,
        nfc:nfc,
        usb_connectivity:usb_connectivity,
        audio_jack:audio_jack,
        gps_support:gps_support,
        battery:battery,
        width:width,
        height:height,
        depth:depth,
        weight:weight,
        other_features:other_features
    })
    

    console.log(model_number)

}




exports.productListing = async (req, res, next) => {

    let shopData = await Shop.findOne({uid:req.user.id})
    
    if(!shopData){
        return res.json({message:"shop not found"})
    }

    Product.find({
        sid: shopData._id
    }).then(async prod =>{

        let mobArr = []
        for(let mobData of prod){
                
            if(mobData.category === "mobile"){

                let varData = await MobileVarient.find({
                    pid: mobData._id
                })   
                
                let specData = await MobileSpecs.findOne({
                    pid: mobData._id
                })   

                
                for(let varientData of varData){

                    let varImg = await MobileVarientImage.findOne({
                        vid: varientData._id
                    })   

                    let baseData = {
                        pid: mobData._id,
                        sid: mobData.sid,
                        vid: varientData._id,
                        name: mobData.name,
                        frame_rate: specData.frame_rate,
                        network_type: specData.network_type,
                        disaplay_type: specData.disaplay_type,
                        display_size: specData.display_size,
                        resolution_type: specData.resolution_type,
                        rear_cam1: specData.rear_cam1,
                        ram: varientData.ram,
                        internal: varientData.internal,
                        color:varientData.color,
                        image:varImg.image,
                        price:varientData.price,
                        offer:varientData.offer
                    }
    
                    mobArr = [...mobArr,baseData]

                }



            }

        }




        res.json({message:"success", data:mobArr})


    })

};




exports.productView = async (req, res, next) => {

    Product.findOne({
        _id:req.params.pid
    }).then(async result =>{

        if(result.category === "mobile"){
            mobileView(result, res)
        }
    })


};



const mobileView = async (result, res)=>{

    let varData = await MobileVarient.find({
        pid: result._id
    })   
    
    let specData = await MobileSpecs.findOne({
        pid: result._id
    })   

    let mobArr = []
    


    let varArr = [];

    for(varientData of varData){

        let varImg = await MobileVarientImage.find({
            vid: varientData._id
        })   

        let varNew = {
            vid: varientData._id,
            ram: varientData.ram,
            internal: varientData.internal,
            color: varientData.color,
            price: varientData.price,
            offer:varientData.offer,
            images: varImg
        }

        varArr = [...varArr, varNew]

    }


    let baseData = {
        pid: result._id,
        sid: result.sid,
        name: result.name,
        description:result.description,
        browse_type:specData.browse_type,
        sim_type:specData.sim_type,
        touchscreen:specData.touchscreen,
        otg:specData.otg,
        sound:specData.sound,
        brand:specData.brand,
        processor_brand:specData.processor_brand,
        core:specData.core,
        frame_rate:specData.frame_rate,
        hybrid_sim:specData.hybrid_sim,
        rear_cam_count:specData.rear_cam_count,
        front_cam_count:specData.front_cam_count,
        network_type:specData.network_type,
        volte:specData.volte,
        bluetooth:specData.bluetooth,
        wifi:specData.wifi,
        nfc:specData.nfc,
        usb_connectivity:specData.usb_connectivity,
        audio_jack:specData.audio_jack,
        gps_support:specData.gps_support,
        _id:specData._id,
        pid:specData.pid,
        model_number:specData.model_number,
        model_name:specData.model_name,
        sar:specData.sar,
        os:specData.os,
        processor:specData.processor,
        primary_clock:specData.primary_clock,
        secondary_clock:specData.secondary_clock,
        disaplay_type:specData.disaplay_type,
        display_colors:specData.display_colors,
        display_size:specData.display_size,
        resolution:specData.resolution,
        resolution_type:specData.resolution_type,
        graphic_ppi:specData.graphic_ppi,
        gpu:specData.gpu,
        aspect_ratio:specData.aspect_ratio,
        rear_cam1:specData.rear_cam1,
        rear_cam2:specData.rear_cam2,
        rear_cam3:specData.rear_cam3,
        front_cam1:specData.front_cam1,
        pri_cam_feat:specData.pri_cam_feat,
        sec_cam_feat:specData.sec_cam_feat,
        hd_recording:specData.hd_recording,
        fullhd_recording:specData.fullhd_recording,
        video_recor_res:specData.video_recor_res,
        digital_zoom:specData.digital_zoom,
        video_rec_res:specData.video_rec_res,
        video_fps:specData.video_fps,
        bluetooth_version:specData.bluetooth_version,
        wifi_version:specData.wifi_version,
        battery:specData.battery,
        width:specData.width,
        height:specData.height,
        depth:specData.depth,
        weight:specData.weight,
        other_features:specData.other_features,
        image:result.image,
        varient:varArr
    }

    mobArr = [...mobArr,baseData]
    
    res.json(mobArr)

}



exports.deleteProduct = async (req, res, next) => {
    Product.deleteOne({
        _id:req.params.pid
    }).then(prodDelete =>{
        MobileSpecs.deleteOne({
            pid:req.params.pid
        }).then(specDelete =>{
            MobileVarient.deleteMany({
                pid:req.params.pid
            }).then(mobileVar =>{
                MobileVarientImage.deleteMany({
                    pid:req.params.pid
                }).then(deleteImg =>{
                    res.json({message:'delete successfully'})
                })
            })
        })
    })
};


exports.deleteProductByVarient = async (req, res, next) => {


        MobileVarient.deleteMany({
            _id:req.params.vid
        }).then(mobileVar =>{
            MobileVarientImage.deleteMany({
                vid:req.params.vid
            }).then(deleteImg =>{
                res.json({message:'delete successfully'})
            })
        })
    
    
};


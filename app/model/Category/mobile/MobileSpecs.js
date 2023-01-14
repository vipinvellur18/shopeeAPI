const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const mobileSpecsSchema = mongoose.Schema({
    pid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    model_number: { type: String, required: true},
    model_name: { type: String, required: true},
    browse_type: { 
        type: String, 
        enum : ['smart', 'feature'],
        default: 'smart',
        required: true
    },
    sim_type: { 
        type: String, 
        enum : ['single', 'dual', 'triple', 'four'],
        default: 'dual',
        required: true
    },
    touchscreen: { 
        type: String, 
        enum : ['yes', 'no'],
        default: 'yes',
        required: true
    },
    otg: { 
        type: String, 
        enum : ['yes', 'no'],
        default: 'no',
        required: true
    },
    sound: { 
        type: String, 
        enum : ['stereo', 'mono'],
        default: 'stereo',
        required: true
    },
    sar: {type: String, required: true},
    brand: { 
        type: String, 
        enum : ['xiaomi', 'samsung','vivo','realme','oppo','apple','oneplus','motorola','nokia','google','micromax','sony','asus','lava', 'tecno', 'infinix', 'poco'],
        default: 'xiaomi',
        required: true
    },
    os: { type: String, required: true },
    processor_brand: {
        type: String, 
        enum : ['bionic', 'qualcomm', 'mediatek', 'kirin', 'exynos', 'tensor'],
        default: 'qualcomm',
        required: true   
    },
    processor: { type: String, required: true },
    core: {
        type: String, 
        enum : ['dual', 'hexa', 'octa', 'quad', 'single'],
        default: 'octa',
        required: true   
    },
    primary_clock: { type: String, required: true },
    secondary_clock: { type: String, required: true },
    disaplay_type : { type: String, required: true },
    display_colors : { type: String, required: true },
    display_size: { type: String, required: true },
    resolution: { type: String, required: true },
    resolution_type: { type: String, required: true },
    frame_rate: {
        type: String, 
        enum : ['24', '30', '40', '60', '90', '120', '144'],
        default: '120',
        required: true   
    },
    graphic_ppi:{ type: String, required:true },
    gpu: { type: String, required: true },
    aspect_ratio: { type: String, required: true },
    hybrid_sim: { 
        type: String, 
        enum : ['yes', 'no'],
        default: 'yes',
        required: true
    },
    rear_cam_count:{
        type: String, 
        enum : ['0', '1', '2', '3', '4',],
        default: '4',
        required: true   
    },
    rear_cam1: { type: String, required: true },
    rear_cam2: { type: String },
    rear_cam3: { type: String },
    rear_cam4: { type: String },
    front_cam_count: { 
        type: String, 
        enum : ['0', '1', '2'],
        default: '1',
        required: true   
    },
    front_cam1: { type: String },
    front_cam2: { type: String },
    pri_cam_feat: { type: String },
    sec_cam_feat: { type: String },
    hd_recording: { type: String },
    fullhd_recording: { type: String },
    video_recor_res: { type: String },
    digital_zoom: { type: String },
    video_rec_res: { type: String },
    video_fps: {type: String},
    network_type: { 
        type: String, 
        enum : ['2', '3', '4', '5'],
        default: '4',
        required: true   
    },
    volte: { 
        type: String, 
        enum : ['yes', 'no'],
        default: 'yes',
        required: true   
    },
    bluetooth:{
        type: String, 
        enum : ['yes', 'no'],
        default: 'yes',
        required: true      
    },
    bluetooth_version:{ type: String, required: true },
    wifi:{
        type: String, 
        enum : ['yes', 'no'],
        default: 'yes',
        required: true      
    },
    wifi_version:{ type: String, required: true },
    nfc:{
        type: String, 
        enum : ['yes', 'no'],
        default: 'yes',
        required: true      
    },
    usb_connectivity:{
        type: String, 
        enum : ['yes', 'no'],
        default: 'yes',
        required: true      
    },
    audio_jack:{
        type: String, 
        enum : ['yes', 'no'],
        default: 'yes',
        required: true      
    },
    gps_support:{
        type: String, 
        enum : ['yes', 'no'],
        default: 'yes',
        required: true      
    },
    battery: { type: String },
    width: { type: String },
    height: { type: String },
    depth: { type: String },
    weight: { type: String },
    other_features: {type: String}

});

mobileSpecsSchema.plugin(uniqueValidator);
module.exports = mongoose.model('MobileSpecs', mobileSpecsSchema);
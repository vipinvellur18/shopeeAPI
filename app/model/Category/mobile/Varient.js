const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const variantSchema = mongoose.Schema({
    pid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    ram: { 
        type: String, 
        enum : ['2', '3', '4', '6', '8', '12'],
        default: '6',
        required: true
    },
    internal: { 
        type: String, 
        enum : ['16', '32', '64', '128', '256', '512'],
        default: '128',
        required: true
    },
    price: { type: String, required: true },
    color: { type: String, required: true },
    offer: { type: String, required: true }
});

variantSchema.plugin(uniqueValidator);
module.exports = mongoose.model('MobileVarient', variantSchema);
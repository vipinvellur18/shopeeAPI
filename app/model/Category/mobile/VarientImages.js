const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const variantImageSchema = mongoose.Schema({
    pid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    vid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mobilevarients',
        required: true
    },
    image: { type: String, required: true }
});

variantImageSchema.plugin(uniqueValidator);
module.exports = mongoose.model('MobileVarientImages', variantImageSchema);
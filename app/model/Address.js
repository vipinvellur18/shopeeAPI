const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const addressSchema = mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: { type: String, required: true},
    address: { type: String, required: true},
    location: { type: String, required: true},
    city: { type: String, required: true},
    state: { type: String, required: true},
    pin: { type: String, required: true},
    type: { 
        type: String, 
        enum : ['home', 'work'],
        default: 'home',
        required: true
    },
});
addressSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Address', addressSchema);
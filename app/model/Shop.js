const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const shopSchema = mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    },  
    shop_name: { type: String, required: true},
    email: { type: String, required: true},
    mobile: { type: String, required: true},
    owner_name: { type: String, required: true},
    address: { type: String, required: true},
    location: { type: String, required: true},
    city: { type: String, required: true},
    state: { type: String, required: true},
    pin: { type: String, required: true},
    image: { type: String}
});
shopSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Shop', shopSchema);
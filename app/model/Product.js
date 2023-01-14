const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const productSchema = mongoose.Schema({
    sid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shops',
        required: true
    },
    name: { type: String, required: true, },
    description: { type: String, required: true},
    category: { 
        type: String, 
        enum : ['mobile', 'fashion', 'home', 'appliances', 'health'],
        default: 'mobile',
        required: true
    },
    image: { type: String, required: true },

});
productSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Product', productSchema);
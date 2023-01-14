const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const colorSchema = mongoose.Schema({
    pid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true  
    },
    rating: { type: String, required: true},
    review: { type: String, required: true},
});

colorSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Color', colorSchema);
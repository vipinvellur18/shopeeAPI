const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const authSchema = mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    },   
    firstname: { type: String },
    lastname: { type: String },
    username: { type: String, unique:true},
    email: { type: String, unique:true },
    mobile: { type: String, unique:true},
    dp: { type: String, unique:true},

});
authSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', authSchema);
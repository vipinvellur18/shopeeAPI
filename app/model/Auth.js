const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const authSchema = mongoose.Schema({
    username: { type: String, required: true, unique:true},
    email: { type: String, required: true, unique:true},
    password: { type: String, required: true},
    role: { 
        type: String, 
        enum : ['user', 'admin', 'shop'],
        default: 'user',
        required: true
    },
});
authSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Auth', authSchema);
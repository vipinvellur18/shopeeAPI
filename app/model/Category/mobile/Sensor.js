const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const sensorSchema = mongoose.Schema({
    pid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    sensor: { type: String, required: true},
});

sensorSchema.plugin(uniqueValidator);
module.exports = mongoose.model('MobileSensor', sensorSchema);
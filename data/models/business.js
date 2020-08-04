const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoordinateModel = require('./coordinates');

const businessSchema = new Schema({
    businessname: {
        type: String
    },
    about: String,
    businessType: {
        type: String,
        enum: ['brand', 'dispensary'],
        required: true
    }
}, { timestamps: Date });

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
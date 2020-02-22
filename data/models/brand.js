const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    brandname: {
        type: String,
        required: true,
        unique: true
    },
    about: String
}, { timestamps: Date });

module.exports = mongoose.model('Brand', brandSchema);
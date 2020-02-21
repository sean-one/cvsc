const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    timestamps: Date,
    brandname: {
        type: String,
        required: true,
        unique: true
    },
    about: String
});

module.exports = mongoose.model('Brand', brandSchema);
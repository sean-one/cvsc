const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    brandname: String,
    phone: Number,
    email: String,
    instagram: String,
    pref_contact: String,
    imageLink: String
});

module.exports = mongoose.model('Brand', brandSchema);
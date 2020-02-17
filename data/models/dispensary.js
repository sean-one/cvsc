const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dispSchema = new Schema({
    dispensaryname: String,
    street: String,
    city: String,
    state: String,
    zip: Number,
    phone: Number,
    email: String,
    instagram: String,
    pref_contact: String,
    imageLink: String
});

module.exports = mongoose.model('Dispensary', dispSchema);
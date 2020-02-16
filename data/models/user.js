const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: String,
    phone: Number,
    email: String,
    instagram: String,
    pref_contact: String,
    imageLink: String

});

module.exports = mongoose.model('User', userSchema);
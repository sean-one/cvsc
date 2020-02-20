const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        phone: Number,
        email: {
            type: String,
            unique: true
        },
        instagram: {
            type: String,
            unique: true
        }
    },
    alertmethod: String,
    images: {
        // need to ADD DEFAULT VALUE here
        profile: String
    },
    filters: {
        brand: [String],
        dispensary: [String],
        location: [String]
    },
    created: [String],
    reminder: [String]
});

module.exports = mongoose.model('User', userSchema);
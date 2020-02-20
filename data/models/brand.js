const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    brandname: {
        type: String,
        required: true,
        unique: true
    },
    about: String,
    contact: {
        phone: Number,
        email: String,
        instagram: String
    },
    images: {
        // need to ADD DEFAULT VALUES here
        profile: String,
        eventdefault: String,
    },
    events: [String],
    alerts: [String],
    creators: [String]
});

module.exports = mongoose.model('Brand', brandSchema);
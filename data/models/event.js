const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    startdate: {
        type: Date,
        required: true
    },
    enddate: {
        type: Date,
        required: true
    },
    images: {
        // this will default to either the brand or the dispensary image
        primary: String,
    },
    brands: [String],
    dispensary: String
});

module.exports = mongoose.model('Event', eventSchema);
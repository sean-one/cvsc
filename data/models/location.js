const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true,
        index: '2dsphere'
    },
    city: String,
    place_id: String
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
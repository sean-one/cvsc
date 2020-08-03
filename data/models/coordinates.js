const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coordsSchema = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

const Coordinate = mongoose.model('Coordinate', coordsSchema);

module.exports = Coordinate;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    formatted: String,
    city: String,
    lat: String,
    lng: String,
    refId: { type: Schema.Types.ObjectId }
});

module.exports = mongoose.model('Location', locationSchema);
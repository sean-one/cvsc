const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoordinateModel = require('./coordinates');

const businessAddressSchema = new Schema({
    formatted: String,
    city: String,
    location: CoordinateModel.schema
});

const BusinessAddress = mongoose.model('Business', locationSchema);

module.exports = Location;
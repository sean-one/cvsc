const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    eventname: String,
    date: String,
    starttime: Number,
    endtime: Number,
    details: String,
    imageLink: String,
    dispesaryId: String,
    brandId: String
});

module.exports = mongoose.model('Event', eventSchema);
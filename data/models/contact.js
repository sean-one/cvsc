const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    phone: Number,
    email: String,
    url: String,
    instagram: String,
    primaryContact: String,
    refId: { type: Schema.Types.ObjectId }
});

module.exports = mongoose.model('Contact', contactSchema);
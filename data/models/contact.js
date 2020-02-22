const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    phone: String,
    email: String,
    url: String,
    instagram: String,
    primary: String,
    refId: { type: Schema.Types.ObjectId }
});

module.exports = mongoose.model('Contact', contactSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Location = require('./location');

const businessSchema = new Schema({
    businessname: {
        type: String
    },
    about: String,
    businessType: {
        type: String,
        enum: ['brand', 'dispensary'],
        required: true
    },
    address: String,
    contactId: {
        type: Schema.Types.ObjectId,
        ref: 'Contact'
    },
    location: Location.schema
}, { timestamps: Date });


const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
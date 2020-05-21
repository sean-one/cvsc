const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const dispensarySchema = new Schema({
    dispensaryname: {
        type: String,
        validate: {
            validate: async dispensaryname => await Dispensary.where({ dispensaryname }).countDocuments() === 0,
            message: ({ value }) => `Dispensaryname [${value}] has already been taken.`
        },
        required: true
    },
    about: String,
    email: String,
    phone: String,
    instagram: {
        type: String,
        validate: checkInstagram
    },
    url: String,
    location: [String],
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }],
    alerts: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: Date });

const Dispensary = mongoose.model('Dispensary', dispensarySchema);

module.exports = Dispensary;
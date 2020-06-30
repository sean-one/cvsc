const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkInstagram = [
    {
        validator: async instagram => await /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/.test(instagram),
        message: ({ value }) => `${value} is an invalid instagram username`
    },
    {
        validator: async instagram => await User.where({ instagram }).countDocuments() === 0,
        message: ({ value }) => `the instagram account ${value} is associated with another account.`
    }
];

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
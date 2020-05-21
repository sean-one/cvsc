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

const brandSchema = new Schema({
    brandname: {
        type: String,
        validate:{
            validate: async brandname => await Brand.where({ brandname }).countDocuments() === 0,
            message: ({ value }) => `Brandname [${value}] has already been taken.`
        },
        required: true

    },
    about: String,
    url: String,
    instagram: {
        type: String,
        validate: checkInstagram
    },
    profilepic: String,
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }],
    alerts: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: Date});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
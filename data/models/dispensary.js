const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dispSchema = new Schema({
    dispensaryname: {
        type: String,
        validate: {
            validator: async dispensaryname => await Dispensary.where({ dispensaryname }).countDocuments() === 0,
            message: ({ value }) => `Dispensary ${value} has already been taken.`
        },
        required: true
    },
    about: String,
}, { timestamps: Date });

const Dispensary = mongoose.model('Dispensary', dispSchema);

module.exports = Dispensary
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    brandname: {
        type: String,
        validate: {
            validator: async brandname => await Brand.where({ brandname }).countDocuments() === 0,
            message: ({ value }) => `Brandname ${value} has already been taken.`
        },
        required: true
    },
    about: String
}, { timestamps: Date });

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
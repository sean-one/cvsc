const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactModel = require('./contact');
const ImagesModel = require('./imagestorage');
const LocationModel = require('./location');

const userSchema = new Schema({
    username: {
        type: String,
        validate: {
            validator: async username => await User.where({ username }).countDocuments() === 0,
            message: ({ value }) => `Username ${value} has already been taken.`
        },
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact: ContactModel.schema,
    images: ImagesModel.schema,
    location: LocationModel.schema
}, { timestamps: Date });

const User = mongoose.model('User', userSchema);

module.exports = User;
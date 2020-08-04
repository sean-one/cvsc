const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoordinateModel = require('./coordinates');

const userSchema = new Schema({
    username: {
        type: String,
        validate: {
            validator: async username => await User.where({ searchBy: username.toLowerCase() }).countDocuments() === 0,
            message: ({ value }) => `Username ${value} has already been taken.`
        },
        required: [ true, 'username is required' ]
    },
    searchBy: {
        type: String
    },
    password: {
        type: String,
        required: [ true, 'password is requird' ]
    },
    following: [{
        type: Schema.Types.ObjectId,
    }],
    location: [CoordinateModel.schema]
}, { timestamps: Date });

const User = mongoose.model('User', userSchema);

module.exports = User;
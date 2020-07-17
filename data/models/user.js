const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        validate: {
            validator: async username => await User.where({ searchBy: username.toLowerCase() }).countDocuments() === 0,
            message: ({ value }) => `Username ${value} has already been taken.`
        },
        required: true
    },
    searchBy: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    following: [{
        type: Schema.Types.ObjectId,
        // need to add validation to make sure there are no duplicates
    }]
}, { timestamps: Date });

const User = mongoose.model('User', userSchema);

module.exports = User;
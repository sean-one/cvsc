const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [ true, 'username is required' ]
    },
    searchBy: {
        type: String
    },
    password: {
        type: String,
        required: [ true, 'password is requird' ]
    },
    contactId: {
        type: Schema.Types.ObjectId,
        ref: 'Contact'
    },
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'Business'
    }]
}, { timestamps: Date });

const User = mongoose.model('User', userSchema);

module.exports = User;
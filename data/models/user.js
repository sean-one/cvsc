const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    timestamps: Date,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
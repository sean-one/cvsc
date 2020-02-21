const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dispSchema = new Schema({
    timestamps: Date,
    dispensaryname: {
        type: String,
        required: true,
        unique: true
    },
    about: String,
});

module.exports = mongoose.model('Dispensary', dispSchema);
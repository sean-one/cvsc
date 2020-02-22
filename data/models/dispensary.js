const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dispSchema = new Schema({
    dispensaryname: {
        type: String,
        required: true,
        unique: true
    },
    about: String,
}, { timestamps: Date });

module.exports = mongoose.model('Dispensary', dispSchema);
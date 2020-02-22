const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    about: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startdate: {
        type: Date,
        required: true
    },
    enddate: {
        type: Date,
        required: true
    },
    brands: [{
        type: Schema.Types.ObjectId,
        ref: 'Brand',
    }],
    dispensaryId: { 
        type: Schema.Types.ObjectId,
        ref: 'Dispensary',
        required: true
    }
}, { timestamps: Date });

module.exports = mongoose.model('Event', eventSchema);
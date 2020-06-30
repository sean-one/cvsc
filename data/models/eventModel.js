const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startdate:{
        type: Date,
        required: true
    },
    enddate: {
        type: Date,
        required: true
    },
    brands: [{
        type: Schema.Types.ObjectId,
        ref: 'Brand'
    }],
    dispensary: {
        type: Schema.Types.ObjectId,
        ref: 'Dispensary',
        required: true
    },
    location: [{
        type: String,
        required: true
    }],
    eventImage: {
        type: String,
        required: true
    },
    profilepic: {
        type: String,
        required: true
    },
}, { timestamps: Date });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
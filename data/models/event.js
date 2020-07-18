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
        min: [ Date.now(), 'quit living in the past man'],
        max: [new Date(Date.now() + (60*24*60*60*1000)), 'thats too far out man'],
        required: [ true, 'needs a start date']
    },
    enddate: {
        type: Date,
        min: [Date.now(), 'quit living in the past man'],
        max: [new Date(Date.now() + (60 * 24 * 60 * 60 * 1000)), 'thats too far out man'],
        required: [true, 'needs a end date']
    },
    brands: [{
        type: Schema.Types.ObjectId,
        ref: 'Business',
    }],
    dispensaryId: { 
        type: Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    }
}, { timestamps: Date });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event
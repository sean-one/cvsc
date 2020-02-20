const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
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
    images: {
        // this will default to either the brand or the dispensary image
        primary: String,
    },
    brands: [{ type: Schema.Types.ObjectId, ref: 'Brand' }],
    dispensary: { type: Schema.Types.ObjectId, ref: 'Dispensary' },
    updated: {
        updated_at: {
            type: Date,
            default: Date.now,
            required: true
        },
        updated_by: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
});

module.exports = mongoose.model('Event', eventSchema);
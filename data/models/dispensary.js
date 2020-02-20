const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dispSchema = new Schema({
    dispensaryname: {
        type: String,
        required: true,
        unique: true
    },
    about: String,
    contact: {
        address: {
            street: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            zip: {
                type: Number,
                required: true
            }
        },
        location: String,
        phone: Number,
        email: String,
        instagram: String
    },
    images: {
        // need to ADD DEFAULT VALUES here
        profile: String,
        eventdefault: String
    },
    events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    alerts: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    editors: [{ type: Schema.Types.ObjectId, ref: 'User' }],
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

module.exports = mongoose.model('Dispensary', dispSchema);
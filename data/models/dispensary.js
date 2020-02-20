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
            street: String,
            city: String,
            state: String,
            zip: Number
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
    editors: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Dispensary', dispSchema);
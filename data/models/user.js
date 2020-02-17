const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: String,
    phone: Number,
    email: String,
    instagram: String,
    pref_contact: String,
    imageLink: String,
    brand_filters: [ String ],
    disp_filters: [ String ],
    event_filters: [ String ],
    brand_alerts: [ String ],
    disp_alerts: [ String ],
    event_alerts: [ String ],

});

module.exports = mongoose.model('User', userSchema);
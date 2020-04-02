const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alertSchema = new Schema({
    alertusers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    refId: { type: Schema.Types.ObjectId }
});

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;
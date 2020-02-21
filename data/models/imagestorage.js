const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imagestoreSchema = new Schema({
    profile: String,
    refdefault: String,
    eventprimary: String,
    refId: { type: Schema.Types.ObjectId }
});

module.exports = mongoose.model('ImageStore', imagestoreSchema);
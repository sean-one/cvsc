const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imagestoreSchema = new Schema({
    profile: String,
    refdefault: String,
    eventprimary: String,
    refId: { type: Schema.Types.ObjectId }
}, { timestamps: Date });

const Images = mongoose.model('ImageStore', imagestoreSchema);

module.exports = Images;
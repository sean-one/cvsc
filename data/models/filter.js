const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filterSchema = new Schema({
    brandfilters: [{ type: Schema.Types.ObjectId, ref: 'Brand' }],
    dispensaryfilters: [{ type: Schema.Types.ObjectId, ref: 'Dispensary' }],
    refId: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Filter', filterSchema);
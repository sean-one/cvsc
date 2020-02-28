const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filterSchema = new Schema({
    brandfilters: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        unique: true
    }],
    dispensaryfilters: [{
        type: Schema.Types.ObjectId,
        ref: 'Dispensary'
    }],
    refId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    }
});

module.exports = mongoose.model('Filter', filterSchema);
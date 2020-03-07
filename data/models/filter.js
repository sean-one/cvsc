const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const filterSchema = new Schema({
    brandfilters: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Brand'
    }],
    dispensaryfilters: [{
        type: Schema.Types.ObjectId,
        ref: 'Dispensary'
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    }
});

const Filter = mongoose.model('Filter', filterSchema);

module.exports = Filter
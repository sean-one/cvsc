const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkInstagram = [
    {
        validator: async instagram => await /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/.test(instagram),
        message: ({ value }) => `${value} is an invalid instagram username`
    },
    {
        validator: async instagram => await User.where({ instagram }).countDocuments() === 0,
        message: ({ value }) => `the instagram account ${value} is associated with another account.`
    }
];

const userSchema = new Schema({
    username: {
        type: String,
        validate: {
            validator: async username => await User.where({ username }).countDocuments() === 0,
            message: ({ value }) => `Username [${value}] has already been taken.`
        },
        required: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        validate: {
            validator: async email => await User.where({ email }).countDocuments() === 0,
            message: ({ value }) => `That email [${value}] is already associated with an account.`
        }
    },
    phone: String,
    instagram: {
        type: String,
        validate: checkInstagram
    },
    profilePicture: String,
    location: [String],
    brandAlerts: [{
        type: Schema.Types.ObjectId,
        ref: 'Brand'
    }],
    dispensaryAlerts: [{
        type: Schema.Types.ObjectId,
        ref: 'Dispensary'
    }],
}, {timestamps: Date });

const User = mongoose.model('User', userSchema);

module.exports = User;
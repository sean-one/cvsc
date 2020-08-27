const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkInstagram = [
    {
        validator: async instagram => await /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/.test(instagram),
        message: ({ value }) => `${value} is an invalid instagram username` 
    },
    {
        validator: async instagram => await Contact.where({ instagram }).countDocuments() === 0,
        message: ({ value }) => `the instagram account ${value} is associated with another account.`
    }
];

const contactSchema = new Schema({
    phone: String,
    email: {
        type: String,
        // validate: {
        //     validator: async email => await User.where({ contact: this.email}).countDocuments() === 0,
        //     message: ({ value }) => `That email (${value}) is already associated with an account.`
        // }
    },
    url: String,
    instagram: {
        type: String,
        // validate: checkInstagram
    }
}, { timestamps: Date });

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
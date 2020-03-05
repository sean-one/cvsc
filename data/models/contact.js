const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    phone: String,
    email: {
        type: String,
        validate: {
            validator: async email => await Contact.where({ email }).countDocuments() === 0,
            message: ({ value }) => `That email (${value}) is already associated with an account.`
        }
    },
    url: String,
    instagram: {
        type: String
    },
    primary: String,
    refId: { type: Schema.Types.ObjectId }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact
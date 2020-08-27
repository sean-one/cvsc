// const Business = require('../../../data//models/business');
const Contact = require('../../../data/models/contact');
const User = require('../../../data/models/user');

module.exports = {
    Mutation: {
        createUserContact: async (parent, args) => {
            const findUser = await User.findById({ _id: args.userinput.id });
            if(!findUser) {
                throw new Error('user id not found')
            }
            let newContact = new Contact({
                email: args.userinput.email,
                instagram: args.userinput.instagram,
                phone: args.userinput.phone,
                url: args.userinput.url
            })
            return newContact.save()
                .then(contact => {
                    findUser.contactId = contact._id;
                    findUser.save()
                    return { ...contact._doc }
                })
                .catch(err => {
                    throw err;
                })
        },
        updateContact: async (parent, args) => {
            return await Contact.findOneAndUpdate(
                { _id: args.updatecontact.contactId },
                { $set: {
                    "email": args.updatecontact.email,
                    "phone": args.updatecontact.phone,
                    "url": args.updatecontact.url,
                    "instagram": args.updatecontact.instagram
                }},
                { omitUndefined: true, new: true }
            )
        },
        deleteContact: async (parent, args) => {
            return await Contact.findByIdAndDelete({ _id: args.id });
        }
    }
}
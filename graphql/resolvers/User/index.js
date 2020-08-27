const bcrypt = require('bcrypt');

const User = require('../../../data/models/user');
const Contact = require('../../../data/models/contact');
const Business = require('../../../data/models/business');

module.exports = {
    Query: {
        userByUsername: async (parent, args) => {
            return User.findOne({ searchBy: args.username.toLowerCase() })
                .then(user => {
                    if(!user) {
                        throw new Error('Username not found');
                    }
                    return { ...user._doc, password: null };
                })
                .catch(err => {
                    throw err;
                })
        },
        userById: async (parent, args) => {
            return User.findById({ _id: args.id })
                .then(user => {
                    if(!user) {
                        throw new Error('No user with that ID found')
                    }
                    return { ...user._doc, password: null }
                })
                .catch(err => {
                    throw err;
                })
        },
        users: async (parent, args) => {
            return User.find({})
                .then(users => {
                    return users.map(user => {
                        return { ...user._doc, password: null };
                    })
                })
                .catch(err => {
                    throw err;
                });
        }
    },
    Mutation: {
        createUser: async (parent, args) => {
            return User.findOne({ searchBy: args.userinput.username.toLowerCase() })
                .then(user => {
                    if(user) {
                        throw new Error('User already exists')
                    }
                    return bcrypt.hashSync(args.userinput.password, 10);
                })
                .then(hashedPassword => {
                    let newUser = new User({
                        username: args.userinput.username,
                        searchBy: args.userinput.username.toLowerCase(),
                        password: hashedPassword,
                    });
                    return newUser.save()
                })
                .then(result => {
                    return { ...result._doc, password: null }
                })
                .catch(err => {
                    throw err;
                });
        },
        updateUser: async (parent, args) => {
            return User.findOne({ _id: args.updateuserinput.id })
                .then(user => {
                    if(!user) {
                        throw new Error('Unknown User')
                    }
                    // only works to change password
                    const hashedPassword = bcrypt.hashSync(args.updateuserinput.password, 10);
                    user.password = hashedPassword;
                    return user.save()
                })
                .then(result => {
                    return { ...result._doc, password: "updated" };
                })
                .catch(err => {
                    throw err;
                })
        },
        deleteUserById: async (parent, args) => {
            return User.findByIdAndDelete(args.id)
                .then(user => {
                    if(!user) {
                        throw new Error('User not found')
                    }
                    return { ...user._doc, password: null }
                })
                .catch(err => {
                    throw err;
                })
        }
    },
    User: {
        contact: async (parent, args) => {
            return Contact.findOne({ _id: parent.contactId });
        },
        // brandsFollowed: async (parent, args) => {
        //     return Business.where('_id').in(parent.following).where({ businessType: 'brand' });
        // },
        // dispensariesFollowed: async (parent, args) => {
        //     return Business.where('_id').in(parent.following).where({ businessType: 'dispensary' });
        // }
    }
};
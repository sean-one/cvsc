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
                        throw new Error('user ID not found');
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
                        throw new Error('user ID not found')
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
                // this will return either a user that exist or undefined meaning the user was not found
                .then(user => {
                    // check for undefined
                    if(user) {
                        throw new Error('User already exists')
                    }
                    // if the user returns undefined then there is no duplicate
                    return bcrypt.hashSync(args.userinput.password, 10);
                })
                // take the returned hash password and create new user with it
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
                        throw new Error('user ID not found')
                    }
                    return { ...user._doc, password: null }
                })
                .catch(err => {
                    throw err;
                })
        },
        follow: async (parent, args) => {
            return Business.findById(args.businessId)
                .then(business => {
                    if(!business) {
                        throw new Error('business id not found');
                    }
                    return User.findById({ _id: args.userId })
                })
                .then(user => {
                    if(!user) {
                        throw new Error('user id not found');
                    }
                    user.following.addToSet(args.businessId)
                    return user.save()
                })
                .then(result => {
                    return { ...result._doc, password: null }
                })
                .catch(err => {
                    throw err;
                })
        },
        unfollow: async (parent, args) => {
            return Business.findById(args.businessId)
                .then(business => {
                    if(!business) {
                        throw new Error('business ID not found')
                    }
                    return User.findById({ _id: args.userId });
                })
                .then(user => {
                    if(!user) {
                        throw new Error('user ID not found')
                    }
                    user.following.pull(args.businessId);
                    return user.save()
                })
                .then(result => {
                    return { ...result._doc, password: null };
                })
                .catch(err => {
                    throw err;
                });
        }
    },
    User: {
        contact: async (parent, args) => {
            return Contact.findOne({ _id: parent.contactId });
        },
        brandsFollowed: async (parent, args) => {
            return Business.where('_id').in(parent.following).where({ businessType: 'brand' });
        },
        dispensariesFollowed: async (parent, args) => {
            return Business.where('_id').in(parent.following).where({ businessType: 'dispensary' });
        }
    }
};
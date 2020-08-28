const googleMapsClient = require('../../../utils/geocoder');

// model imports
const Business = require('../../../data/models/business');
const Contact = require('../../../data/models/contact');

module.exports = {
    Query: {
        businesses: async (parent, args) => {
            return Business.find({})
                .then(businesses => {
                    return businesses.map(business => {
                        return { ...business._doc }
                    })
                })
                .catch(err => {
                    throw err;
                })
        },
        businessById: async (parent, args) => {
            return Business.findById({ _id: args.id })
                .then(business => {
                    if(!business) {
                        throw new Error('business id not found')
                    }
                    return { ...business._doc }
                })
                .catch(err => {
                    throw err;
                })
        },
        brands: async (parent, args) => {
            return Business.find({ businessType: 'brand' })
        },
        dispensaries: async (parent, args) => {
            return Business.find({ businessType: 'dispensary' })
        }
    },
    Mutation: {
        createBusiness: async (parent, args) => {
            const geoCode = await googleMapsClient.geocode({ address: args.businessinput.address }).asPromise();
            let newBusiness = new Business({
                businessname: args.businessinput.businessname,
                about: args.businessinput.about,
                businessType: args.businessinput.businessType,
                address: args.businessinput.address,
                location: {
                    type: 'Point',
                    // note that longitude comes first in a GeoJSON coordinate array, no latitude
                    coordinates: [geoCode.json.results[0].geometry.location.lng, geoCode.json.results[0].geometry.location.lat],
                    city: geoCode.json.results[0].address_components[2].long_name,
                    place_id: geoCode.json.results[0].place_id
                }
            })
            return newBusiness.save()
                .then(business => {
                    return { ...business._doc }
                })
                .catch(err => {
                    throw err;
                })
        },
        updateBusiness: async (parent, args) => {
            return Business.findByIdAndUpdate(
                { _id: args.updatebusinessinput.id },
                { $set: {
                    "businessname": args.updatebusinessinput.businessname,
                    "about": args.updatebusinessinput.about,
                    "businessType": args.updatebusinessinput.businessType,
                    "address": args.updatebusinessinput.address
                }},
                { omitUndefined: true, new: true }
            )
        },
        deleteBusiness: async (parent, args) => {
            // need to remove business from user follow list
            // need to remove business from upcoming events
            return Business.findByIdAndDelete(args.id);
        }
    },
    Business: {
        contact: async (parent, args) => {
            return Contact.findOne({ _id: parent.contactId });
        }
    }
};
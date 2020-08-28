const graphql = require('graphql');
const { GraphQLDate, GraphQLDateTime } = require('graphql-iso-date');

const User = require('../data/models/user');
const Contact = require('../data/models/contact');
const Business = require('../data/models/business');
const Event = require('../data/models/event');
const googleMapsClient = require('../utils/geocoder');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLInt,
    GraphQLInputObjectType,
    GraphQLFloat,
    GraphQLID,
    GraphQLNonNull
} = graphql;

const BusinessType = new GraphQLObjectType({
    name: 'Businesses',
    fields: () => ({
        _id: { type: GraphQLID },
        createdAt: { type: GraphQLDate },
        updatedAt: { type: GraphQLDate },
        businessname: { type: GraphQLString },
        about: { type: GraphQLString },
        businessType: { type: GraphQLString },
        address: { type: GraphQLString },
        location: { type: LocationType },
        contact: {
            type: ContactType,
            resolve(parent, args) {
                return Contact.findOne({ contactFor: parent._id })
            }
        },
        events: {
            type: new GraphQLList(EventType),
            async resolve(parent, args) {
                if (parent.businessType == 'dispensary') {
                    return await Event.find({ dispensaryId: parent.id });
                } else {
                    return await Event.find({ brands: { $all: [parent.id] } });
                }
            }
        }
    })
});

const EventType = new GraphQLObjectType({
    name: 'Events',
    fields: () => ({
        _id: { type: GraphQLID },
        title: { type: GraphQLString },
        about: { type: GraphQLString },
        author: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.author)
            }
        },
        day: {
            type: GraphQLString,
            resolve(parent, args) {
                return parent.startdate.toDateString();
            }
        },
        starttime: {
            type: GraphQLString,
            resolve(parent, args) {
                return parent.startdate.toLocaleTimeString();
            }
        },
        endtime: {
            type: GraphQLString,
            resolve(parent, args) {
                return parent.enddate.toLocaleTimeString();
            }
        },
        brands: {
            type: new GraphQLList(BusinessType),
            resolve(parent, args) {
                return Business.where('_id').in(parent.brands)
            }
        },
        dispensary: {
            type: BusinessType,
            resolve(parent, args) {
                return Business.findById(parent.dispensaryId);
            }
        }
    })
});

const NewBusinessInputType = new GraphQLInputObjectType({
    name: 'NewBusinessInput',
    fields: () => ({
        businessname: { type: new GraphQLNonNull(GraphQLString) },
        about: { type: new GraphQLNonNull(GraphQLString) },
        businessType: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(GraphQLString) }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // event queries
        // NEED - eventByCity
        events: {
            type: new GraphQLList(EventType),
            resolve(parent, args){
                return Event.find({})
            }
        },
        eventById: {
            type: EventType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Event.findById(args.id);
            }
        },
        eventsByDispensary: {
            type: new GraphQLList(EventType),
            args: {
                dispensaryId: { type: GraphQLID }
            },
            async resolve(parent, args){
                return await Event.find({ dispensaryId: args.dispensaryId })
            }
        },
        eventsByBrand: {
            type: new GraphQLList(EventType),
            args: {
                brandId: { type: GraphQLID }
            },
            async resolve(parent, args){
                return await Event.find({ brands: { $all: [args.brandId] } })
            }
        },
        eventByDate: {
            type: new GraphQLList(EventType),
            args: {
                startdate: { type: GraphQLString },
                enddate: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Event.find({
                    startdate: {
                        '$gt': new Date(args.startdate),
                        '$lt': new Date(args.enddate)
                    }
                })
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // business CRUD operations
        createBusiness: {
            type: BusinessType,
            args: {
                newBusinessInput: { type: NewBusinessInputType }
            },
            async resolve(parent, args){
                const geoCode = await googleMapsClient.geocode({ address: args.newBusinessInput.address }).asPromise();
                let newBusiness = new Business({
                    businessname: args.newBusinessInput.businessname,
                    about: args.newBusinessInput.about,
                    businessType: args.newBusinessInput.businessType,
                    address: geoCode.json.results[0].formatted_address,
                    location: {
                        type: 'Point',
                        // Note that longitude comes first in a GeoJSON coordinate array, not latitude.
                        coordinates: [geoCode.json.results[0].geometry.location.lng, geoCode.json.results[0].geometry.location.lat],
                        city: geoCode.json.results[0].address_components[2].long_name,
                        place_id: geoCode.json.results[0].place_id
                    }
                });
                return newBusiness.save();
            }
        },
        updateBusiness: {
            type: BusinessType,
            args: {
                id: { type: GraphQLID },
                businessname: { type: GraphQLString },
                about: { type: GraphQLString },
                businessAddress: { type: GraphQLString }
            },
            async resolve(parent, args){
                let updateBusinessObject = {};
                if(args.businessAddress){
                    const geoCode = await googleMapsClient.geocode({ address: args.businessAddress }).asPromise();
                    updateBusinessObject.address = geoCode.json.results[0].formatted_address;
                    updateBusinessObject.location = {
                        type: 'Point',
                        coordinates: [geoCode.json.results[0].geometry.location.lng, geoCode.json.results[0].geometry.location.lat],
                        city: geoCode.json.results[0].address_components[2].long_name,
                        place_id: geoCode.json.results[0].place_id
                    }
                    console.log(updateBusinessObject);
                }
                updateBusinessObject.businessname = args.businessname,
                updateBusinessObject.about = args.about
                return await Business.findByIdAndUpdate(args.id, updateBusinessObject, { omitUndefined: true, new: true });
            }
        },
        removeBusiness: {
            type: BusinessType,
            args: {
                id: { type: GraphQLID }
            },
            async resolve(parent, args){
                // remove business from any user follow list
                await User.findOneAndUpdate({ following: { $in: [args.id] } }, { $pull: { following: [args.id] } }, { new: true });
                const businessDoc = await Business.findById(args.id);
                // remove business from any upcoming events
                // ! this needs to check for the date so that business is removed only from "UPCOMING" events
                if (businessDoc.businessType == 'brand') {
                    await Event.findOneAndUpdate({ brands: { $in: [args.id] } }, { $pull: { brands: [args.id] } }, { new: true });
                } else {
                    // if the business is a dispensary then any upcoming events will be canceled
                    //! this also needs to check for a date to determin "UPCOMING" events are only one removed
                    await Event.deleteMany({ dispensaryId: args.id })
                }
                // finally delete the actual business entry
                return await Business.findByIdAndDelete(args.id);
            }
        },
        // event CRUD operations
        createEvent: {
            type: EventType,
            args: {
                title: { type: GraphQLString },
                about: { type: GraphQLString },
                author: { type: GraphQLID },
                startdate: { type: GraphQLString },
                enddate: { type: GraphQLString },
                brands: { type: new GraphQLList(GraphQLID) },
                dispensaryId: { type: GraphQLID }
            },
            resolve(parent, args) {
                let startdate = new Date(args.startdate);
                let enddate = new Date(args.enddate);
                let newEvent = new Event({
                    title: args.title,
                    about: args.about,
                    author: args.author,
                    startdate: startdate,
                    enddate: enddate,
                    brands: args.brands,
                    dispensaryId: args.dispensaryId
                });
                return newEvent.save();
            }
        },
        updateDateTime: {
            type: EventType,
            args: {
                id: { type: GraphQLID },
                startdate: { type: GraphQLString },
                enddate: { type: GraphQLString }
            },
            async resolve(parent, args){
                let startdate = new Date(args.startdate);
                let enddate = new Date(args.enddate);
                return await Event.findOneAndUpdate(
                    { _id: args.id },
                    { $set: {
                        "startdate": startdate,
                        "enddate": enddate
                    }},
                    { omitUndefined: true, new: true }
                )
                 
            }
        },
        addBrandToEvent: {
            type: EventType,
            args: {
                eventId: { type: GraphQLID },
                brandId: { type: GraphQLID }
            },
            async resolve(parent, args) {
               return await Event.findByIdAndUpdate(args.eventId, { $addToSet: { brands: args.brandId }}, { new: true });
            }
        },
        removeBrandFromEvent: {
            type: EventType,
            args: {
                eventId: { type: GraphQLID },
                brandId: { type: GraphQLID }
            },
            async resolve(parent, args) {
                return await Event.findByIdAndUpdate(args.eventId, { $pull: { brands: args.brandId } }, { new: true });
                
            }

        },
        removeEvent: {
            type: EventType,
            args: {
                id: { type: GraphQLID }
            },
            async resolve(parent, args) {
                return await Event.findByIdAndDelete(args.id);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
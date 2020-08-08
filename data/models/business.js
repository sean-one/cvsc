const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// geocoder
const googleMapsClient = require('../../utils/geocoder');

const Location = require('./location');

const businessSchema = new Schema({
    businessname: {
        type: String
    },
    about: String,
    businessType: {
        type: String,
        enum: ['brand', 'dispensary'],
        required: true
    },
    address: String,
    location: Location.schema
}, { timestamps: Date });

businessSchema.pre('save', async function(next) {
    const loc = await googleMapsClient.geocode({ address: this.address}).asPromise();
    this.location = {
        type: 'Point',
        coordinates: [loc.json.results[0].geometry.location.lng, loc.json.results[0].geometry.location.lat],
        city: loc.json.results[0].address_components[2].long_name
    }
    this.address = loc.json.results[0].formatted_address
    // console.log(loc);

})

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
const db = require('../dbConfig');

module.exports = {
    findBrands
}

function findBrands(entity, list) {
    if ((entity == 'brand' || 'dispensary' || 'event') && (list == 'filter' 
    || 'alerts' || 'editors')) {
        console.log(true, typeof(entity))
    } else {
        console.log(false)
    }
    // entity types - brand, dispensary, event
    // list types - filter, alerts, editors
    return db(`${entity}_${list}`);
}
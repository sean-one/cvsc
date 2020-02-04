const db = require('../dbConfig');

module.exports = {
    findBrands,
    findDispensaries,
    findBrandFilter,
    findDispFilter,
    findByBrand,
    findByDisp,
    findBrandByUser,
    findDispByUser,
    addBrandFilter,
    addDispFilter,
    removeBrandFilter,
    removeDispFilter,
    findEvents,
    findEventFilter,
    findByEvent,
    findEventByUser,
    addEventFilter,
    removeEventFilter
}

/* 

    BRAND MODELS

*/

function findBrands() {
    return db("brand_filter")
}

function findBrandFilter(user_id, brand_id) {
    return db("brand_filter")
        .where({ user_id, brand_id })
        .first();
}

function findByBrand(brand_id) {
    return db("brand_filter")
        .where({ brand_id });
}

function findBrandByUser(user_id) {
    return db("brand_filter")
        .where({ user_id });
}

function addBrandFilter(filter) {
    return db("brand_filter")
        .insert(filter)
        .into("brand_filter");
}

function removeBrandFilter(user_id, brand_id) {
    return db("brand_filter")
        .where({ user_id, brand_id })
        .del();
}

/*

    DISPENSARY MODELS

*/

function findDispensaries() {
    return db("dispensary_filter")
}

function findDispFilter(user_id, dispensary_id) {
    return db("dispensary_filter")
        .where({ user_id, dispensary_id })
        .first();
}

function findByDisp(dispensary_id) {
    return db("dispensary_filter")
        .where({ dispensary_id });
}

function findDispByUser(user_id) {
    return db("dispensary_filter")
        .where({ user_id });
}

function addDispFilter(filter) {
    return db("dispensary_filter")
        .insert(filter)
        .into("dispensary_filter");
}

function removeDispFilter(user_id, dispensary_id) {
    return db("dispensary_filter")
        .where({ user_id, dispensary_id })
        .del();
}

/*

    EVENT MODELS

*/

function findEvents() {
    return db("event_filter")
}

function findEventFilter(user_id, event_id) {
    return db("event_filter")
        .where({ user_id, event_id })
        .first();
}

function findByEvent(event_id) {
    return db("event_filter")
        .where({ event_id });
}

function findEventByUser(user_id) {
    return db("event_filter")
        .where({ user_id });
}

function addEventFilter(filter) {
    return db("event_filter")
        .insert(filter)
        .into("event_filter");
}

function removeEventFilter(user_id, event_id) {
    return db("event_filter")
        .where({ user_id, event_id })
        .del();
}
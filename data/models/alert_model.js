const db = require('../dbConfig');

module.exports = {
    findBrands,
    findDispensaries,
    findBrandAlert,
    findDispAlert,
    findByBrand,
    findByDisp,
    findBrandByUser,
    findDispByUser,
    addBrandAlert,
    addDispAlert,
    removeBrandAlert,
    removeDispAlert,
    findEvents,
    findEventAlert,
    findByEvent,
    findEventByUser,
    addEventAlert,
    removeEventAlert
}

/* 

    BRAND MODELS

*/

function findBrands() {
    return db("brand_alerts")
}

function findBrandAlert(user_id, brand_id) {
    return db("brand_alerts")
        .where({ user_id, brand_id })
        .first();
}

function findByBrand(brand_id) {
    return db("brand_alerts")
        .where({ brand_id });
}

function findBrandByUser(user_id) {
    return db("brand_alerts")
        .where({ user_id });
}

function addBrandAlert(filter) {
    return db("brand_alerts")
        .insert(filter)
        .into("brand_alerts");
}

function removeBrandAlert(user_id, brand_id) {
    return db("brand_alerts")
        .where({ user_id, brand_id })
        .del();
}

/*

    DISPENSARY MODELS

*/

function findDispensaries() {
    return db("dispensary_alerts")
}

function findDispAlert(user_id, dispensary_id) {
    return db("dispensary_alerts")
        .where({ user_id, dispensary_id })
        .first();
}

function findByDisp(dispensary_id) {
    return db("dispensary_alerts")
        .where({ dispensary_id });
}

function findDispByUser(user_id) {
    return db("dispensary_alerts")
        .where({ user_id });
}

function addDispAlert(filter) {
    return db("dispensary_alerts")
        .insert(filter)
        .into("dispensary_alerts");
}

function removeDispAlert(user_id, dispensary_id) {
    return db("dispensary_alerts")
        .where({ user_id, dispensary_id })
        .del();
}

/*

    EVENT MODELS

*/

function findEvents() {
    return db("event_alerts")
}

function findEventAlert(user_id, event_id) {
    return db("event_alerts")
        .where({ user_id, event_id })
        .first();
}

function findByEvent(event_id) {
    return db("event_alerts")
        .where({ event_id });
}

function findEventByUser(user_id) {
    return db("event_alerts")
        .where({ user_id });
}

function addEventAlert(filter) {
    return db("event_alerts")
        .insert(filter)
        .into("event_alerts");
}

function removeEventAlert(user_id, event_id) {
    return db("event_alerts")
        .where({ user_id, event_id })
        .del();
}
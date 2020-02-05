const db = require('../dbConfig');

module.exports = {
    findBrands,
    findDispensaries,
    findBrandEditor,
    findDispEditor,
    findByBrand,
    findByDisp,
    findBrandByUser,
    findDispByUser,
    addBrandEditor,
    addDispEditor,
    removeBrandEditor,
    removeDispEditor,
    findEvents,
    findEventEditor,
    findByEvent,
    findEventByUser,
    addEventEditor,
    removeEventEditor
}

/* 

    BRAND MODELS

*/

function findBrands() {
    return db("brand_editors")
}

function findBrandEditor(user_id, brand_id) {
    return db("brand_editors")
        .where({ user_id, brand_id })
        .first();
}

function findByBrand(brand_id) {
    return db("brand_editors")
        .where({ brand_id });
}

function findBrandByUser(user_id) {
    return db("brand_editors")
        .where({ user_id });
}

function addBrandEditor(filter) {
    return db("brand_editors")
        .insert(filter)
        .into("brand_editors");
}

function removeBrandEditor(user_id, brand_id) {
    return db("brand_editors")
        .where({ user_id, brand_id })
        .del();
}

/*

    DISPENSARY MODELS

*/

function findDispensaries() {
    return db("dispensary_editors")
}

function findDispEditor(user_id, dispensary_id) {
    return db("dispensary_editors")
        .where({ user_id, dispensary_id })
        .first();
}

function findByDisp(dispensary_id) {
    return db("dispensary_editors")
        .where({ dispensary_id });
}

function findDispByUser(user_id) {
    return db("dispensary_editors")
        .where({ user_id });
}

function addDispEditor(filter) {
    return db("dispensary_editors")
        .insert(filter)
        .into("dispensary_editors");
}

function removeDispEditor(user_id, dispensary_id) {
    return db("dispensary_editors")
        .where({ user_id, dispensary_id })
        .del();
}

/*

    EVENT MODELS

*/

function findEvents() {
    return db("event_editors")
}

function findEventEditor(user_id, event_id) {
    return db("event_editors")
        .where({ user_id, event_id })
        .first();
}

function findByEvent(event_id) {
    return db("event_editors")
        .where({ event_id });
}

function findEventByUser(user_id) {
    return db("event_editors")
        .where({ user_id });
}

function addEventEditor(filter) {
    return db("event_editors")
        .insert(filter)
        .into("event_editors");
}

function removeEventEditor(user_id, event_id) {
    return db("event_editors")
        .where({ user_id, event_id })
        .del();
}
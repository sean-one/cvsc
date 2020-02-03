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
    removeDispFilter
}

function findBrands() {
    return db("brand_filter")
}

function findDispensaries() {
    return db("dispensary_filter")
}

function findBrandFilter(user_id, brand_id) {
    return db("brand_filter")
        .where({ user_id, brand_id })
        .first();
}

function findDispFilter(user_id, dispensary_id) {
    return db("dispensary_filter")
        .where({ user_id, dispensary_id })
        .first();
}

function findByBrand(brand_id) {
    return db("brand_filter")
        .where({ brand_id });
}

function findByDisp(dispensary_id) {
    return db("dispensary_filter")
        .where({ dispensary_id });
}

function findBrandByUser(user_id) {
    return db("brand_filter")
        .where({ user_id });
}

function findDispByUser(user_id) {
    return db("dispensary_filter")
        .where({ user_id });
}

function addBrandFilter(filter) {
    return db("brand_filter")
        .insert(filter)
        .into("brand_filter");
}

function addDispFilter(filter) {
    return db("dispensary_filter")
        .insert(filter)
        .into("dispensary_filter");
}

function removeBrandFilter(user_id, brand_id) {
    return db("brand_filter")
        .where({ user_id, brand_id })
        .del();
}

function removeDispFilter(user_id, dispensary_id) {
    return db("dispensary_filter")
        .where({ user_id, dispensary_id })
        .del();
}
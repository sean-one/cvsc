const db = require('../dbConfig');

module.exports = {
    find,
    findFilter,
    findByBrand,
    findByUser,
    add,
    remove
}

function find() {
    return db("brand_filter")
}

function findFilter(user_id, brand_id) {
    return db("brand_filter")
        .where({ user_id, brand_id })
        .first();
}

function findByBrand(brand_id) {
    return db("brand_filter")
        .where({ brand_id });
}

function findByUser(user_id) {
    return db("brand_filter")
        .where({ user_id });
}

function add(filter) {
    return db("brand_filter")
        .insert(filter)
        .into("brand_filter");
}

function remove(user_id, brand_id) {
    return db("brand_filter")
        .where({ user_id, brand_id })
        .del();
}


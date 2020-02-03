const db = require('../dbConfig');

module.exports = {
    find,
    findFilter,
    findByDisp,
    findByUser,
    add,
    remove
}

function find() {
    return db("dispensary_filter")
}

function findFilter(user_id, dispensary_id) {
    return db("dispensary_filter")
        .where({ user_id, dispensary_id })
        .first();
}

function findByDisp(dispensary_id) {
    return db("dispensary_filter")
        .where({ dispensary_id });
}

function findByUser(user_id) {
    return db("dispensary_filter")
        .where({ user_id });
}

function add(filter) {
    return db("dispensary_filter")
        .insert(filter)
        .into("dispensary_filter");
}

function remove(user_id, dispensary_id) {
    return db("dispensary_filter")
        .where({ user_id, dispensary_id })
        .del();
}
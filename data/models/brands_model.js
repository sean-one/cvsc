const db = require('../dbConfig');

module.exports = {
    find,
    findById,
    findByEmail,
    add,
    update,
    remove
};

function find() {
    return db("brands");
}

function findById(id) {
    return db("brands")
        .where({ id })
        .first();
}

function findByEmail(email) {
    return db("brands")
        .where({ email })
        .first()
}

function add(brand) {
    return db("brands")
        .insert(brand)
        .into("brands")
}

function update(id, changes) {
    return db("brands")
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db("brands")
        .where({ id })
        .del();
}
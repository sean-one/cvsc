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
    return db("dispensaries");
}

function findById(id) {
    return db("dispensaries")
        .where({ id })
        .first();
}

function findByEmail(email) {
    return db("dispensaries")
        .where({ email })
        .first();
}

function add(dispensary) {
    return db("dispensaries")
        .insert(dispensary)
        .into("dispensaries");
}

function update(id, changes) {
    return db("dispensaries")
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db("dispensaries")
        .where({ id })
        .del();
}
const db = require('../dbConfig');

module.exports = {
    checkUser,
    findEntity,
    findEntityById,
    findByUser,
    addRow
}

function checkUser(user_id) {
    return db("users")
        .where({ user_id })
        .first();
}

function findEntity(table) {
    return db(table);
}

function findEntityById(table, query, id) {
    return db(table)
        .where(query, id);
}

function findByUser(table, user_id) {
    return db(table)
        .where({ user_id });
}

function addRow(table, entry) {
    return db(table)
        .insert(entry)
        .into(table);
}
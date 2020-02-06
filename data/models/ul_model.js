const db = require('../dbConfig');

module.exports = {
    findEntity,
    findEntityById,
    findByUser,
    addRow
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
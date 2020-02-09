const db = require('../dbConfig');

module.exports = {
    checkUser,
    checkBrand,
    checkBrandExist,
    findEntity,
    findEntityById,
    findByUser,
    addRow
}

function checkUser(id) {
    return db("users")
        .where({ id })
        .first();
}

function checkBrand(id) {
    return db("brands")
        .where({ id })
        .first();
}

function checkBrandExist(table, user_id, brand_id) {
    return db(table)
        .where({ user_id, brand_id })
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
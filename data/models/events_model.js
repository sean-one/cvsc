const db = require('../dbConfig');

module.exports = {
    find,
    findById,
    add,
    update,
    remove
};

function find() {
    return db("events");
}

function findById(id) {
    return db("events")
        .where({ id })
        .first();
}

function add(event) {
    return db('events')
        .inster(event)
        .into('events');
}

function update(id, changes) {
    return db('events')
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db('events')
        .where({ id })
        .del();
}
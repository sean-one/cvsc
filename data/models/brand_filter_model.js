const db = require('../dbConfig');

module.exports = {
    findByBrand,
    findByUser,
    add,
    remove
}

function findByBrand(brand) {
    return db("brand_filter")
        .where({ brandId: brand });
}

function findByUser(user) {
    return db("brand_filter")
        .where({ userId: user });
}


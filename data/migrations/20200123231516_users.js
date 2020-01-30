
exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.timestamps(true, true);

        table.string('username').unique().notNullable();

        table.bigInteger('phone');
        table.string('email').unique();
        table.string('instagram').unique();
        table.string('pref_contact');
        table.string('imageLink');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};

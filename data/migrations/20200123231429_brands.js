
exports.up = function (knex) {
    return knex.schema.createTable('brands', (table) => {
        table.increments();
        table.timestamps(true, true);

        table.string('brandname').unique().notNullable();

        table.bigInteger('phone');
        table.string('email').unique();
        table.string('instagram').unique();
        table.string('pref_contact');
        table.string('imageLink');

        table.specificType('editors', 'integer ARRAY');
        table.specificType('userAlerts', 'integer ARRAY');
        table.specificType('admins', 'integer ARRAY');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('brands');
};

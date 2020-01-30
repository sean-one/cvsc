
exports.up = function (knex) {
    return knex.schema.createTable('dispensaries', (table) => {
        table.increments();
        table.timestamps(true, true);

        table.string('dispensaryname').unique().notNullable();
        table.string('street').notNullable();
        table.string('city').notNullable();
        table.string('state').notNullable();
        table.integer('zip').notNullable();

        table.bigInteger('phone');
        table.string('email').unique();
        table.string('instagram').unique();
        table.string('pref_contact');
        table.string('imageLink');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('dispensaries');

};

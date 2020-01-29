
exports.up = function (knex) {
    return knex.schema.createTable('events', (table) => {
        table.increments();
        table.timestamps(true, true);

        table.string('eventname').notNullable();
        table.integer('date')
        table.integer('starttime')
        table.integer('endtime')
        table.text('details')
        table.string('imageLink');

        table.specificType('editors', 'integer ARRAY');
        table.specificType('userAlerts', 'integer ARRAY');
        table.specificType('admins', 'integer ARRAY');

        table.integer('dispensaryId').references('id').inTable('dispensaries').index();
        table.integer('brandId').references('id').inTable('brands').index();
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('events');

};

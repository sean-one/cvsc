
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

        table.integer('dispensaryId').references('id').inTable('dispensaries');
        table.integer('brandId').references('id').inTable('brands');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('events');

};

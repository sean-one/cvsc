
exports.up = function(knex) {
    return knex.schema
        .createTable('event_filter', (table) => {
            table.integer('user_id').references('id').inTable('users');
            table.integer('event_id').references('id').inTable('events');
        })
        .createTable('event_alerts', (table) => {
            table.integer('event_id').references('id').inTable('events');
            table.integer('user_id').references('id').inTable('users');
        })
        .createTable('event_editors', (table) => {
            table.integer('event_id').references('id').inTable('events');
            table.integer('user_id').references('id').inTable('users');
        })
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists('event_filter')
        .dropTableIfExists('event_alerts')
        .dropTableIfExists('event_editors');
};

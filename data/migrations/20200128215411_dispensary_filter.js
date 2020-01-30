
exports.up = function(knex) {
    return knex.schema
        .createTable('dispensary_filter', (table) => {
            table.integer('user_id').references('id').inTable('users');
            table.integer('dispensary_id').references('id').inTable('dispensaries');
        })
        .createTable('dispensary_alerts', (table) => {
            table.integer('user_id').references('id').inTable('users');
            table.integer('dispensary_id').references('id').inTable('dispensaries');
        })
        .createTable('dispensary_editors', (table) => {
            table.integer('user_id').references('id').inTable('users');
            table.integer('dispensary_id').references('id').inTable('dispensaries');
        })
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists('dispensary_filter')
        .dropTableIfExists('dispensary_alerts')
        .dropTableIfExists('dispensary_editors');
};

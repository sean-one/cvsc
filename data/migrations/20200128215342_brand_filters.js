
exports.up = function(knex) {
    return knex.schema
        .createTable('brand_filter', (table) => {
            table.integer('user_id').references('id').inTable('users');
            table.integer('brand_id').references('id').inTable('brands');
        })
        .createTable('brand_alerts', (table) => {
            table.integer('brand_id').references('id').inTable('brands');
            table.integer('user_id').references('id').inTable('users');
        })
        .createTable('brand_editors', (table) => {
            table.integer('brand_id').references('id').inTable('brands');
            table.integer('user_id').references('id').inTable('users');
        })
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists('brand_filter')
        .dropTableIfExists('brand_alerts')
        .dropTableIfExists('brand_editors');
};

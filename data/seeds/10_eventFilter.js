
exports.seed = function(knex, Promise) {
  return knex('event_filter').truncate()
    .then(function () {
      return knex('event_filter').insert([
        { user_id: 3, event_id: 1 },
      ]);
    });
};

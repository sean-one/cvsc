
exports.seed = function(knex, Promise) {
  return knex('event_editors').truncate()
    .then(function () {
      return knex('event_editors').insert([
        { event_id: 1, user_id: 3 },
      ]);
    });
};

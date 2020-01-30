
exports.seed = function(knex, Promise) {
  return knex('event_alerts').truncate()
    .then(function () {
      return knex('event_alerts').insert([
        { event_id: 1, user_id: 3 },
      ]);
    });
};

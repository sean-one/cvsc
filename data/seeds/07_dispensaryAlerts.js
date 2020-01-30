
exports.seed = function(knex, Promise) {
  return knex('dispensary_alerts').truncate()
    .then(function () {
      return knex('dispensary_alerts').insert([
        { dispensary_id: 1, user_id: 2 },
        { dispensary_id: 1, user_id: 3 },
        { dispensary_id: 1, user_id: 4 },
        { dispensary_id: 2, user_id: 2 },
        { dispensary_id: 2, user_id: 5 },
      ]);
    });
};

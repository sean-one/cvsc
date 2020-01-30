
exports.seed = function(knex, Promise) {
  return knex('dispensary_filter').truncate()
    .then(function () {
      return knex('dispensary_filter').insert([
        {user_id: 2, dispensary_id: 1},
        {user_id: 2, dispensary_id: 2},
        {user_id: 3, dispensary_id: 1},
        {user_id: 4, dispensary_id: 1},
        {user_id: 4, dispensary_id: 2},
        {user_id: 5, dispensary_id: 2},
      ]);
    });
};


exports.seed = function(knex, Promise) {
  return knex('dispensary_editors').truncate()
    .then(function () {
      return knex('dispensary_editors').insert([
        { dispensary_id: 1, user_id: 2 },
        { dispensary_id: 2, user_id: 4 },
      ]);
    });
};

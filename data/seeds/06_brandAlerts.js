
exports.seed = function(knex, Promise) {
  return knex('brand_alerts').truncate()
    .then(function () {
      return knex('brand_alerts').insert([
        { brand_id: 1, user_id: 3 },
        { brand_id: 1, user_id: 4 },
        { brand_id: 2, user_id: 1 },
        { brand_id: 2, user_id: 2 },
      ]);
    });
};

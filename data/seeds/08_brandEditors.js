
exports.seed = function(knex, Promise) {
  return knex('brand_editors').truncate()
    .then(function () {
      return knex('brand_editors').insert([
        { brand_id: 1, user_id: 2 },
        { brand_id: 2, user_id: 5 },
        { brand_id: 3, user_id: 4 },
      ]);
    });
};

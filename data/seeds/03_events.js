
exports.seed = function (knex, Promise) {
  return knex('events').truncate()
    .then(function () {
      return knex('events').insert([
        {
          id: 1,
          eventname: 'super stinky at budz',
          date: 1581926400000,
          starttime: 1581976800000,
          endtime: 1581984000000,
          details: 'come out and join us yadda yadda yadda',
          dispensaryId: 1,
          brandId: 2,
          imageLink: 'super-stinky-event_image',
        },
        {
          id: 2,
          eventname: 'mister haze at got greens',
          date: 1582617600000,
          starttime: 1582664400000,
          endtime: 1582671600000,
          details: 'find mister haze at got greens',
          dispensaryId: 2,
          brandId: 3,
          imageLink: 'mister-haze-event_image',

        }
      ]);
    });
};

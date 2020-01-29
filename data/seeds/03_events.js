
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {
          id: 1,
          eventname: 'super stinky at budz',
          date: 1548633600,
          starttime: 1400,
          endtime: 1600,
          details: 'come out and join us yadda yadda yadda',
          dispensaryId: 1,
          brandId: 2,
          imageLink: 'super-stinky-event_image',
          editors: [3,1],
          userAlerts: [3],
          admins: [1]
        }
      ]);
    });
};

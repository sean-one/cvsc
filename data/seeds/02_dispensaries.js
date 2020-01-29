
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('dispensaries').del()
    .then(function () {
      // Inserts seed entries
      return knex('dispensaries').insert([
        {
          id: 1,
          dispensaryname: 'budz',
          street: '123 road lane',
          city: 'palm springs',
          state: 'ca',
          zip: 92262,
          phone: 7603412233,
          email: 'budz@gmail.com',
          instagram: '@budz',
          pref_contact: 'instagram',
          imageLink: 'budz_profile_image',
          editors: [2,1],
          userAlerts: [2,3,4],
          admins: [1]
        },
        {
          id: 2,
          dispensaryname: 'got greens',
          street: '420 mill place',
          city: 'cathedral city',
          state: 'ca',
          zip: 92234,
          phone: 7602185594,
          email: 'info@gotgreens.com',
          instagram: '@got_greens',
          pref_contact: 'email',
          imageLink: 'got-green_profile_image',
          editors: [4,1],
          userAlerts: [2,5],
          admins: [1,4]
        }
      ]);
    });
};

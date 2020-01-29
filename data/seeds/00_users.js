
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          username: 'seanone',
          phone: 7605673179,
          email: 'basement365@gmail.com',
          instagram: '@senor_one_more',
          pref_contact: 'instagram',
          imageLink: 'seanone_profile_image',
          brandFilter: [2],
          dispensaryFilter: []
        },
        {
          id: 2,
          username: 'johnsmith',
          phone: 4523689154,
          email: 'jsmith@aol.com',
          instagram: '@john_smith',
          pref_contact: 'phone',
          imageLink: 'johnsmith_profile_image',
          brandFilter: '{"1","2"}',
          dispensaryFilter: '{"1","2"}'
        },
        {
          id: 3,
          username: 'sarawilliams',
          phone: 2548673258,
          email: 'saraw@workmail.net',
          instagram: '@sara',
          pref_contact: 'email',
          imageLink: 'sara_profile_image',
          brandFilter: [1],
          dispensaryFilter: [1]
        },
        {
          id: 4,
          username: 'bigsmoke',
          phone: 4204200420,
          email: 'bigsmoke420@gmail.com',
          instagram: '@b_smokin',
          pref_contact: 'instagram',
          imageLink: 'bigsmoke_profile_image',
          brandFilter: [1,3],
          dispensaryFilter: [1,2]
        },
        {
          id: 5,
          username: 'stoned_rider',
          phone: 8645293457,
          email: 'stoned_rider@yahoo.com',
          instagram: '@red-eyed-rider',
          pref_contact: 'instagram',
          imageLink: 'stonedrider_profile_image',
          brandFilter: [2],
          dispensaryFilter: [2]
        },
      ]);
    });
};

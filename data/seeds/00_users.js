
exports.seed = function (knex, Promise) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        {
          id: 1,
          username: 'seanone',
          phone: 7605673179,
          email: 'basement365@gmail.com',
          instagram: '@senor_one_more',
          pref_contact: 'instagram',
          imageLink: 'seanone_profile_image',
        },
        {
          id: 2,
          username: 'johnsmith',
          phone: 4523689154,
          email: 'jsmith@aol.com',
          instagram: '@john_smith',
          pref_contact: 'phone',
          imageLink: 'johnsmith_profile_image',
        },
        {
          id: 3,
          username: 'sarawilliams',
          phone: 2548673258,
          email: 'saraw@workmail.net',
          instagram: '@sara',
          pref_contact: 'email',
          imageLink: 'sara_profile_image',
        },
        {
          id: 4,
          username: 'bigsmoke',
          phone: 4204200420,
          email: 'bigsmoke420@gmail.com',
          instagram: '@b_smokin',
          pref_contact: 'instagram',
          imageLink: 'bigsmoke_profile_image',
        },
        {
          id: 5,
          username: 'stoned_rider',
          phone: 8645293457,
          email: 'stoned_rider@yahoo.com',
          instagram: '@red-eyed-rider',
          pref_contact: 'instagram',
          imageLink: 'stonedrider_profile_image',
        },
      ]);
    });
};

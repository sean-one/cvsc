
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('brands').del()
    .then(function () {
      // Inserts seed entries
      return knex('brands').insert([
        { 
          id: 1,
          brandname: 'super stinky',
          phone: 7601234569,
          email: 'info@superstinky.com',
          instagram: '@ss_stinky',
          pref_contact: 'instagram',
          imageLink: 'super-stink_profile_image',
          editors: [2],
          userAlerts: [3,4],
          admins: [1]
        },
        { 
          id: 2,
          brandname: 'dr green thumb',
          phone: 8184426549,
          email: 'web@drgreen.com',
          instagram: '@dr.green',
          pref_contact: 'email',
          imageLink: 'green-thumb_profile_image',
          editors: [5],
          userAlerts: [1,2],
          admins: [1]
        },
        { 
          id: 3,
          brandname: 'mister haze',
          phone: 5558675309,
          email: 'mister@haze.com',
          instagram: '@so_hazy',
          pref_contact: 'phone',
          imageLink: 'mister-haze_profile_image',
          editors: [4],
          userAlerts: [],
          admins: [1]
        },
      ]);
    });
};

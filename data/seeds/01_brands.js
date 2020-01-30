
exports.seed = function (knex, Promise) {
  return knex('brands').truncate()
    .then(function () {
      return knex('brands').insert([
        { 
          id: 1,
          brandname: 'super stinky',
          phone: 7601234569,
          email: 'info@superstinky.com',
          instagram: '@ss_stinky',
          pref_contact: 'instagram',
          imageLink: 'super-stink_profile_image',
        },
        { 
          id: 2,
          brandname: 'dr green thumb',
          phone: 8184426549,
          email: 'web@drgreen.com',
          instagram: '@dr.green',
          pref_contact: 'email',
          imageLink: 'green-thumb_profile_image',
        },
        { 
          id: 3,
          brandname: 'mister haze',
          phone: 5558675309,
          email: 'mister@haze.com',
          instagram: '@so_hazy',
          pref_contact: 'phone',
          imageLink: 'mister-haze_profile_image',
        },
      ]);
    });
};

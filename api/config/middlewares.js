module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

// // For diployment
// module.exports = [
//   'strapi::logger',
//   'strapi::errors',
//   'strapi::security',
//   {
//     name: 'strapi::cors',
//     config: {
//       origin: [
//         'https://threadnova-ecommerce.onrender.com',
//         'http://localhost:1337',
//         'http://localhost:5173'
//       ],
//       credentials: true,
//     },
//   },
//   'strapi::poweredBy',
//   'strapi::query',
//   'strapi::body',
//   'global::force-insecure-cookies', // ← ADD THIS CUSTOM MIDDLEWARE
//   {
//     name: 'strapi::session',
//     config: {
//       key: 'strapi.sid',
//       maxAge: 86400000,
//       secure: false, // ← FORCE NON-SECURE
//       httpOnly: true,
//       sameSite: 'lax',
//       signed: true,
//     },
//   },
//   'strapi::favicon',
//   'strapi::public',
// ];
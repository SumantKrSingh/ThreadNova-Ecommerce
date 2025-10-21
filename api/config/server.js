// module.exports = ({ env }) => ({
//   host: env('HOST', '0.0.0.0'),
//   port: env.int('PORT', 1337),
//   app: {
//     keys: env.array('APP_KEYS'),
//   },
//   webhooks: {
//     populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
//   },
// });
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'https://threadnova-ecommerce.onrender.com'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  proxy: true,
  allowedHosts: ['threadnova-ecommerce.onrender.com', '.threadnova-ecommerce.onrender.com', 'localhost'],
});

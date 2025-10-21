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
  proxy: env.bool('IS_PROXIED', true),
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  allowedHosts: ['.threadnova-ecommerce.onrender.com', 'threadnova-ecommerce.onrender.com', 'localhost'],
  settings: {
    cors: {
      enabled: true,
      origin: ['https://threadnova-ecommerce.onrender.com', 'http://localhost:1337'],
    },
  },


});
// 'use strict';

// module.exports = {
//   /**
//    * An asynchronous register function that runs before
//    * your application is initialized.
//    *
//    * This gives you an opportunity to extend code.
//    */
//   register(/*{ strapi }*/) {},

//   /**
//    * An asynchronous bootstrap function that runs before
//    * your application gets started.
//    *
//    * This gives you an opportunity to set up your data model,
//    * run jobs, or perform some special logic.
//    */
//   bootstrap(/*{ strapi }*/) {},
// };

module.exports = {
  register({ strapi }) {
    // Patch the session middleware to force secure: false
    const originalSessionMiddleware = strapi.server.use;
    strapi.server.use = function (middleware) {
      if (middleware && middleware.name === 'session') {
        // Force secure to false
        if (middleware.options) {
          middleware.options.secure = false;
        }
      }
      return originalSessionMiddleware.call(this, middleware);
    };
  },

  bootstrap({ strapi }) {
    // Override cookie options globally
    const originalSetCookie = strapi.server.httpServer.on;
    if (strapi.server.httpServer) {
      strapi.server.httpServer.on('request', (req, res) => {
        const originalSetHeader = res.setHeader;
        res.setHeader = function (name, value) {
          if (name.toLowerCase() === 'set-cookie') {
            if (Array.isArray(value)) {
              value = value.map(cookie => cookie.replace(/;\s*secure/i, ''));
            } else if (typeof value === 'string') {
              value = value.replace(/;\s*secure/i, '');
            }
          }
          return originalSetHeader.call(this, name, value);
        };
      });
    }
  },
};
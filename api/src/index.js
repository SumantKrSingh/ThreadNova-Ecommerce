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
'use strict';

module.exports = {
  register({ strapi }) {
    // Runs before initialization
  },

  bootstrap({ strapi }) {
    // Patch admin auth service to disable secure cookies
    const adminAuthService = strapi.admin?.services?.auth;

    if (adminAuthService && adminAuthService.createRefreshSession) {
      const originalCreateRefreshSession = adminAuthService.createRefreshSession;

      adminAuthService.createRefreshSession = async function (ctx, user) {
        const originalSet = ctx.cookies.set;
        ctx.cookies.set = function (name, value, options = {}) {
          options.secure = false;
          options.sameSite = 'lax';
          return originalSet.call(this, name, value, options);
        };

        try {
          return await originalCreateRefreshSession.call(this, ctx, user);
        } finally {
          ctx.cookies.set = originalSet;
        }
      };

      console.log('✅ Patched admin session to disable secure cookies');
    }
  },
};

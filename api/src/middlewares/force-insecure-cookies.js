module.exports = (config, { strapi }) => {
    return async (ctx, next) => {
        // Override cookie setter to force non-secure cookies
        const originalSet = ctx.cookies.set;
        ctx.cookies.set = function (name, value, options = {}) {
            if (options) {
                options.secure = false;
                options.sameSite = 'lax';
            }
            return originalSet.call(this, name, value, options);
        };

        await next();
    };
};
module.exports = ({ env }) => ({
    'users-permissions': {
        config: {
            jwtSecret: env('JWT_SECRET', 'default_jwt_secret_key'),
        },
    },
});

const withFonts = require('next-fonts');
module.exports = withFonts({
    env: {
        // TLS_REJECT_UNAUTHORIZED: 0,
        // BACKEND_URL: 'http://localhost:8000/'
        TLS_REJECT_UNAUTHORIZED: 1,
        BACKEND_URL: 'https://dev.unasporcastoria.com/'
    },
    webpack(config, options) {
        return config;
    }
});
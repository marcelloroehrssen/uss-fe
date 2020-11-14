const withFonts = require('next-fonts');
module.exports = withFonts({
    env: {
        // TLS_REJECT_UNAUTHORIZED: 0,
        // CDN_ENABLED: false,
        // BACKEND_URL: 'http://localhost:8000/'
        TLS_REJECT_UNAUTHORIZED: 1,
        CDN_ENABLED: true,
        BACKEND_URL: 'https://dev.unasporcastoria.com/'
    },
    webpack(config, options) {
        return config;
    }
});
const path = require('path');
const withCSS = require('@zeit/next-css');

// Used to set folders as alias to directly use in nextjs
const nextConfiguration = withCSS({
    publicRuntimeConfig: {
    // Will be available on both server and client
        NODE_ENV: process.env.NODE_ENV,
    },
    webpack: (config) => {
        const newConfig = config;
        newConfig.resolve.alias.utilities = path.join(__dirname, 'utilities'); // folder alias 1
        return newConfig;
    },
});

module.exports = nextConfiguration;

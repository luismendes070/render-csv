// ChatGPT nextJS webpack config
const path = require('path');

module.exports = {
  webpack: (config, { isServer }) => {
    // Custom webpack config for Next.js
    // Modify as needed
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    // Add your webpack 5 configurations here
    return config;
  }
};

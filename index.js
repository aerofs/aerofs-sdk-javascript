const api = require('./src/api'),
  config = require('./src/config'),
  client = require('./src/client'),
  babel_poly = require('babel-polyfill');

module.exports = global.aero = {
  initialize(options) {
    config.api_version = options['api_version'] || '1.3';
    config.host_url = options['host_url'];
    config.oauth_token =  options['oauth_token'];
    config.cache = options['cache'] || false;
    config.expire_cb = options['expire_cb'];
  },
  config : config,
  api : api,
  client : client
};

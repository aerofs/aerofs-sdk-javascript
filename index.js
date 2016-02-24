const api = require('./src/api'),
  config = require('./src/config'),
  client = require('./src/client'),
  babel_poly = require('babel-polyfill');

module.exports = global.aero = {
  initialize(options) {
    config.apiVersion = options['apiVersion'] || '1.3';
    config.maxChunksize = options['maxChunksize'] || Math.pow(2,16);
    config.cache = options['cache'] || false;
    config.hostUrl = options['hostUrl'] || '';
    config.oauthToken =  options['oauthToken'] || '';
    config.expireCb = options['expireCb'] || undefined;
  },
  config : config,
  api : api,
  client : client
};

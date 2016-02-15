const api = require('./src/api'),
  config = require('./src/config');

module.exports = global.aero = {
  initialize(options) {
    config['api_version']  = options['api_version'];
    config['host_url'] = options['host_url'];
    config['oauth_token'] =  options['oauth_token'];
    config['cache'] = options['cache'] || false;
  },
  config : config,
  api : api
};

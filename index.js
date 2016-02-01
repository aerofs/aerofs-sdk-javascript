const api = require("./src/api");
const config = require("./src/config");
const client = require("./src/client");

module.exports = global.aero = {
  // Set the information required for communication
  initialize(options) {
    config.set("host_name", options["host_name"]);
    config.set("oauth_token", options["oauth_token"]);
    config.set("suffix", "/api/v1.3/");
    client.initialize();
  },

  config : config,
  api : api
};

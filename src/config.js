// Configuration required to communicate with an AeroFS Appliance
// Oauth token in a cookie clientside

const config = {
  host_name : undefined,
  oauth_token : undefined
};

module.exports = {
  get(key) {
    return config[key];
  },

  set(key, value) {
    config[key] = value;
  }
};

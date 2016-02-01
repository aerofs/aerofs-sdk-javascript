var client = require("./client");

module.exports = {
  List(email) {
    var path  = ["users", email, "devices"].join("/");
    return client.get(path);
  },

  Get(did) {
    var path = ["devices", did].join("/");
    return client.get(path);
  },

  Update(did, name) {
    var path = ["devices", did].join("/");
    var data = {
      "name" : name
    };
    return client.put(path,data);
  },

  Status(did) {
    var path = ["devices", did, "status"].join("/");
    return client.get(path);
  }
};

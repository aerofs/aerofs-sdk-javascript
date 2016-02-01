const client = require("./client");
const util = require("./util");

module.exports = {
  List(email) {
    var path = ["users", email, "invitations"].join("/");
    return client.get(path);
  },

  Get(email, sid) {
    var path = ["users", email, "invitations", sid].join("/");
    return client.get(path);
  },

  Accept(email, sid, external) {
    var route = ["users", email, "invitations", sid].join("/");
    var params = {
      "external" : external
    };
    var path = util.generatePath(route, params);
    return client.post(path);
  },

  Ignore(email, sid) {
    var route = ["users", email, "invitations", sid].join("/");
    return client.del(route);
  }
};

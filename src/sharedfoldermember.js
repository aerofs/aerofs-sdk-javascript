const client = require("./client");
const SFM_ROUTE = "shares";

module.exports = {
  List(id, ifNoneMatch) {
    var route = [SFM_ROUTE, id, "members"].join("/");
    var headers = {
      "If-None-Match" : ifNoneMatch.join(",")
    };
    return client.get(route, headers);
  },

  Get(id, email, ifNoneMatch) {
    var route = [SFM_ROUTE, id, "members", email].join("/");
    var headers = {
      "If-None-Match" : ifNoneMatch.join(",")
    };
    return client.get(route, headers);
  },

  Add(id, email, permissions) {
    var route = [SFM_ROUTE, id, "members"].join("/");
    var data = {
      "email" : email,
      "permissions" : permissions
    };
    return client.post(route, data);
  },

  SetPermissions(id, email, permissions) {
    var route = [SFM_ROUTE, id, "members", email].join("/");
    var data = {"permissions" : permissions};
    return client.put(route, data);
  },

  Remove(id, email, ifMatch) {
    var route = [SFM_ROUTE, id, "members", email].join("/");
    var headers = {
      "If-Match" : ifMatch.join(",")
    };
    return client.del(route, headers);
  }
};

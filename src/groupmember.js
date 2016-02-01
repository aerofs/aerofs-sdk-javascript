var client = require("./client.js");
var GM_ROUTE = "groups";

module.exports = {
  List(gid) {
    var path = [GM_ROUTE, gid, "members"].join("/");
    return client.get(path);
  },

  Add(gid, email) {
    var path = [GM_ROUTE, gid, "members"].join("/");
    var data = {"email" : email};
    return client.post(path, data);
  },
  
  Get(gid, email) {
    var path = [GM_ROUTE, gid, "members", email].join("/");
    return client.get(path);
  },

  Remove(gid,email) {
    var path = [GM_ROUTE, gid, "members", email].join("/");
    return client.del(path);
  }

};

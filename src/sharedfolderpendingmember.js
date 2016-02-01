const client = require("./client");
const SFP_ROUTE = "shares";

module.exports = {
  List(sid, ifNone) {
    var path = [SFP_ROUTE, sid, "pending"].join("/");
    var headers = { "if-none-match" : ifNone };
    return client.get(path, headers);
  },

  GetMetadata(sid, email) {
    var path = [SFP_ROUTE, sid, "pending", email].join("/");
    return client.get(path);
  },

  Invite(sid, email, permissions, note) {
    var path = [SFP_ROUTE, sid, "pending"].join("/");
    var data = {
      "email" : gid,
      "note" : note,
      "permissions" : permissions
    };
    return client.post(path, data);
  },

  Remove(sid, email) {
    var path = [SFP_ROUTE, sid, "pending", email].join("/");
    return client.del(path);
  }
};

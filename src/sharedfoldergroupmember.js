const client = require("./client");
const SFG_ROUTE = "shares";

module.exports = {
  List(sid) {
    var path = [SFG_ROUTE, sid, "groups"].join("/");
    return client.get(path);
  },

  GetMetadata(sid, gid) {
    var path = [SFG_ROUTE, sid, "members", gid].join("/");
    return client.get(path);
  },

  Add(sid, gid ,permissions) {
    var path = [SFG_ROUTE, sid, "groups"].join("/");
    var data = {
      "id" : gid,
      "permissions" : permissions
    };
    return client.post(path, data);
  },

  SetPermissions(sid, gid, permissions) {
    var path = [SFG_ROUTE, sid, "groups", gid].join("/");
    var data = {
      "permissions" : permissions
    };
    return client.put(path, data);
  },

  Remove(sid, gid) {
    var path = [SFG_ROUTE, sid, "groups", gid].join("/");
    return client.del(path);
  }
};

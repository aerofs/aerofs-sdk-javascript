const client = require("./client");
const util = require("./util");
const GROUPS_ROUTE = "groups";

module.exports = {
  List(offset, results) {
    var params = { 
      "offset" : offset,
      "results" : results
    };
    var path = util.generatePath(GROUPS_ROUTE,params);
    return client.get(path);
  },

  Create(name) {
    var data = {"name" : name};

    return client.post(GROUPS_ROUTE, data);
  },

  Get(gid) {
    var path = [GROUPS_ROUTE, gid].join("/");
    return client.get(path);
  },

  Delete(gid) {
    var path = [GROUPS_ROUTE, gid].join("/");
    return client.get(path);
  }
};

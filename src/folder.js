var client =  require("./client");
var util = require("./util");
var FOLDERS_ROUTE = "folders";

module.exports = {
  GetMetadata(id, fields) {
    var route = [FOLDERS_ROUTE, id].join("/");
    var params = {
      "fields" : fields
    };
    var path = util.generatePath(route, params);
    return client.get(path);
  },

  GetPath(id) {
    var route = [FOLDERS_ROUTE, id, "path"].join("/");
    return client.get(route);
  }, 

  ListChildren(id) {
    var route = [FOLDERS_ROUTE, id, "children"].join("/");
    return client.get(route);
  },

  Create(parentName, name) {
    var data = {
      "parent" : parentName,
      "name" : name
    }; 
    return client.post(FOLDERS_ROUTE, data);
  },

  Move(id, parentName, newName, ifMatch) {
    var route = [FOLDERS_ROUTE, id].join("/");
    var data = {
      "parent" : parentName,
      "name" : newName
    }; 
    var headers = {
      "If-Match" : ifMatch
    }; 
    return client.put(route, data, headers);
  },

  Delete(id, ifMatch) {
    var route = [FOLDERS_ROUTE, id].join("/");
    var headers = {
      "If-Match" : ifMatch.join(",")
    }; 
    return client.del(route, headers);
  }
};

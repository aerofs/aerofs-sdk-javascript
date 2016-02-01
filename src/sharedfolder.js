var client = require("./client");
var SF_ROUTE = "shares";

module.exports = {
  List(email, ifNoneMatch) {
    var route = ["users", email, SF_ROUTE].join("/");
    var headers = { 
      "If-None-Match" : ifNoneMatch.join(",") 
    };
    return client.get(route, headers); 
  },

  GetMetadata(id, ifNoneMatch) {
    var route = [SF_ROUTE, id].join("/");
    var headers = { 
      "If-None-Match" : ifNoneMatch.join(",") 
    };
    return client.get(route, headers);
  },

  Create(name) {
    var data = {
      "name" : name
    };
    return client.post(SF_ROUTE, data);
  }
};

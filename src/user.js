const client = require("./client");
const util = require("./util");
const USERS_ROUTE = "users";

module.exports = {
  
  List(limit, after, before) {
    var params = {
      "limit" : limit.toString(),
      "after" : after,
      "before" : before
    };
    var path = util.generatePath(USERS_ROUTE, params);
    return client.get(path);
  },

  Get(email) {
    var route = [USERS_ROUTE, email].join("/");
    return client.get(route);
  },

  Update(email, first_name, last_name) {
    var route = [USERS_ROUTE, email].join("/");
    var data = { 
      "first_name" : first_name,
      "last_name" : last_name
    };
    return client.put(route, data);
  },

  Create(email, first_name, last_name) {
    var data = {
      "email" : email,
      "first_name" : first_name,
      "last_name" : last_name
    };
    return client.post(USERS_ROUTE, data);
  },

  Delete(email) { 
    var route = [USERS_ROUTE, email].join("/");
    return client.del(route);
  },

  ChangePassword(email, password) {
    var route = [USERS_ROUTE, email, "password"].join("/");
    var data = '"' + password + '"';
    return client.put(route, data);
  },

  DisablePassword(email) {
    var route = [USERS_ROUTE, email, "password"].join("/");
    return client.del(route); 
  },

  CheckTwoFactorAuth(email) {
    var route = [USERS_ROUTE, email, "two_factor"].join("/");
    return client.get(route); 
  },

  DisableTwoFactorAuth(email) {
    var route = [USERS_ROUTE, email, "password"].join("/");
    return client.del(route); 
  }
};

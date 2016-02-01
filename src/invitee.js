var client = require("./client");
const INVITEES_ROUTE = "invitees"

module.exports = {
  Get(email) {
    var route = [INVITEES_ROUTE,email].join("/");
    return client.get(route);
  },

  Create(email_to, email_from) {
    var data = {
      "email_to" : email_to,
      "email_from" : email_from
    };
    return client.post(INVITEES_ROUTE, data);
  },

  Delete(email) {
    var route = [INVITEES_ROUTE,email].join("/");
    return client.del(route);
  }

};

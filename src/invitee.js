'use strict';

const client = require('./client'),
  INVITEES_ROUTE = 'invitees';

module.exports = {
  Get(email) {
    return client.get(
      [INVITEES_ROUTE,email].join('/')
    );
  },

  Create(email_to, email_from) {
    return client.post(
      INVITEES_ROUTE, 
      { 'email_to' : email_to,
        'email_from' : email_from
      } 
    );
  },

  Delete(email) {
    return client.del(
     [INVITEES_ROUTE,email].join('/')
    );
  }

};

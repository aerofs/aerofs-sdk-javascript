'use strict';

const client = require('./client'),
  INVITEES_ROUTE = 'invitees';

module.exports = {
  get(email) {
    return client.get(
      [INVITEES_ROUTE,email].join('/')
    );
  },

  create(email_to, email_from) {
    return client.post(
      INVITEES_ROUTE, 
      { 'email_to' : email_to,
        'email_from' : email_from
      } 
    );
  },

  remove(email) {
    return client.del(
     [INVITEES_ROUTE,email].join('/')
    );
  }

};

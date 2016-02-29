'use strict';

const client = require('./client'),
  util = require('./util'),
  USERS_ROUTE = 'users';

module.exports = {
  list(limit, after, before) {
    limit = limit || 0;
    let params = {
      'limit' : limit.toString(),
      'after' : after,
      'before' : before
    };
    let path = util.generatePath(USERS_ROUTE, params);
    return client.get(path);
  },

  get(email) {
    return client.get(
      [USERS_ROUTE, email].join('/')
    );
  },

  update(email, first_name, last_name) {
    return client.put(
      [USERS_ROUTE, email].join('/'),
      { 'first_name' : first_name,
        'last_name' : last_name
      }
    );
  },

  create(email, first_name, last_name) {
    return client.post(
      USERS_ROUTE,
      { 'email' : email,
        'first_name' : first_name,
        'last_name' : last_name
      }
    );
  },

  remove(email) { 
    return client.del(
      [USERS_ROUTE, email].join('/')
    );
  },

  changePassword(email, password) {
    return client.put(
      [USERS_ROUTE, email, 'password'].join('/'),
      "'" + password + "'"
    );
  },

  disablePassword(email) {
    return client.del(
      [USERS_ROUTE, email, 'password'].join('/')
    );
  },

  checkTwoFactorAuth(email) {
    return client.get(
      [USERS_ROUTE, email, 'two_factor'].join('/')
    );
  },

  disableTwoFactorAuth(email) {
    return client.del(
      [USERS_ROUTE, email, 'password'].join('/')
    );

  }
};

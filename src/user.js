'use strict';

const client = require('./client'),
  util = require('./util'),
  USERS_ROUTE = 'users';

module.exports = {
  List(limit, after, before) {
    limit = limit || 0;
    let params = {
      'limit' : limit.toString(),
      'after' : after,
      'before' : before
    };
    let path = util.generatePath(USERS_ROUTE, params);
    return client.get(path);
  },

  Get(email) {
    return client.get(
      [USERS_ROUTE, email].join('/')
    );
  },

  Update(email, first_name, last_name) {
    return client.put(
      [USERS_ROUTE, email].join('/'),
      { 'first_name' : first_name,
        'last_name' : last_name
      }
    );
  },

  Create(email, first_name, last_name) {
    return client.post(
      USERS_ROUTE,
      { 'email' : email,
        'first_name' : first_name,
        'last_name' : last_name
      }
    );
  },

  Delete(email) { 
    return client.del(
      [USERS_ROUTE, email].join('/')
    );
  },

  ChangePassword(email, password) {
    return client.put(
      [USERS_ROUTE, email, 'password'].join('/'),
      "'" + password + "'"
    );
  },

  DisablePassword(email) {
    return client.del(
      [USERS_ROUTE, email, 'password'].join('/')
    );
  },

  CheckTwoFactorAuth(email) {
    return client.get(
      [USERS_ROUTE, email, 'two_factor'].join('/')
    );
  },

  DisableTwoFactorAuth(email) {
    return client.del(
      [USERS_ROUTE, email, 'password'].join('/')
    );

  }
};

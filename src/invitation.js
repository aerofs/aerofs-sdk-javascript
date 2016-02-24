'use strict';

const client = require('./client'),
  util = require('./util');

module.exports = {
  list(email) {
    return client.get(
      ['users', email, 'invitations'].join('/')
    );
  },

  get(email, sid) {
    return client.get(
      ['users', email, 'invitations', sid].join('/')
    );
  },

  accept(email, sid, external) {
    let route = ['users', email, 'invitations', sid].join('/');
    let params = {
      'external' : external
    };
    let path = util.generatePath(route, params);
    return client.post(path);
  },

  ignore(email, sid) {
    return client.del(
      ['users', email, 'invitations', sid].join('/')
    );
  }
};

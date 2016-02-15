'use strict';

const client = require('./client'),
  util = require('./util');

module.exports = {
  List(email) {
    return client.get(
      ['users', email, 'invitations'].join('/')
    );
  },

  Get(email, sid) {
    return client.get(
      ['users', email, 'invitations', sid].join('/')
    );
  },

  Accept(email, sid, external) {
    let route = ['users', email, 'invitations', sid].join('/');
    let params = {
      'external' : external
    };
    let path = util.generatePath(route, params);
    return client.post(path);
  },

  Ignore(email, sid) {
    return client.del(
      ['users', email, 'invitations', sid].join('/')
    );
  }
};

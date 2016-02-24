'use strict';

const client = require('./client'),
  SFP_ROUTE = 'shares';

module.exports = {
  list(sid, ifNone = []) {
    return client.get(
      [SFP_ROUTE, sid, 'pending'].join('/'),
      { 'if-none-match' : ifNone }
    );
  },

  getMetadata(sid, email) {
    return client.get(
      [SFP_ROUTE, sid, 'pending', email].join('/')
    );

  },

  invite(sid, email, permissions, note) {
    return client.post(
      [SFP_ROUTE, sid, 'pending'].join('/'),
      { 'email' : gid,
        'note' : note,
        'permissions' : permissions
      }
    );
  },

  remove(sid, email) {
    return client.del(
      [SFP_ROUTE, sid, 'pending', email].join('/')
    );
  }
};

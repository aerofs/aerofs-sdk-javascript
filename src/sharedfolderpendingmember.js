'use strict';

const client = require('./client'),
  SFP_ROUTE = 'shares';

module.exports = {
  List(sid, ifNone = []) {
    return client.get(
      [SFP_ROUTE, sid, 'pending'].join('/'),
      { 'if-none-match' : ifNone }
    );
  },

  GetMetadata(sid, email) {
    return client.get(
      [SFP_ROUTE, sid, 'pending', email].join('/')
    );

  },

  Invite(sid, email, permissions, note) {
    return client.post(
      [SFP_ROUTE, sid, 'pending'].join('/'),
      { 'email' : gid,
        'note' : note,
        'permissions' : permissions
      }
    );
  },

  Remove(sid, email) {
    return client.del(
      [SFP_ROUTE, sid, 'pending', email].join('/')
    );
  }
};

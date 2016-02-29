'use strict';

const client = require('./client'),
  SFG_ROUTE = 'shares';

module.exports = {
  list(sid) {
    return client.get(
      [SFG_ROUTE, sid, 'groups'].join('/')
    );
  },

  getMetadata(sid, gid) {
    return client.get(
      [SFG_ROUTE, sid, 'members', gid].join('/')
    );
  },

  add(sid, gid ,permissions) {
    return client.post(
      [SFG_ROUTE, sid, 'groups'].join('/'),
      { 'id' : gid,
        'permissions' : permissions
      }
    );
  },

  setPermissions(sid, gid, permissions) {
    return client.put(
      [SFG_ROUTE, sid, 'groups', gid].join('/'),
      { permissions : permissions }
    );
  },

  remove(sid, gid) {
    return client.del(
      [SFG_ROUTE, sid, 'groups', gid].join('/')
    );
  }
};

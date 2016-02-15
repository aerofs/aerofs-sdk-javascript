'use strict';

const client = require('./client'),
  SFG_ROUTE = 'shares';

module.exports = {
  List(sid) {
    return client.get(
      [SFG_ROUTE, sid, 'groups'].join('/')
    );
  },

  GetMetadata(sid, gid) {
    return client.get(
      [SFG_ROUTE, sid, 'members', gid].join('/')
    );
  },

  Add(sid, gid ,permissions) {
    return client.post(
      [SFG_ROUTE, sid, 'groups'].join('/'),
      { 'id' : gid,
        'permissions' : permissions
      }
    );
  },

  SetPermissions(sid, gid, permissions) {
    return client.put(
      [SFG_ROUTE, sid, 'groups', gid].join('/'),
      { permissions : permissions }
    );
  },

  Remove(sid, gid) {
    return client.del(
      [SFG_ROUTE, sid, 'groups', gid].join('/')
    );
  }
};

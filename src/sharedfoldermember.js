'use strict';

const client = require('./client'),
  SFM_ROUTE = 'shares';

module.exports = {
  list(id, ifNoneMatch = []) {
    return client.get(
      [SFM_ROUTE, id, 'members'].join('/'),
      { 'If-None-Match' : ifNoneMatch.join(',') }
    );
  },

  get(id, email, ifNoneMatch = []) {
    return client.get(
      [SFM_ROUTE, id, 'members', email].join('/'),
      {'If-None-Match' : ifNoneMatch.join(',')}
    );
  },

  add(id, email, permissions) {
    return client.post(
      [SFM_ROUTE, id, 'members'].join('/'),
      { 'email' : email,
        'permissions' : permissions
      }
    );
  },

  setPermissions(id, email, permissions) {
    return client.put(
      [SFM_ROUTE, id, 'members', email].join('/'),
      {'permissions' : permissions}
    );
  },

  remove(id, email, ifMatch = []) {
    return client.del(
      [SFM_ROUTE, id, 'members', email].join('/'),
      {'If-Match' : ifMatch.join(',')}
    );
  }
};

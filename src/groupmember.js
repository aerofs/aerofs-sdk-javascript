'use strict';

const client = require('./client.js'),
  GM_ROUTE = 'groups';

module.exports = {
  list(gid) {
    return client.get(
      [GM_ROUTE, gid, 'members'].join('/')
    ); 
  },

  add(gid, email) {
    return client.post(
      [GM_ROUTE, gid, 'members'].join('/'),
      { email : email }
    );
  },
  
  get(gid, email) {
    return client.get(
      [GM_ROUTE, gid, 'members', email].join('/')
    );
  },

  remove(gid,email) {
    return client.del(
      [GM_ROUTE, gid, 'members', email].join('/')
    );
  }

};

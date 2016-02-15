'use strict';

const client = require('./client.js'),
  GM_ROUTE = 'groups';

module.exports = {
  List(gid) {
    return client.get(
      [GM_ROUTE, gid, 'members'].join('/')
    ); 
  },

  Add(gid, email) {
    return client.post(
      [GM_ROUTE, gid, 'members'].join('/'),
      { email : email }
    );
  },
  
  Get(gid, email) {
    return client.get(
      [GM_ROUTE, gid, 'members', email].join('/')
    );
  },

  Remove(gid,email) {
    return client.del(
      [GM_ROUTE, gid, 'members', email].join('/')
    );
  }

};

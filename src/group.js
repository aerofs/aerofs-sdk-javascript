'use strict';

const client = require('./client'),
  util = require('./util'),
  GROUPS_ROUTE = 'groups';

module.exports = {
  list(offset, results) {
    let params = { 
      'offset' : offset,
      'results' : results
    };
    let path = util.generatePath(GROUPS_ROUTE,params);
    return client.get(path);
  },

  create(name) {
    return client.post(
      GROUPS_ROUTE,
      {'name' : name}
    );
  },

  get(gid) {
    return client.get(
      [GROUPS_ROUTE, gid].join('/')
    );
  },

  remove(gid) {
    return client.get(
      [GROUPS_ROUTE, gid].join('/')
    );
  }
};

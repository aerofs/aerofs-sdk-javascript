'use strict';

const client = require('./client'),
  util = require('./util'),
  GROUPS_ROUTE = 'groups';

module.exports = {
  List(offset, results) {
    let params = { 
      'offset' : offset,
      'results' : results
    };
    let path = util.generatePath(GROUPS_ROUTE,params);
    return client.get(path);
  },

  Create(name) {
    return client.post(
      GROUPS_ROUTE,
      {'name' : name}
    );
  },

  Get(gid) {
    return client.get(
      [GROUPS_ROUTE, gid].join('/')
    );
  },

  Delete(gid) {
    return client.get(
      [GROUPS_ROUTE, gid].join('/')
    );
  }
};

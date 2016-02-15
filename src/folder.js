'use strict';

const client =  require('./client'),
  util = require('./util'),
  FOLDERS_ROUTE = 'folders';

module.exports = {
  GetMetadata(id, fields = []) {
    fields = fields || [];
    let route = [FOLDERS_ROUTE, id].join('/');
    let params = {
      'fields' : fields.join(',')
    };
    let path = util.generatePath(route, params);
    return client.get(path);
  },

  GetPath(id) {
    return client.get(
      [FOLDERS_ROUTE, id, 'path'].join('/')
    );
  }, 

  ListChildren(id) {
    return client.get(
      [FOLDERS_ROUTE, id, 'children'].join('/')
    );
  },

  Create(parentName, name) {
    return client.post(
      FOLDERS_ROUTE,
      { 'parent' : parentName,
        'name' : name
      }
    );
  },

  Move(id, parentName, newName, ifMatch) {
    return client.put(
      [FOLDERS_ROUTE, id].join('/'),
      { 'parent' : parentName,
        'name' : newName
      },
      { 'If-Match' : ifMatch }
    );
  },

  Delete(id, ifMatch) {
    return client.del(
      [FOLDERS_ROUTE, id].join('/'),
      { 'If-Match' : ifMatch.join(',')}
    );
  }
};

'use strict';

const client = require('./client');

module.exports = {
  List(email) {
    return client.get(
      ['users', email, 'devices'].join('/')
    );
  },

  Get(did) {
    return client.get(
     ['devices', did].join('/')
    );
  },

  Update(did, name) {
    return client.put(
      ['devices', did].join('/'),
      { name : name }
    );
  },

  Status(did) {
    return client.get(
      ['devices', did, 'status'].join('/')
    );
  }
};

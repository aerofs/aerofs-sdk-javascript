'use strict';

const client = require('./client');

module.exports = {
  list(email) {
    return client.get(
      ['users', email, 'devices'].join('/')
    );
  },

  get(did) {
    return client.get(
     ['devices', did].join('/')
    );
  },

  update(did, name) {
    return client.put(
      ['devices', did].join('/'),
      { name : name }
    );
  },

  getStatus(did) {
    return client.get(
      ['devices', did, 'status'].join('/')
    );
  }
};

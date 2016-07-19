'use strict';

const client = require('./client'),
  STORAGE_ROUTE = 'storage';

module.exports = {
  get() {
    return client.get(STORAGE_ROUTE);
  }
};

const client = require('./client'),
  SF_ROUTE = 'shares';

module.exports = {
  List(email, ifNoneMatch='') {
    return client.get(
      ['users', email, SF_ROUTE].join('/'),
      {'if-none-match' : ifNoneMatch.join(',') }
    );
  },

  GetMetadata(id, ifNoneMatch = '') {
    return client.get(
      [SF_ROUTE, id].join('/'),
      { 'if-none-match' : ifNoneMatch.join(',') }
    );
  },

  Create(name) {
    return client.post(
      SF_ROUTE,
      { name : name}
    );
  }
};

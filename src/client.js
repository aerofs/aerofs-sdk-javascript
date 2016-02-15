'use strict';

const qwest = require('qwest'),
  urllib = require('url'),
  config = require('./config'),
  base_header = { 'endpoint-consistency' : 'strict'},
  cache_methods = ['GET', 'HEAD'];

qwest.setDefaultDataType('json');

function request(method, path, data, headers = {}, datatype = 'json') {

    let new_headers = Object.assign({},
      base_header,
      headers, 
      {'authorization' : `Bearer ${config['oauth_token']}`}
    );
    let url = [config['host_url'],
                'api', 
                `v${config['api_version']}`,
                path].join('/');

    // Required to prevent qwest from autoformatting the data with default type
    let options = { 'dataType' : datatype, headers : new_headers, };

    // Cache-buster : Prevent browser from caching requests
    if (!config['cache'] && cache_methods.indexOf(method) != -1) {
      let urlObj = urllib.parse(url, true);
      urlObj.query['t'] = Math.random().toString();
      url = urllib.format(urlObj);
    }

    return qwest.map(method, url, data, options);
}

module.exports = {
  get(path, headers) {
    return request('GET', path, null, headers); 
  },

  put(path, data, headers) {
    return request('PUT', path, data, headers);
  },

  post(path, data, headers) {
    return request('POST', path, data, headers); 
  },
  
  del(path, headers) {
    return request('DELETE', path, null, headers); 
  },
  
  head(path, headers) {
    return request('HEAD', path, null, headers);
  },

  request : request 
}

'use strict';

const axios = require('axios').create({}),
  urllib = require('url'),
  config = require('./config'),
  base_header = { 'endpoint-consistency' : 'strict'},
  cache_methods = ['GET', 'HEAD'];

// Counter for enqueued requests
let pending_requests = {pending : 0},
  outstanding_token_request = false,
  token_request_promise;

function request(method, path, headers = {}, data = "", reqType = 'application/json') {
    let ax_config = {
      method : method,
      baseURL : [config.host_url, 'api', `v${config.api_version}`].join('/'),
      url : path,
      headers : Object.assign({},
        base_header,
        headers,
        {'authorization' : `Bearer ${config.oauth_token}`,
         'content-type' : reqType
        }
      ),
      data : reqType === 'application/json' ? JSON.stringify(data) : data
    };
 
    // Cache-buster : Prevent browser from caching requests
    if (!config.cache && cache_methods.indexOf(method) != -1) {
      let parsed = urllib.parse(path, true);
      ax_config.params = parsed.query;
      ax_config.params.t = Math.random().toString();
      ax_config.url = parsed.pathname;
    }

    // If a request fails due to an expired/not_present token 
    // and callback has been registered, execute that callback 
    // to retrieve a new token
    return new Promise((resolve, reject) => {
      pending_requests.pending++;
      axios.request(ax_config)
        .then(res =>  {
          resolve(res);
        })
        .catch(res => {
          if (res.status === 401 && config.expire_cb) {
            config.expire_cb(res)
              .then(token => {
                config.oauth_token = token;
                ax_config.headers.authorization = `Bearer ${config.oauth_token}`;
                resolve(axios.request(ax_config));
              })
              .catch(res2 => reject(res2));
          } else {
            reject(res);
          }
        });
    })
    .then(res => {
      pending_requests.pending--;
      return res;
    })
    .catch(res => {
      pending_requests.pending--;
      throw res;
    });
}

module.exports = {

  get(path, headers) {
    return request('GET', path, headers);
  },
  del(path, headers) {
    return request('DELETE', path, headers);
  },
  head(path, headers) {
    return request('HEAD', path, headers);
  },

  put(path, data, headers) {
    return request('PUT', path, headers, data);
  },
  post(path, data, headers) {
    return request('POST', path, headers, data); 
  },
  
  request : request,
  pending_requests : pending_requests,
  _axios : axios,
}

'use strict';

const axios = require('axios').create({}),
  urllib = require('url'),
  config = require('./config'),
  baseHeader = { 'endpoint-consistency' : 'strict'},
  cacheMethods = ['GET', 'HEAD'];

// Counter for enqueued requests
let pendingRequests = {pending : 0};

function request(method, path, headers = {}, data = "", reqType = 'application/json') {
    let ax_config = {
      method : method,
      baseURL : [config.hostUrl, 'api', `v${config.apiVersion}`].join('/'),
      url : path,
      headers : Object.assign({},
        baseHeader,
        headers,
        {'authorization' : `Bearer ${config.oauthToken}`,
         'content-type' : reqType
        }
      ),
      data : reqType === 'application/json' ? JSON.stringify(data) : data
    };
 
    // Cache-buster : Prevent browser from caching requests
    if (!config.cache && cacheMethods.indexOf(method) != -1) {
      let parsed = urllib.parse(path, true);
      ax_config.params = parsed.query;
      ax_config.params.t = Math.random().toString();
      ax_config.url = parsed.pathname;
    }

    // If a request fails due to an expired/not_present token 
    // and callback has been registered, execute that callback 
    // to retrieve a new token
    return new Promise((resolve, reject) => {
      pendingRequests.pending++;
      axios.request(ax_config)
        .then(res =>  {
          resolve(res);
        })
        .catch(res => {
          if (res.status === 401 && config.expireCb) {
            config.expireCb(res)
              .then(token => {
                config.oauthToken = token;
                ax_config.headers.authorization = `Bearer ${config.oauthToken}`;
                resolve(axios.request(ax_config));
              })
              .catch(res2 => reject(res2));
          } else {
            reject(res);
          }
        });
    })
    .then(res => {
      pendingRequests.pending--;
      return res;
    })
    .catch(res => {
      pendingRequests.pending--;
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
  pendingRequests : pendingRequests,
  _axios : axios,
}

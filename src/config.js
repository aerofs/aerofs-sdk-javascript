'use strict';

module.exports = {
  // URL of the Aerofs Host Appliance
  // Eg. 'https://mycompany.aerofs.com'
  hostUrl : '',

  // OAuth token used for authentication
  oauthToken : '',

  // Latest supported API Version
  apiVersion : '1.4',

  // Whether or not to use browser cached resources
  cache : false,

  // A function used to retrieve a new OAuth token if the
  // current one expires. The function returns a promise.
  //
  // @param {axiosResponsebody}
  // @return {promise} 
  expireCb : undefined,

  // The maximum chunksize used when uploading file content
  maxChunksize : Math.pow(2,16)
};

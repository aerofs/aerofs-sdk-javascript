// This file handles communication with the AeroFS Appliance via Qwest
const config = require("./config");
const qwest = require("qwest");
const util = require("./util");

var baseHeader = {};

// Setting the datatype to a non qwest-type prevents Qwest from
// serializing the data
function request(method, url, data, headers, datatype) {
    // Add base headers
    headers = typeof headers !== 'undefined' ? headers : {};
    util.mergeObj(baseHeader, headers);
    var options = {
      headers : headers
    };

    if (datatype) {
      options["dataType"] = datatype;
    }
    // Only keep one catch statement done by the user
    var promise = qwest.map(method, url, data, options);
      
    return promise;
}

module.exports = {
  initialize() {
    qwest.base = "https://" + config.get("host_name") + config.get("suffix");
    qwest.setDefaultDataType("json");
    baseHeader["Authorization"] = "Bearer " + config.get("oauth_token");
    baseHeader["Endpoint-Consistency"] = "strict";
  },
   
  get(path, headers) {
    return request("GET", path, null, headers); 
  },

  put(path, data, headers) {
    return request("PUT", path, data, headers);
  },

  post(path, data, headers) {
    return request("POST", path, data, headers); 
  },
  
  del(path, headers) {
    return request("DELETE", path, null, headers); 
  },

  request : request 
}

const client = require("./client");
const FILES_ROUTE = "files";
const MAX_CHUNKSIZE = Math.pow(2,16);

module.exports = {
  GetMetadata(fid, fields) {
    var route = [FILES_ROUTE, fid].join("/");
    var params = { fields : fields };
    var path = generatePath(route, params); 
    return client.get(path);
  },

  GetPath(fid) {
    var route = [FILES_ROUTE, fid, "path"].join("/");
    return client.get(route);
  },

  // Only expose getting the entire file
  GetContent(fid, ifNoneMatch) {
    var route = [FILES_ROUTE, fid, "content"].join("/");
    var headers = { "If-None-Match" : ifNoneMatch };
    return client.get(route, headers);
  },

  Create(pid, fileName) {
    var data = {
      "parent" : pid,
      "name" : fileName
    };
    return client.post(FILES_ROUTE, data);
  },

  Move(fid, pid, newName) {
     
  },

  UploadContent(fid, data, ifMatch) {
    "use strict";

    let path = [FILES_ROUTE, fid, "content"].join("/"); 

    // 1. Get UploadId for chunked upload
    let uploadID = "123456";
    let headers = { 
      "content-range" : "bytes */*",
      "content-type" : "",
    };
    let prom = client.put(path, "", headers, true);
     
    // 2. Perform Chunked Upload
    let index = 0;
    let iterations = Math.ceil(data.length / MAX_CHUNKSIZE);
    for (let i = 0; i < iterations; i++) {
      prom = prom.then ((xhr, val) => {
        // Retrieve upload-identifier from first respone
        if (i == 0) {
          uploadID = xhr.getResponseHeader("upload-id");
        }
      
        let chunkSize = Math.min(MAX_CHUNKSIZE, data.length - index); 
        let upperBound = index + chunkSize;
        let chunk = data.slice(index, upperBound);
 
        headers["content-range"] = "bytes " + 
          index.toString() + "-" + (upperBound - 1).toString() + 
          "/" + data.length.toString();
        headers["content-type"] = "application/octet-stream";
        headers["If-Match"] = ifMatch;   
        headers["upload-id"] = uploadID;
        index = upperBound;
        
        return client.request("PUT", path, chunk, headers, "application/octet-stream");
      });
    }

    return prom; 
  }

};

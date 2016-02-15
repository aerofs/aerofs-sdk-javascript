'use strict';

const client = require('./client'),
  util = require('./util'),
  FILES_ROUTE = 'files',
  MAX_CHUNKSIZE = Math.pow(2,16);

module.exports = {
  GetMetadata(fid, fields) {
    let route = [FILES_ROUTE, fid].join('/');
    let params = { fields : fields };
    let path = util.generatePath(route, params); 
    return client.get(path);
  },

  GetPath(fid) {
    return client.get(
      [FILES_ROUTE, fid, 'path'].join('/')
    );
  },

  GetContent(fid, ifNoneMatch = []) {
    return client.request(
      'GET',
      [FILES_ROUTE, fid, 'content'].join('/'),
      { 'If-None-Match' : ifNoneMatch },
      '',
      'application/octet-stream'
    );
  },

  GetContentHeaders(fid) {
    return client.head(
      [FILES_ROUTE, fid, 'content'].join('/')
    );
  },

  Create(pid, fileName) {
    return client.post(
      FILES_ROUTE,
      { 'parent' : pid,
        'name' : fileName
      }
    );
  },

  Move(fid, pid, newName, ifMatch=[]) {
    return client.put(
      [FILES_ROUTE, fid].join('/'),
      { 'parent' : pid,
        'name' : newName
      },
      { 'If-Match' : ifMatch }
    );
  },
 
  // Notify is a cb to send notifications on upload progress
  UploadContentFromFile(fid, file, ifMatch = [], notify = () =>{}) {
    let reader = new FileReader(),
        path = [FILES_ROUTE, fid, 'content'].join('/'), 
        prom = Promise.resolve(),
        index = 0;
     
    while (index < file.size) {
      (i => {
        prom = prom.then(res => {
          return new Promise( (resolve, reject) => {
            let chunk;

            if (file.slice) chunk = file.slice(i, i + MAX_CHUNKSIZE);
            else if (file.mozSlice) chunk = file.mozSlice(i, i + MAX_CHUNKSIZE);
            else if (file.webkitSlice) chunk = file.slice(i, i + MAX_CHUNKSIZE);
            else reject({reason : 'compatibility', message : 'No slicing method exists'});

            reader.onload = (e) => {
              let bytes = e.target.result,
                headers = {
                  'content-range' : `bytes ${i}-${i + bytes.byteLength - 1}/${file.size}`,
                  'content-type' : 'application/octet-stream'
                };
              if (res && res.headers)  {
                headers['upload-id'] = res.headers['upload-id'];
              }
              if (ifMatch.length != 0) {
                headers['if-match'] = ifMatch;
              }
              resolve(client.request('PUT', path, headers, bytes, 'application/octet-stream'));
            };

            reader.onerror = (e) => {
              reject({reason: 'read', event : e});
            };
            reader.readAsArrayBuffer(chunk);
          });
        })
        .then( (response) => {
          // Signifies total bytes uploaded. 
          notify({progress: ( (i + Math.min(MAX_CHUNKSIZE, file.size - i)) / file.size)});
          return response;
        });
      })(index);
      index += MAX_CHUNKSIZE;
    }
    return prom;
  },
    
    // Notify is a cb to send notifications on upload progress
  UploadContentFromText(fid, data, ifMatch = [], notify = () => {}) {
    let path = [FILES_ROUTE, fid, 'content'].join('/'), 
      prom = Promise.resolve(),
      index = 0;
   
    while (index < data.length) {
      (i => { 
        prom = prom.then(res => {
          let chunk = data.slice(i, i + MAX_CHUNKSIZE),
            headers = {
              'content-range' : `bytes ${i}-${i + chunk.length - 1}/${data.length}`,
              'content-type' : 'application/octet-stream'
            };
          if (res && res.headers)  {
            headers['upload-id'] = res.headers['upload-id'];
          }
          if (ifMatch.length != 0) {
            headers['if-match'] = ifMatch;
          }
          return client.request('PUT', path, headers, chunk, 'application/octet-stream');
        })
        .then( (response) => {
          // Signifies total bytes uploaded. 
          notify({progress: ( (i + Math.min(MAX_CHUNKSIZE, file.size - i)) / file.size)});
          return response;
        });
      })(index);
      index += MAX_CHUNKSIZE;
    }

    return prom; 
  }
};

'use strict';

const client = require('./client'),
  FILES_ROUTE = 'files',
  MAX_CHUNKSIZE = Math.pow(2,16);

module.exports = {
  GetMetadata(fid, fields) {
    let route = [FILES_ROUTE, fid].join('/');
    let params = { fields : fields };
    let path = generatePath(route, params); 
    return client.get(path);
  },

  GetPath(fid) {
    return client.get(
      [FILES_ROUTE, fid, 'path'].join('/')
    );
  },

  // Only expose getting the entire file
  GetContent(fid, ifNoneMatch) {
    return client.get(
      [FILES_ROUTE, fid, 'content'].join('/'),
      { 'If-None-Match' : ifNoneMatch }
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

  GetUploadID(fid) {
    return client.put(
      [FILES_ROUTE, fid, 'content'].join('/'),
      '',
      { 'content-range' : 'bytes */*',
        'content-type' : ''
      }
    );
 
  },

  UploadContentFromFile(fid, file, ifMatch = []) {
    let reader = new FileReader();
    let path = [FILES_ROUTE, fid, 'content'].join('/'); 
    let prom = module.exports.GetUploadID(fid);
     
    let index = 0;
    let iterations = Math.ceil(file.size / MAX_CHUNKSIZE);
    for (let i = 0; i < iterations; i++) {
      // Retrieve buffer and send request
      prom = prom.then((xhr, val) => {
        return new Promise( (resolve, reject) => {
          let chunkSize = Math.min(MAX_CHUNKSIZE, file.size - index); 
          let upperBound = index + chunkSize;
          let chunk;

          if (file.slice) chunk = file.slice(index, upperBound);
          if (file.mozSlice) chunk = file.mozSlice(index, upperBound);
          else if (file.webkitSlice) chunk = file.slice(index, upperBound);

          reader.onload = (e) => {
            let bytes = e.target.result;
            index = upperBound;
            resolve(client.request(
              'PUT',
              path,
              bytes,
              {
                'content-range' : `bytes ${upperBound-chunkSize}-${upperBound-1}/${file.size}`,
                'content-type' : 'application/octet-stream',
                'if-match' : ifMatch,
                'upload-id' : xhr.getResponseHeader('upload-id')
              },
              'application/octet-stream'
            ));
          };
          reader.onerror = (e) => {
            reject('Read from disk failed', e);
          };
          reader.readAsArrayBuffer(chunk);
        });
      });
    }

    return prom;
  },

  UploadContentFromText(fid, data, ifMatch = []) {
    let path = [FILES_ROUTE, fid, 'content'].join('/'); 
    let prom = module.exports.GetUploadID(fid);
    let index = 0;
    let iterations = Math.ceil(data.length / MAX_CHUNKSIZE);

    for (let i = 0; i < iterations; i++) {
      prom = prom.then ((xhr, val) => {
        let chunkSize = Math.min(MAX_CHUNKSIZE, data.length - index); 
        let upperBound = index + chunkSize;
        let chunk = data.slice(index, upperBound);
        index = upperBound;

        return client.request(
          'PUT',
          path,
          chunk,
          {
            'content-range' : `bytes ${upperBound-chunkSize}-${upperBound-1}/${data.length}`,
            'content-type' : 'application/octet-stream',
            'if-match' : ifMatch,
            'upload-id' : xhr.getResponseHeader('upload-id')
          },
          'application/octet-stream'
        );
      });
    }

    return prom; 
  }
};

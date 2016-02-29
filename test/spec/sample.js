describe('Token expiration callback', function() {
  console.log('Beginning tests for token expiration behaviour');

  var default_token = 'default_token_value',
    getNewToken = function(res) {
      return Promise.resolve(default_token);
    };

  beforeAll(function() {
    aero.initialize({
      apiVersion : '1.4',
      expireCb : getNewToken,
      cache : false
    });
  });

  it('should request a new token if an API call gets a 401 response', function(done) {
    spyOn(aero.config, 'expireCb').and.callThrough();
    spyOn(aero.client._axios, 'request').and.callFake(
      function(res) { return Promise.reject({status : 401, data : {}}); }
    );
    
    aero.api.folder.listChildren('root')
      .then( function(res) { 
        done.fail('The call should not be successful given a 401');
      })
      .catch( function(res) {
        expect(aero.config.expireCb.calls.count()).toEqual(1);
        expect(aero.client._axios.request.calls.count()).toEqual(2);
        expect(aero.config.oauthToken).toEqual(default_token);
        done();
      })
    });

  it('should not request a new token if two API calls get a 401', function(done) {
    spyOn(aero.config, 'expireCb').and.callThrough();
    spyOn(aero.client._axios, 'request').and.callFake(
      function(res) { return Promise.reject({status : 401, data : {}}); }
    );
    
    aero.api.folder.listChildren('root')
      .then( function(res) {
         
      })
      .catch( function(res) {
        expect(aero.config.expireCb.calls.count()).toEqual(1);
        expect(aero.client._axios.request.calls.count()).toEqual(2);
        done();
      });
  });

  it('should not request a new token if an API call gets a 500 response', function(done) { 
    spyOn(aero.config, 'expireCb').and.callThrough();
    spyOn(aero.client._axios, 'request').and.callFake(
      function(res) { return Promise.reject({status : 500, data : {}}); }
    );

    aero.api.folder.listChildren('root')
      .then( function(res) {
        expect(false).not.toBe(true);
      })
      .catch( function(res) {
        return res;
      })
      .then( function(res) {
        expect(aero.config.expireCb.calls.count()).toEqual(0);
        expect(aero.client._axios.request.calls.count()).toEqual(1);
        done();
      });
  });
});

describe('Chunked uploads', function() {
  console.log('Beginning tests run for preparing chunked uploads');

  var getContent = function() {
    var original = 'abcdefghijklmnopqrstuvwxyz';
      while (original.length / aero.config.maxChunksize < 3) {
        original += original + original;
      }
      return original;
  };

  beforeAll(function() {
    aero.initialize({
      apiVersion : '1.4',
      cache : false
    });
  });

  it('should upload a small file in a single chunk', function(done) {
    spyOn(aero.api.file, 'uploadContentFromText').and.callFake( 
      function() {
        return Promise.resolve({status:200});
      }
    );

    aero.api.file.uploadContentFromText('abc123', 'TEST_CONTENT_1337_HAX')
      .then( function(res) {
        done();
      })
      .catch( function(res) {
        done.fail('Exception thrown instead of succeeding'); 
      });
  });

  it('should upload a large file in multiple chunks', function(done) {
    // TODO : ensure max_chunksize will cause multiple chunks`
    // Flag to ensure an upload-id not checkedfor the first request
    var first = true,
      uid = '1337hax',
      content = getContent();

    // The header for all requests but the first should contain an upload-id
    spyOn(aero.client._axios, 'request').and.callFake(
      function(config) { 
        if (first) {
          first = false;
        } else {
          if (config.headers['upload-id'] !== uid) {
            return Promise.reject({status : 500});
          }
        }
        return Promise.resolve({
          status : 200,
          headers : {'upload-id' : uid}
        });
      }
    );

    aero.api.file.uploadContentFromText('abc123', content)
      .then( function(res) {
        done();
      })
      .catch( function(res) {
        console.log(res);
        done.fail('An upload-id was not retrieved for a sequential request');
      });
  });

  it('should call the progress callback between chunks', function(done) {
    var first = true,
      uid = '1337hax',
      content = getContent(),
      notifier = { 
        notify : function(data) {
        }
      };

    // The header for all requests but the first should contain an upload-id
    spyOn(aero.client._axios, 'request').and.callFake(
      function(config) { 
        if (first) {
          first = false;
        } else {
          if (config.headers['upload-id'] !== uid) {
            return Promise.reject({status : 500});
          }
        }
        return Promise.resolve({
          status : 200,
          headers : {'upload-id' : uid}
        });
      }
    );
    spyOn(notifier, 'notify').and.callThrough();

    aero.api.file.uploadContentFromText('abc123', content, [], notifier.notify)
      .then( function(res) {
        expect(notifier.notify).toHaveBeenCalled();
        done();
      })
      .catch( function(res) {
        console.log(res);
        done.fail('An upload-id was not retrieved for a sequential request');
      });
  });

  it('should called the failure callback when a request fails', function(done) {
    var first = true,
      uid = '1337hax',
      content = getContent();
      
    // The header for all requests but the first should contain an upload-id
    spyOn(aero.client._axios, 'request').and.callFake(
      function(config) { 
        if (first) {
          first = false;
          return Promise.resolve({
            status : 200,
            headers : {'upload-id' : uid}
          });
        } else {
          return Promise.reject({
            status : 503
          });
        }
    });

    aero.api.file.uploadContentFromText('abc123', content)
      .then( function(res) {
        done.fail('The upload should have failed because of a 503 error');
      })
      .catch( function(res) {
        expect(res.status).toEqual(503);
        done();
      });
  });
});

describe('Pending requests status', function() {
  console.log('Beginning tests for pending requests status');

  beforeAll(function() {
    aero.initialize({
      apiVersion : '1.4',
      cache : false
    });
  });

  it('should reset the pending requests value to 0 after a request finishes', function(done) {
    spyOn(aero.client._axios, 'request').and.returnValue(Promise.resolve());
    expect(aero.client.pendingRequests.pending).toEqual(0);
    aero.api.file.remove('1337file')
      .then( function(res) {
        expect(aero.client.pendingRequests.pending).toEqual(0);
        done();
      })
      .catch( function(res) {
        done.fail('Call should not fail');
      });
  });
});

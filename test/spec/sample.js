describe('Token expiration callback', function() {
  console.log("TESTING");

  var default_token = 'default_token_value';

  var getNewToken = function(res) {
    return Promise.resolve(default_token);
  };

  beforeEach(function() {
    console.log('Initializing AeroFS API configuration');
    aero.initialize({
      api_version : '1.4',
      expire_cb : getNewToken,
      catch : false
    });
  });

  it('should request a new token if an API call gets a 401 response', function(done) {
    spyOn(aero.config, 'expire_cb').and.callThrough();
    spyOn(aero.client._axios, 'request').and.callFake(
      function(res) { return Promise.reject({status : 401, data : {}}); }
    );
    
    aero.api.folder.ListChildren('root')
      .then( function(res) { 
        expect(false).not.toBe(true);
      })
      .catch( function(res) {
        return res;
      })
      .then( function(res) {
        expect(aero.config.expire_cb.calls.count()).toEqual(1);
        expect(aero.client._axios.request.calls.count()).toEqual(2);
        expect(aero.config.oauth_token).toEqual(default_token);
        done();
      });
  });

  it('should not request a new token if two API calls get a 401', function() {
    
  });

  it('should not request a new token if an API call gets a 500 response', function(done) { 
    spyOn(aero.config, 'expire_cb').and.callThrough();
    spyOn(aero.client._axios, 'request').and.callFake(
      function(res) { return Promise.reject({status : 500, data : {}}); }
    );

    aero.api.folder.ListChildren('root')
      .then( function(res) {
        expect(false).not.toBe(true);
      })
      .catch( function(res) {
        return res;
      })
      .then( function(res) {
        expect(aero.config.expire_cb.calls.count()).toEqual(0);
        expect(aero.client._axios.request.calls.count()).toEqual(1);
        done();
      });
  });

});

describe('Chunked uploads', function(done) {

});

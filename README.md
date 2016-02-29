# AeroFS SDK (Javascript)

An AeroFS Private Cloud API SDK written in javascript. It is based on the API
documented at https://developer.aerofs.com/api/en/1.3/

## Installation
```sh
$ npm install aerofsapi --save
```

## Testing

The API, SDK unit tests test against a local AeroFS Appliance. There are two
sets of tests.



#### Manual
**Do not execute the manual tests against a product instance as the tests mutate
state.**
1. `open test/manual/testrunner.html`
  This test runs in-browser. The page executes the tests on startup.
  The success of each test depends on the configuration you must specify in
  `test/manual/test.js` .
2. `open test/manual/test_file.html`
  This test runs in browser and tests file upload from an input widget using the
  HTML5 file api. The test must have an inputted configuration specified in the file itself. 

#### Automatic
1. `npm test`. Tests upload functionaility and ensures the number of pending requests is accurate. 

## Quick examples
--------------
Each method call returns an es6-compliant promise with a then and catch method.

```js
var api = aero.api;
aero.initialize({hostName : host, oauthToken : oauth});

// List up to 100 users
api.user.list(100)
  .then( (res) => {
    // Output list of users
    console.log(res.data);
  })
  .catch( (res) => {
    // Handle error
    ...
  });

// Create a new file in the root directory
api.file.create('root', 'newFile')
  .then( (res) => {
    console.log(res.data.id);
  })
  .catch( (res) => {
    throw res;
  });
```

## Initialization
-------------

Prior to using the methods of the API, you must first initialize with the below
parameters.

##### aero.initialize(config)

```js
aero.initialize
  // URL of the Aerofs Host Appliance
  // Eg. 'https://mycompany.aerofs.com'
  hostUrl : '',
  
  // OAuth token used for authentication
  oauthToken : '',
  
  // Latest supported API Version
  apiVersion : '1.3',
  
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
```

## Response
-------------

The library uses the Axios HTTP Library and returns the an Axios response
documented at https://github.com/mzabriskie/axios

The response is the following:
```js
{
    // `data` is the response that was provided by the server
      data: {},

    // `status` is the HTTP status code from the server response
      status: 200,

    // `statusText` is the HTTP status message from the server response
      statusText: 'OK',

    // `headers` the headers that the server responded with
      headers: {},

    // `config` is the config that was provided to `axios` for
    // the request
      config: {}
}
```

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

**Do not execute the tests against a product instance as the tests mutate
state.**

#### Manual
1. `open test/manual/testrunner.html`
  This test runs in-browser. The page executes the tests on startup.
  The success of each test depends on the configuration you must specify in
  `test/manual/test.js` .
2. `open test/manual/test_file.html`
  This test runs in browser and tests file upload from an input widget using the
  HTML5 file api. 

#### Automatic
1. `npm test`

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
aero.initialize({
  apiVersion : '1.3',
  maxChunkSize : 65535,
  cache : false,
  hostUrl : 'https://mycompany.aerofs.com',
  oauthToken : 'abcdefghijklmnopqrstuvwxyz',
  expireCb : getNewTokenFunction,
});
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

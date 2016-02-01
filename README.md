# AeroFS SDK (Javascript)

An AeroFS Private Cloud API SDK written in javascript.## Installation

```sh
$ npm install aerofsapi
```

## Testing

The API, SDK unit tests test against a local AeroFS Appliance. 

**Do not execute the tests against a product instance as the tests mutate
state.**

Only run if you have a setup test instance. The tests require you to do the
following:

* `oauth` - set the oauth variable at the top of test.js with a valid OAuth token
* `apphost` - set the host variable to the hostname of your locla aerofs app

To test, execute:
```sh
$ open test/testrunner.html
```

## Quick examples
--------------

```js
var api = aero.api;
aero.initialize({host_name : host, oauth_token : oauth});

api.user.List(123213)
  .then( (xhr, val) => {
    // Output list of users
    console.log(val);
  })
  .catch( (e, xhr, res) => {
    // Handle error
    ...
  });

api.file.Create("root", chance.word())
  .then( (xhr, val) => {
    console.log(val.id);
  })
  .catch( (e,xhr,res) => {
    throw [e,res];
  });
```

## Basics
-------------
Each api call will return a Promise that can be chained with a .then(...) or
.catch(...).

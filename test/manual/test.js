'use strict';

const assert = chai.assert,
  expect = chai.expect,
  user = aero.api.user,
  group = aero.api.group,
  folder = aero.api.folder,
  device = aero.api.device,
  invitee = aero.api.invitee,
  sf = aero.api.sf,
  file = aero.api.file,
  oauth = '747706b159c84fbbbefeaa30b65a3825',
  host = 'https://share.syncfs.com',
  api = '1.3',
  cache = false,
  _error = (res) => {
    return [res.status + ' ' + res.statusText, res.data]
  };

describe('Setting global configuration parameters', () => {
  it('The host, oauth configuration parameters are set correctly', () => {
    var config = {
      hostUrl : host,
      oauthToken : oauth,
      apiVersion : api,
      cache : cache,
    };
    aero.initialize(config);
    assert.equal(aero.config['hostUrl'], host);
    assert.equal(aero.config['oauthToken'], oauth);
    assert.equal(aero.config['apiVersion'], api);
    assert.equal(aero.config['cache'], cache);
  });
});

//
// USERS
//

describe('Retrieve a list of users', () => {
  it('Retrieve a list of users', () => {
    return user.list(123213)
      .then( (res) => { 
        expect(res['data']).to.not.be.empty;
      })
      .catch( (res) => {
        throw _error(res);
      });
  });
});

describe('Create a user', () => {
  it('Create a new user', () => {
    return user.create(chance.email(), chance.first(), chance.last())
      .then( (res) => {
        expect(res).to.not.equal('');
      })
      .catch( (res) => { 
        throw _error(res);
      });
  });
});

describe('Update a user\'s first and last name', () => {
  it('Should update a user\'s full name', () => {
    let subject;
    return user.list(12312)
      .then( (res) => {
        subject = res.data.data[3];
        return user.update(subject.email, chance.first(), chance.last()); 
      })
      .then((res) => {
        expect(res.data).to.not.equal(''); 
      })
      .catch( (res) => {
        throw _error(res);
      });
   });
}); 


//
// FOLDER
//

describe('Create a new folder in the root directory', () => {
  it('Should create a new folder in a user\'s root directory', () => {
    return folder.create('root', chance.word())
      .then( (res) => {
        expect(res).to.not.equal('');
      })
      .catch( (res) => {
        throw _error(res); 
      }); 
  });
});

describe('List all children of a folder', () => {
  it('Should enumerate a list of children', () => {
    return folder.listChildren('root')
      .then( (res) => {
        expect(res).to.not.equal('');
      })
      .catch( (res) => {
        throw _error(res);
      });
  });
});


// 
// Device
//

describe('List all devices for a given user', () => {
  it('Should return a list of devices the user has AeroFS on', () => {
    return device.list('daniel.cardoza@aerofs.com')
      .then( (res) => {
        // Assume at least one device
        expect(res).to.not.be.empty;
      })
      .catch( (res) => {
        throw _error(res);
      });
        
  });
});

describe('Get the status of a specific device', () => {
  it('Should return the status of a specific device', () => {
    return device.list('daniel.cardoza@aerofs.com')
      .then( (res) => {
        // Assume at least one device
        expect(res).to.not.be.empty;
        return device.getStatus(res.data[0].id);
      })
      .then( (res) => {
        expect(res.data['last_seen']).to.not.equal('');
      })
      .catch( (res) => {
        throw _error(res);
      });
        

  });
});

//
// Groups
//

describe('List all of the groups', () => {
  it('Should return a list of all groups', () => {
    return group.list()
      .catch( (res) => {
        throw _error(res);
      });
  });
});

describe('Create a random group', () => {
  it('Should create a new user group', () => {
    return group.create(chance.word())
      .then( (res) => {
        expect(res.data).to.not.equal('');
      })
      .catch( (res) => {
        throw _error(res);
      });
  });
});

//
// Folder
//

describe('Retrieve a list of files in the user\'s root directory', () => {
  it('Should retrieve a non-empty list of files', () => {
    return folder.listChildren('root')
      .then( (res) => {
        expect(res).to.not.be.empty;
      })
      .catch( (res) => {
        throw _error(res);
      });
  });
});

describe('Retrieve folder metadata', () => {
  it('Should return valid metadata', () => {
      return folder.getMetadata('root')
        .then( (res) => {
          expect(res.data.id).to.not.equal('');
          assert.isFalse(res.data.is_shared, 'The root folder should not be shared');
        })
        .catch( (res) => {
          throw _error(res);
        });
  });
});

//
// Invitee
//

describe('Create an invitation to AeroFS', () => {
  it('Should create an invitation to a non-AeroFS user', () => {
    return invitee.create(chance.email(), 'daniel.cardoza@aerofs.com')
      .then( (res) => {
        expect(res.data['signup_code']).to.not.equal('');
      })
      .catch( (res) => {
        throw _error(res);
      });
  });
});

//
// SharedFolder
//

describe('Create a new sharedfolder', () => {
  it('Should create a new shared folder', () => {
    return sf.create(chance.word())
      .then( (xhr, res) => {
      })
      .catch( (res) => {
        throw _error(res);  
      });
  });
});

//
// File
//

describe('Create a new file', () => {
  it('Should create a new file', () => {
    return file.create('root', chance.word())
      .catch( (res) => {
        throw _error(res);
      });
  });
});


describe('Create a new file and retrieve content via a HEAD request', () => {
  it('Should create a new file and retrieve its headers', () => {
    var fid = '';
    var newFile = chance.word();
  
    return file.create('root', newFile)
      .then( (res) => {
        fid = res.data.id;
        var ifmatch = res.headers['etag'];
        ifmatch = ifmatch.slice(3,ifmatch.length-1);
        return file.uploadContentFromText(fid, chance.paragraph({sentences:1}), ifmatch);
      })
      .then( (res) => {
        return file.getContentHeaders(fid);
      })
      .then( (res) => {
        expect(res.headers.etag).to.not.equal('');
      })
      .catch( (res) => {
        throw res;
      });

  });
});

describe('Create a new file, upload new content and get the content', () => {
  it('Should create a new file and add content', () => {
    var fid = '';
    var newFile = chance.word();
  
    return file.create('root', chance.word())
      .then( (res) => {
        fid = res.data.id;
        var ifmatch = res.headers['etag'];
        ifmatch = ifmatch.slice(3,ifmatch.length-1);
        return file.uploadContentFromText(fid, chance.paragraph({sentences:45000}), [ifmatch]);
      })
      .then( (res) => {
        return file.getContent(fid);
      })
      .then( (res) => {
      })
      .catch( (res) => {
        throw _error(res);
      });
  });
});

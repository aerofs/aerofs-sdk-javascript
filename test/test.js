'use strict';

const assert = chai.assert;
const expect = chai.expect;
const user = aero.api.user;
const group = aero.api.group;
const folder = aero.api.folder;
const device = aero.api.device;
const invitee = aero.api.invitee;
const sf = aero.api.sf;
const file = aero.api.file

//
// CONFIG
//

const _error = (res) => {
  return [res.status + ' ' + res.statusText, res.data]
};
const oauth = "458ea1cc3e674a47a004d80cbe5d9d79";
const host = "https://share.syncfs.com";
const api = "1.3"
const cache = false;

describe("Setting global configuration parameters", () => {
  it("The host, oauth configuration parameters are set correctly", () => {
    var config = {
      host_url : host,
      oauth_token : oauth,
      api_version : api,
      cache : cache,
    };
    aero.initialize(config);
    assert.equal(aero.config['host_url'], host);
    assert.equal(aero.config['oauth_token'], oauth);
    assert.equal(aero.config['api_version'], api);
    assert.equal(aero.config['cache'], cache);
  });
});

//
// USERS
//

describe("Retrieve a list of users", () => {
  it('Retrieve a list of users', () => {
    return user.List(123213)
      .then( (res) => { 
        expect(res["data"]).to.not.be.empty;
      })
      .catch( (res) => {
        throw _error(res);
      });
  });
});

describe("Create a user", () => {
  it("Create a new user", () => {
    return user.Create(chance.email(), chance.first(), chance.last())
      .then( (res) => {
        expect(res).to.not.equal("");
      })
      .catch( (res) => { 
        throw _error(res);
      });
  });
});

describe("Update a user's first and last name", () => {
  it("Should update a user's full name", () => {
    let subject;
    return user.List(12312)
      .then( (res) => {
        console.log(res);
        subject = res.data.data[3];
        console.log(subject);
        return user.Update(subject.email, chance.first(), chance.last()); 
      })
      .then((res) => {
        expect(res.data).to.not.equal(""); 
      })
      .catch( (res) => {
        throw _error(res);
      });
   });
}); 


//
// FOLDER
//

describe("Create a new folder in the root directory", () => {
  it("Should create a new folder in a user's root directory", () => {
    return folder.Create("root", chance.word())
      .then( (res) => {
        expect(res).to.not.equal("");
      })
      .catch( (res) => {
        throw _error(res); 
      }); 
  });
});

describe("List all children of a folder", () => {
  it("Should enumerate a list of children", () => {
    return folder.ListChildren("root")
      .then( (res) => {
        expect(res).to.not.equal("");
      })
      .catch( (res) => {
        throw _error(res);
      });
  });
});

//
// Invitation
//


// 
// Device
//

describe("List all devices for a given user", () => {
  it("Should return a list of devices the user has AeroFS on", () => {
    return device.List("daniel.cardoza@aerofs.com")
      .then( (res) => {
        // Assume at least one device
        expect(res).to.not.be.empty;
      })
      .catch( (res) => {
        throw _error(res);
      });
        
  });
});

describe("Get the status of a specific device", () => {
  it("Should return the status of a specific device", () => {
    return device.List("daniel.cardoza@aerofs.com")
      .then( (res) => {
        // Assume at least one device
        expect(res).to.not.be.empty;
        return device.Status(res.data[0].id);
      })
      .then( (res) => {
        expect(res.data["last_seen"]).to.not.equal("");
      })
      .catch( (res) => {
        throw _error(res);
      });
        

  });
});

//
// Groups
//

describe("List all of the groups", () => {
  it("Should return a list of all groups", () => {
    return group.List()
      .catch( (res) => {
        throw _error(res);
      });
  });
});

describe("Create a random group", () => {
  it("Should create a new user group", () => {
    return group.Create(chance.word())
      .then( (res) => {
        expect(res.data).to.not.equal("");
      })
      .catch( (res) => {
        throw _error(res);
      });
  });
});

//
// Folder
//

describe("Retrieve a list of files in the user's root directory", () => {
  it("Should retrieve a non-empty list of files", () => {
    return folder.ListChildren("root")
      .then( (res) => {
        expect(res).to.not.be.empty;
      })
      .catch( (res) => {
        throw _error(res);
      });
  });
});

describe("Retrieve folder metadata", () => {
  it("Should return valid metadata", () => {
      return folder.GetMetadata("root")
        .then( (res) => {
          expect(res.data.id).to.not.equal("");
          assert.isFalse(res.data.is_shared, "The root folder should not be shared");
        })
        .catch( (res) => {
          throw _error(res);
        });
  });
});

//
// Invitee
//

describe("Create an invitation to AeroFS", () => {
  it("Should create an invitation to a non-AeroFS user", () => {
    return invitee.Create(chance.email(), "daniel.cardoza@aerofs.com")
      .then( (res) => {
        expect(res.data["signup_code"]).to.not.equal("");
      })
      .catch( (res) => {
        throw _error(res);
      });
  });
});

//
// SharedFolder
//

describe("Create a new sharedfolder", () => {
  it("Should create a new shared folder", () => {
    return sf.Create(chance.word())
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

describe("Create a new file", () => {
  it("Should create a new file", () => {
    return file.Create("root", chance.word())
      .catch( (res) => {
        throw _error(res);
      });
  });
});


describe("Create a new file and retrieve content via a HEAD request", () => {
  it("Should create a new file and retrieve its headers", () => {
    var fid = "";
    var newFile = chance.word();
  
    return file.Create("root", newFile)
      .then( (res) => {
        fid = res.data.id;
        var ifmatch = res.headers["etag"];
        console.log(ifmatch);
        ifmatch = ifmatch.slice(3,ifmatch.length-1);
        console.log("upload content");
        return file.UploadContentFromText(fid, chance.paragraph({sentences:1}), ifmatch);
      })
      .then( (res) => {
        console.log("get headers");
        return file.GetContentHeaders(fid);
      })
      .then( (res) => {
        expect(res.headers.etag).to.not.equal("");
      })
      .catch( (res) => {
        throw res;
      });

  });
});

describe("Create a new file, upload new content and get the content", () => {
  it("Should create a new file and add content", () => {
    var fid = "";
    var newFile = chance.word();
  
    return file.Create("root", chance.word())
      .then( (res) => {
        fid = res.data.id;
        var ifmatch = res.headers["etag"];
        ifmatch = ifmatch.slice(3,ifmatch.length-1);
        return file.UploadContentFromText(fid, chance.paragraph({sentences:45000}), [ifmatch]);
      })
      .then( (res) => {
        return file.GetContent(fid);
      })
      .then( (res) => {
        console.log(res.data);
      })
      .catch( (res) => {
        throw _error(res);
      });
  });
});

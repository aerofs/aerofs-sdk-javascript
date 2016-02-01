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

const oauth = "";
const host = "";

describe("Setting global configuration parameters", () => {
  it("The host, oauth configuration parameters are set correctly", () => {
    aero.initialize({host_name : host, oauth_token : oauth});
    assert.equal(aero.config.get("host_name"), host);
    assert.equal(aero.config.get("oauth_token"), oauth);
  });
});

//
// USERS
//

describe("Retrieve a list of users", () => {
  it('Retrieve a list of users', () => {
    return user.List(123213)
      .then( (xhr, val) => { 
        expect(val["data"]).to.not.be.empty;
      })
      .catch( (e, xhr, res) => {
        throw [e,res];
      });
  });
});

describe("Create a user", () => {
  it("Create a new user", () => {
    return user.Create(chance.email(), chance.first(), chance.last())
      .then( (xhr, val) => {
        expect(val).to.not.equal("");
      })
      .catch( (e, xhr, res) => { 
        throw [e,res];
      });
  });
});

describe("Update a user's first and last name", () => {
  it("Should update a user's full name", () => {
    var subject;
    return user.List(12312)
      .then( (xhr, val) => {
        subject = val["data"][1];
        return user.Update(subject.email, chance.first(), chance.last()); 
      })
      .then( (updatedUser) => {
        expect(updatedUser).to.not.equal(""); 
      })
      .catch( (e, xhr, res) => {
        throw [e,res];
      });
   });
}); 


//
// FOLDER
//

describe("Create a new folder in the root directory", () => {
  it("Should create a new folder in a user's root directory", () => {
    return folder.Create("root", chance.word())
      .then( (xhr, val) => {
        expect(val).to.not.equal("");
      })
      .catch( (e,xhr,res) => {
        throw [e,res]; 
      }); 
  });
});

describe("List all children of a folder", () => {
  it("Should enumerate a list of children", () => {
    return folder.ListChildren("root")
      .then( (xhr, val) => {
        expect(val).to.not.equal("");
      })
      .catch( (e,xhr,res) => {
        throw [e,res];
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
      .then( (xhr, val) => {
        // Assume at least one device
        expect(val).to.not.be.empty;
      })
      .catch( (e, xhr, res) => {
        throw [e,res];
      });
        
  });
});

describe("Get the status of a specific device", () => {
  it("Should return the status of a specific device", () => {
    return device.List("daniel.cardoza@aerofs.com")
      .then( (xhr, val) => {
        // Assume at least one device
        expect(val).to.not.be.empty;
        return device.Status(val[0].id);
      })
      .then( (val) => {
        expect(val["last_seen"]).to.not.equal("");
      })
      .catch( (e, xhr, res) => {
        throw [e,res];
      });
        

  });
});

//
// Groups
//

describe("List all of the groups", () => {
  it("Should return a list of all groups", () => {
    return group.List()
      .catch( (e,xhr,res) => {
        throw [e,res];
      });
  });
});

describe("Create a random group", () => {
  it("Should create a new user group", () => {
    return group.Create(chance.word())
      .then( (xhr, val) => {
        expect(val).to.not.equal("");
      })
      .catch( (e,xhr,res) => {
        throw [e, res];
      });
  });
});

//
// Folder
//

describe("Retrieve a list of files in the user's root directory", () => {
  it("Should retrieve a non-empty list of files", () => {
    return folder.ListChildren("root")
      .then( (xhr, val) => {
        expect(val).to.not.be.empty;
      })
      .catch( (e,xhr,res) => {
        throw [e,res];
      });
  });
});

describe("Retrieve folder metadata", () => {
  it("Should return valid metadata", () => {
      return folder.GetMetadata("root")
        .then( (xhr, val) => {
          expect(val.id).to.not.equal("");
          assert.isFalse(val.is_shared, "The root folder should not be shared");
        })
        .catch( (e,xhr,res) => {
          throw [e,res];
        });
  });
});

//
// Invitee
//

describe("Create an invitation to AeroFS", () => {
  it("Should create an invitation to a non-AeroFS user", () => {
    return invitee.Create(chance.email(), "daniel.cardoza@aerofs.com")
      .then( (xhr, val) => {
        expect(val["signup_code"]).to.not.equal("");
      })
      .catch( (e,xhr,res) => {
        throw [e,res];
      });
  });
});

//
// SharedFolder
//

describe("Create a new sharedfolder", () => {
  it("Should create a new shared folder", () => {
    return sf.Create(chance.word())
      .then( (xhr, val) => {
      })
      .catch( (e, xhr, res) => {
        throw [e,res];  
      });
  });
});

//
// File
//

describe("Create a new file", () => {
  it("Should create a new file", () => {
    return file.Create("root", chance.word())
      .then( (xhr, val) => {
      })
      .catch( (e,xhr,res) => {
        throw [e,res];
      });
  });
});

describe("Create a new file and upload new content", () => {
  it("Should create a new file and add content", () => {
    var fid = "";
    var newFile = chance.word();
  
    return file.Create("root", newFile)
      .then( (xhr, val) => {
        fid = val.id;
        var ifmatch = xhr.getResponseHeader("etag")
        ifmatch = ifmatch.slice(3,ifmatch.length-1);
        return file.UploadContent(fid, chance.paragraph({sentences:45000}), ifmatch);
      })
      .catch( (e,xhr,res) => {
        throw [e,res];
      });
  });
});

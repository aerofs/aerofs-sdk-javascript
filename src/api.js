// Nice es6 syntax {user, invitee} = aero.api does not work
const user = require("./user");
const invitee = require("./invitee");
const folder = require("./folder");
const device = require("./device");
const group = require("./group");
const groupmember = require("./groupmember");
const invitation = require("./invitation");
const file = require("./file");
const sf = require("./sharedfolder");
const sfmember = require("./sharedfoldermember");
const sfgroupmember = require("./sharedfoldergroupmember");
const sfpendingmember = require("./sharedfolderpendingmember");

module.exports = {
  user : user,
  invitee : invitee,
  folder : folder,
  device : device,
  group : group,
  groupmember : groupmember,
  invitation : invitation,
  file : file,
  sf : sf,
  sfmember  : sfmember,
  sfgroupmember : sfgroupmember,
  sfpendingmember : sfpendingmember
};

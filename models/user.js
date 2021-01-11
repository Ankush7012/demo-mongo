const mongoose = require('mongoose'),
config = require('../config'),
Schema = mongoose.Schema;

const usersSchema = new Schema({
 
  name:      { type: String, default: "" },
  password:  { type: String, default: null },
  accessToken : { type : String, default : "" },
  profilePic:{ type: String, default: config.constants.USER.PROFILE_PIC },
  isDeleted : { type : Boolean, default : false},
  createdAt : { type: String, default: +new Date() },
  updatedAt : { type: String, default: +new Date() }
});
const  users = mongoose.model('users', usersSchema);
module.exports = { users,usersSchema } ;
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workerSchema = new Schema({
 
  name:      { type: String, default: "" },
  stationId:  { type: Schema.ObjectId, ref : 'stations', sparse:true, default: null},
  createdAt : { type: String, default: +new Date() },
  updatedAt : { type: String, default: +new Date() }
});
const  workers = mongoose.model('workers', workerSchema);
module.exports = { workers,workerSchema } ;
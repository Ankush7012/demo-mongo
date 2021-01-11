var mongoose = require('mongoose');
config = require('../config'),
Schema = mongoose.Schema;

const vehicleSchema = new Schema({
 
  name: { type: String, default: "" },
  fillingType : { type:String, enum:[
    config.constants.FILLING_TYPE.DIESEL,
    config.constants.FILLING_TYPE.PETROL,
    config.constants.FILLING_TYPE.GAS
    ] ,default :config.constants.FILLING_TYPE.PETROL},
  userId: { type:Schema.ObjectId, sparse:true, default:null },
  createdAt : { type: String, default: +new Date() },
  updatedAt : { type: String, default: +new Date() }

});
const  vehicles = mongoose.model('vehicles', vehicleSchema);
module.exports = { vehicles,vehicleSchema } ;
const mongoose = require('mongoose'),
Schema = mongoose.Schema,
config = require('../config');




var bookingInfoSchema = new Schema({
    vehicle : {type :Schema.ObjectId,ref:'vehicles', sparse:true, default:null},
  
    createdAt : { type: String, default: +new Date() },
    updatedAt : { type: String, default: +new Date() }
    
});


const bookingSchema = new Schema({
 
  name:      { type: String, default: "" },
  userId:    { type: Schema.ObjectId, ref : 'users',     sparse:true, default: null},
  workerId:  { type: Schema.ObjectId, ref : 'workers',   sparse:true, default: null },
  stationId: { type: Schema.ObjectId, ref : 'stations',  sparse:true, default: null },
  status:    { type: String , enum:[
                    config.constants.BOOKING_STATUS.COMPLETE,
                    config.constants.BOOKING_STATUS.CANCEL,
                    config.constants.BOOKING_STATUS.PENDING,
                    config.constants.BOOKING_STATUS.ACTIVE
                ] , default: config.constants.BOOKING_STATUS.ACTIVE },
  bookingInfo: [ bookingInfoSchema],
  createdAt : { type: String, default: +new Date() },
  updatedAt : { type: String, default: +new Date() }
});
const  bookings = mongoose.model('bookings', bookingSchema);
module.exports = { bookings,bookingSchema } ;
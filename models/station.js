const mongoose = require('mongoose'),
config = require('../config'),
Schema = mongoose.Schema;

const stationSchema = new Schema({
 
  name:      { type: String, default: "" },
  pic:       {type: String, default: config.constants.STATION.PIC},
  accessToken : { type : String, default : "" },
  location:  {
            type: { type: String, enum: ["Point"], default: "Point" },
            coordinates: { type: [Number], default: [0, -1] }
            },
  createdAt : { type: String, default: +new Date() },
  updatedAt : { type: String, default: +new Date() }
});

stationSchema.index({ location: "2dsphere" });

const  stations = mongoose.model('stations', stationSchema);
module.exports = { stations,stationSchema } ;
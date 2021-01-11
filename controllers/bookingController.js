const models = require('../models'),
controllers = require('../controllers'),
mongoose = require('mongoose');
db = require("../db").queries;



    const listBookingsStation = async (payloadData) => {

        try{
          let match = {};
          let lookUp = {};
          let unwindUsers = {};

          let lookup2 = {};
          let unwind2 = {};


          let lookup3 = {};
          let unwind3 = {};


          let lookup4 = {};
          let unwind4 = {};


  console.log(payloadData)

      
      match = {
          $match: {
            stationId: mongoose.Types.ObjectId(payloadData.stationId),
            userId:  mongoose.Types.ObjectId(payloadData.userId),
            workerId:  mongoose.Types.ObjectId(payloadData.workerId),
           
          }
        };
      
      
      lookUp = {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userData"
        }
      };
      
      unwindUsers= {
        $unwind: {
          path: "$userData",
          preserveNullAndEmptyArrays: true
        }
      };
      
      lookup2 = {
        $lookup: {
          from: "vehicles",
          localField: "bookingInfo.vehicle",
          foreignField: "_id",
          as: "vehiclesData"
        }
      };
      
       unwind2 = {
        $unwind: {
          path: "$vehiclesData",
          preserveNullAndEmptyArrays: true
        }
      };


      lookup3 = {
        $lookup: {
          from: "workers",
          localField: "workerId",
          foreignField: "_id",
          as: "workerData"
        }
      };
      
       unwind3 = {
        $unwind: {
          path: "$workerData",
          preserveNullAndEmptyArrays: true
        }
      };


      lookup4 = {
        $lookup: {
          from: "stations",
          localField: "stationId",
          foreignField: "_id",
          as: "stationData"
        }
      };
      
       unwind4 = {
        $unwind: {
          path: "$stationData",
          preserveNullAndEmptyArrays: true
        }
      };
      
      
      let matchData = {
        $match: {
          "userData.isDeleted": false
          
        }
      };


      let project = {
        "$project": {
           "_id":1,
          "name":1,
          "user._id": 1,
          "user.name": 1,
          "user.profilePic": 1,
          "worker._id": 1,
          "worker.name": 1,
          "vehicles._id": 1,
          "vehicles.name": 1,
          "vehicles.fillingType": 1,
          "station._id": 1,
          "station.name": 1,
          
        }
      }
      
      let group = {
        $group: {
          _id: "$_id",
          name: { $first: "$name"},
          vehicles: {$push: "$vehiclesData"},
          user: {$first: "$userData"},
          worker:{$first: "$workerData"},
          station:{$first: "$stationData"}
         
        }
      };
      
      let query = [
        match,
        lookUp,
        unwindUsers,
        lookup2,
        unwind2,
        lookup3,
        unwind3,
        lookup4,
        unwind4,
        matchData,
        group,
        project
      ];
     
      
      let getBookings = await db.aggregateData(models.booking.bookings, query);
     
      
      return getBookings;
        }
        catch(error){
      console.log(error)
        }
      
      }

      const createUserBooking = async(payload)  => {
    
        try {
       
                      
            var result = await db.saveData(models.booking.bookings,payload)
           
            return result;
            }
            catch(err){
                throw err
            }
       
    
    }


      


module.exports = {
    
    listBookingsStation,
    createUserBooking
    
    

}
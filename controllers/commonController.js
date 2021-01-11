const models = require('../models'),
db = require("../db").queries;


const listBookings = async (payloadData, userId) => {

  try{
    let match = {};
    let lookUp = {};
    let unwindUsers = {};

    let lookup2 = {};
    let unwind2 = {};


    let lookup3 = {};
    let unwind3 = {};


console.log("sdfsd")

match = {
    $match: {
      userId: mongoose.Types.ObjectId(userId),
     
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


let matchData = {
  $match: {
    "userData.isDeleted": false
  }
};

let group = {
  $group: {
    _id: "$_id",
    name: { $first: "$name"},
    user: {$first: "$userData"},
    worker:{$first: "$workerData"},
 
    vehicles: {$push: "$vehiclesData"}
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
  matchData,
  group
];
//console.log(query)

let getBookings = await db.aggregateData(models.booking.bookings, query);


return getBookings;
  }
  catch(error){
console.log(error)
  }

}

module.exports = {
    listBookings
   

}
const models = require('../models'),
db = require("../db").queries;

const createStation = async(payloadData)  => {
    try {
      let data = await db.saveData(models.station.stations,payloadData)
      return data
    }
    catch(err){
        return err

    }
    }


    const updateStationPic = async(userId,pic)  => {
        try {
            let query = { _id : userId }
            let update_data =  {profilePic:pic} 

            let updatedData = await db.findAndUpdate(models.station.stations,query,update_data,{new:true})
           
            return updatedData
        }
        catch(err){
            return err
    
        }
        }

        const getNearByStation = async (lng, lat) => {

            try {
        
              let radious = 20
        
              let nearBy = {
                $geoNear : {
                    near : {
                      type : "Point",
                      coordinates : [lng, lat]
                    },
                    distanceField : "distance",
                 //   maxDistance : radious * 1000,
                    query : {
                      
                    },
                    spherical : true
                  }
              }
        
              let sort = {
                $sort : {distance : 1}
              }
        
              let limit = {
                $limit : 1
              }
        
              let query = [nearBy, sort, limit]
        
              let nearByStation = await db.aggregateData(models.station.stations, query);
        
              console.log("---------------------------------nearByStation--",nearByStation)
              return nearByStation;
        
            }
            catch (err) {
              throw err;
            }
        
        };


module.exports = {
    updateStationPic,
    createStation,
    getNearByStation

}
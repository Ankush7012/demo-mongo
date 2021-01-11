const express = require('express'),
router = express.Router(),
controller = require('../controllers');

router.post('/stationbookings', function(req, res, next) {

    req.body = {
        stationId:"5fccc40d7102573a0456b75c",
        userId:"5fccba84345fe870453b6626",
        workerId:"5fccc4d20537df490917e485"
    }
   
    return controller.bookingController.listBookingsStation(req.body)
    .then(response => {
        
        res.json(response)
    })
    .catch(error => {
        next(error)
      });

})

router.post('/booking/create', async function(req, res, next) {

    req.body = {
        lat:30.7333, // Lat lng for chandigarh
        lng:76.7794,
        
    }
    

    let station = await controller.stationController.getNearByStation(req.body.lng,req.body.lat)
    if(station.length){ // if nearBy station found
        let stationId  = station[0]._id 

        let query = {
            stationId
        }
        let worker = await controller.workerController.getWorker(query) 
        if(worker.length){
            let workerId = worker[0]._id

            req.body = {
                name:"Testing 1", // can be anything from client side
                userId : req.user._id,
                stationId,
                workerId,
                bookingInfo:[
                    {vehicle:"5fccc6a414ab806ea9ade25a"}, // can be anything from client side
                    {vehicle:"5fcd0e640f0339307c0119f5"} // can be anything from client side
                ]
                
            }

        return controller.bookingController.createUserBooking(req.body)
         .then(response => {
        
        res.json(response)
    })
    .catch(error => {
        next(error)
      });
    }
    else{
        next(new Error("Cannot find any worker"))
    }

    }
    else{
        next(new Error("Cannot find any stations"))
    }

   

})


module.exports = router
const express = require('express'),
router = express.Router(),
controller = require('../controllers');

router.post('/station/create', function(req, res, next) {

    // dummy data to use
    req.body = {
        name: "Mumbai 1",
        location: {
            type:"Point",
            coordinates:[72.8777,19.0760] // [lng,lat]

        }
    }

    // create station 
    return controller.stationController.createStation(req.body)
    .then(response => {
        
        res.json(response)
    })
    .catch(error => {
        next(error)
      });

})

module.exports = router;
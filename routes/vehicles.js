const express = require('express'),
router = express.Router(),
controller = require('../controllers');

router.post('/vehicle/create', function(req, res, next) {

    // dummy data to use
    req.body = {
        name: "Vehicle 2",
        fillingType:"GAS",
        userId:req.user._id
    }

    // create station 
    return controller.vehicleController.createVehicle(req.body)
    .then(response => {
        
        res.json(response)
    })
    .catch(error => {
        next(error)
      });

})

module.exports = router;
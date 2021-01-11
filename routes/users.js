const express = require('express'),
router = express.Router(),
controller = require('../controllers');

router.post('/user/create', function(req, res, next) {
    return controller.userController.createUser(req.body)
    .then(response => {
        
        res.json(response)
    })
    .catch(error => {
        next(error)
      });

})


router.post('/user/login', function(req, res, next) {
    return controller.userController.userLogin(req.body)
    .then(response => {
        res.json(response)
    })
    .catch(error => {
       next(error)
      });

})



// router.post('/user/booking', function(req, res, next) {
//      req.body = {
//         name:"Testing 1",
//         userId : req.user._id,
//         workerId:"5fccc4d20537df490917e485",
//         stationId:"5fccc40d7102573a0456b75c",
//         bookingInfo:[
//             {vehicle:"5fccc6a414ab806ea9ade25a",fillingType:"GAS"}
//         ]
//     }
//     return controller.userController.userBooking(req.body)
//     .then(response => {
        
//         res.json(response)
//     })
//     .catch(error => {
//         next(error)
//       });

// })


module.exports = router;

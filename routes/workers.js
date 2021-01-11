const express = require('express'),
router = express.Router(),
controller = require('../controllers');

router.post('/worker/create', function(req, res, next) {
    req.body = {
        name: "Worker 1",
        stationId:"5fccc40d7102573a0456b75c" 
    }
    return controller.workerController.createWorker(req.body)
    .then(response => {
        
        res.json(response)
    })
    .catch(error => {
        next(error)
      });

})

module.exports = router;
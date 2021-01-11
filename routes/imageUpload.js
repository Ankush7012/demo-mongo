const express = require('express'),
 router = express.Router(),
 controllers = require('../controllers');




   router.post('/imageupload',(req,res)=>{
   

    controllers.imageController.profileImageUpload( req, res, ( error ) => {
     
      if( error ){
       console.log( 'errors', error );
       res.json( { error: error } );
      } else {
       // If File not found
       if( req.file === undefined ){
        console.log( 'Error: No File Selected!' );
        res.json( 'Error: No File Selected' );
       } else {
        // If Success
        const imageName = req.file.key;
        const imageLocation = req.file.location;


        let result
       if(req.body.type=='user')
         result = controllers.userController.updateUserPic(req.user._id,imageLocation)
       else
         result = controllers.stationController.updateStationPic(req.user._id,imageLocation)
        
        result.then(response => {
          res.json( {
            image: imageName,
            location: imageLocation
           } );
        })
        .catch(err => {
           throw new Error(err)
          });

  
       }
      }
    });
  })



module.exports = router;
const Jwt = require('jsonwebtoken'),
    config = require('../config'),
    db = require('../db').queries,
    models = require('../models');


var generateToken = function(tokenData,userType) {
    return new Promise((resolve, reject) => {
        try {
           let secretKey;
            switch(userType){
                case config.constants.SCOPE.USER:
                    secretKey = config.constants.SERVER.JWT_SECRET_KEY_USER;
                    break;
                case config.constants.SCOPE.STATION:
                    secretKey = config.constants.SERVER.JWT_SECRET_KEY_STATION;
                    break;
                
            }
            

         //   console.log("........tokenData...........",tokenData);
            let token = Jwt.sign(tokenData, secretKey);
         //    console.log("=======secretKey==========",token,secretKey)

            return resolve(token);
        } catch (err) {
            return reject(err);
        }
    });
};


var verifyToken = async function verifyToken(tokenData) {

    
   // console.log("============tokenData================",tokenData);
    var user;

        let query = {
            _id : tokenData._id,
            accessToken : {$ne:null},
            time : tokenData.time
        }

         if(tokenData.scope === config.constants.SCOPE.USER){
            user = await db.getData(models.user.users,query,{__v : 0},{lean : true});
            //console.log("..+++++++++++++++++++.user..******************............",user);
            if(!(user.length)){
                //throw UniversalFunctions.sendError('en', ERROR.UNAUTHORIZED);
            }
         }
         
        else if(tokenData.scope === config.constants.SCOPE.STATION){
            user = await db.getData(models.station.stations,{_id: tokenData._id},{__v : 0},{lean : true});
            if(!(user.length)){
               // throw UniversalFunctions.sendError('en', ERROR.UNAUTHORIZED);
            }
            
            
        }

        


        // console.log(JSON.stringify(user), JSON.stringify(tokenData));


        if(user.length === 0) throw UniversalFunctions.sendError('en', ERROR.UNAUTHORIZED);
    
        else if(user && user[0] ) {
            user[0].scope =tokenData.scope;
            return {
                isValid: true,
                credentials: user[0]
            };
        }
       
};

module.exports={
    generateToken,
    verifyToken
};
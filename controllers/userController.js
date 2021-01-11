const models = require('../models'),
config = require('../config'),
utils = require('../utils'),
db = require("../db").queries,
bcrypt = require('bcrypt');
require('dotenv').config();


    const userBooking = async(payload)  => {
    
            try {
           
                          
                var result = await db.saveData(models.booking.bookings,payload)
               
                return result;
                }
                catch(err){
                    throw err
                }
           
        
        }

    const createUser =async(payload)=>{
        
        try {
   
    
        let hash = bcrypt.hashSync(payload.password, config.constants.SERVER.SALT);
        payload.password = hash
    
        var result = await db.saveData(models.user.users,payload)
       
        return result;
        }
        catch(err){
            throw err
        }
    }

    const updateUserPic = async(userId,pic)  => {
        try {
            let query = { _id : userId }
            let update_data =  {profilePic:pic} 

            let updatedData = await db.findAndUpdate(models.user.users,query,update_data,{new:true})
           
            return updatedData
        }
        catch(err){
            throw err
    
        }
        }


    const userLogin = async(payloadData)  => {
        try {
        
              
                // define table
                const models = require('../models'),
                config = require('../config'),
                utils = require('../utils'),
                db = require("../db").queries,
                bcrypt = require('bcrypt');
                require('dotenv').config();     let Model = models.user.users, token_result;
        
                            let query={
                                name:payloadData.name
                            }  
                        let user = await db.getData(Model,query)
                        
                        if(user.length){
                            

                            if(bcrypt.compareSync(payloadData.password, user[0].password)) {
                                            // generate token
                                            let function_data = {
                                                scope : config.constants.SCOPE.USER,
                                                _id : user[0]._id,
                                                model : Model
                                        }

                                        token_result =  await userToken(function_data)
                                
                                }


                                else{
                                    
                                    throw new Error({
                                    statusCode: 400,
                                    message:"Invalid Authentication"
                                    })
                                    
                            }

       
        
                    }
                    else{
                        throw new Error({
                            statusCode: 400,
                            message:"User does not exist"
                            })
                    }
        
        
                return {
                    accessToken:token_result.accessToken,
                    apiKey: process.env.API_KEY
                }
        
        }
        catch(err) {
            throw err;
        }
        }


    const userToken = async(function_data) => {
        try {
        
                let tokenData = {
                        scope : function_data.scope,
                        _id : function_data._id,
                        time : new Date().getTime()
                };
        
                let accessToken = await utils.tokenManager.generateToken(tokenData, function_data.scope);
        
                if (accessToken == null) {
                        throw  new Error("There was some error generating token");
                }
        
                
                let query = { _id : function_data._id }
                let update_data = { accessToken : accessToken }
                let update_token = await db.findAndUpdate(function_data.model, query, update_data, { new : true});
        
                return update_token
        
        }
        catch(err) {
            throw err;
        }
        }


module.exports = {
    userBooking,
    updateUserPic,
    userToken,
    userLogin,
    createUser

}
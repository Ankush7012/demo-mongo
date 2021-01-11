require('dotenv').config();
const Jwt = require('jsonwebtoken'),
config = require('../config');

const authenticateTokenAndApiKey = (req, res, next)=> {

  var _ = require('underscore')
      , nonSecurePaths = ['/user/create','/user/login'];

  if ( _.contains(nonSecurePaths, req.params['0']) ){
 
    return next();
  
  }
    // Gather the jwt access token & api-key from the request header
    const authHeader = req.headers['authorization']
    const apikey = req.headers['api-key']
 
    const token = authHeader && authHeader.split(' ')[1]
   
    if (token == null) return res.sendStatus(401) // if there isn't any token
  
    Jwt.verify(token, config.constants.SERVER.JWT_SECRET_KEY_USER, (err, user) => {
     
      if (err) return res.sendStatus(403)
      
      if(apikey==process.env.API_KEY){
        
        req.user = user
         next() 
      }
      else{
        return res.json({statusCode:403,message:"Invalid Api key"})
      }
    })
  }

  module.exports={
    authenticateTokenAndApiKey
  }
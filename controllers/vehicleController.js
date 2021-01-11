const models = require('../models'),
config = require('../config'),
utils = require('../utils'),
db = require("../db").queries,
bcrypt = require('bcrypt');
require('dotenv').config();


const createVehicle = async(payloadData)  => {
    try {
        let data = await db.saveData(models.vehicle.vehicles,payloadData)
        return data
       
    }
    catch(err){
        throw err;

    }
    }


    module.exports = {
        createVehicle
       
    
    }
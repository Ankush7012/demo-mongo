const models = require('../models'),
config = require('../config'),
utils = require('../utils'),
db = require("../db").queries,
bcrypt = require('bcrypt');
require('dotenv').config();


const createWorker = async(payloadData)  => {
    try {
        let data = await db.saveData(models.worker.workers,payloadData)
        return data
       
    }
    catch(err){
        throw err;

    }
    }

    const getWorker = async(payloadData)  => {
        try {
            let data = await db.getData(models.worker.workers,payloadData)
            return data
           
        }
        catch(err){
            throw err;
    
        }
        }


    module.exports = {
        createWorker,
        getWorker
       
    
    }
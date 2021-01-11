

function saveData(model,data) {
    return new Promise((resolve, reject) => {
        try {
            let saveData = model.create(data);
            return resolve(saveData);
        } catch (err) {
            return reject(err);
        }
    });
}

function getData(model, query, projection, options) {
    return new Promise((resolve, reject) => {
        try {
            let findData = model.find(query, projection, options);
            return resolve(findData);
        } catch (err) {
            return reject(err);
        }
    });
}


function findAndUpdate(model, conditions, update, options) {
    return new Promise((resolve, reject) => {
        try {
            let data = model.findOneAndUpdate(conditions, update, options);
            return resolve(data);
        } catch (err) {
            return reject(err);
        }
    });
}

function update(model, conditions, update, options) {
    return new Promise((resolve, reject) => {
        try {
            let data = model.update(conditions, update, options);
            return resolve(data);
        } catch (err) {
            return reject(err);
        }
    });
}

function remove(model, condition) {
    return new Promise((resolve, reject) => {
        try {
            let data = model.deleteMany(condition);
            return resolve(data);
        } catch (err) {
            return reject(err);
        }
    });
}

function removeOne(model, condition) {
    return new Promise((resolve, reject) => {
        try {
            let data = model.deleteOne(condition);
            return resolve(data);
        } catch (err) {
            return reject(err);
        }
    });
}


function aggregateData(model, group,options) {
    return new Promise((resolve, reject) => {
        try {
            let data;

            if(options !==undefined){
                data = model.aggregate(group).option(options);
            }
            else{
                data = model.aggregate(group);
            }

            return resolve(data);
        } catch (err) {
            return reject(err);
        }
    });
}


module.exports = {
    saveData,
    getData,
    update,
    remove,
    removeOne,
    findAndUpdate,
    aggregateData
    
    
 
};


const users = require('./users'),
stations = require('./stations'),
workers = require('./workers'),
vehicles = require('./vehicles'),
bookings = require('./bookings'),
imageUpload = require('./imageUpload');



var all = [].concat(
    users,imageUpload,stations,workers,vehicles,bookings
);
module.exports = { all }
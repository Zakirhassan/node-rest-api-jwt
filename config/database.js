//Set up mongoose connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/User');
mongoose.Promise = global.Promise;
module.exports = mongoose;
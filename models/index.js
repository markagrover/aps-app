const mongoose = require("mongoose");

// set the debug so we can see the errors in the console.
mongoose.set("debug", true);

// connect to mongodb NOTE: we can name our db anything. this one is 'todo-api'
mongoose.connect("mongodb://localhost/aps-app-dev", {useMongoClient: true, poolSize: 5});

// allows us to use the .then() over callback functions!!
mongoose.Promise = Promise;

//Export the Todo Model Class as Todo, Very clean!
//module.exports.Todo = require("./todo");
module.exports.Vendor = require("./vendor");
module.exports.Client = require("./client");
module.exports.Job = require("./job");
module.exports.Note = require("./note");

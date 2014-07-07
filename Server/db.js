var orm = require("orm"); 
var config = require('./config');

var db = orm.connect(config.dbUrl);

db.on("connect", function (err) {
    if (err) {
        console.log("Something is wrong with the connection", err);
        return;
    }

    console.log("Database connected!");
    
});

module.exports = db;
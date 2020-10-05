var mysql = require('mysql');
var con = mysql.createConnection({
    host: "10.114.32.78",
    port: "3306",
    user: "testuser",
    password: "owsecure",
    database: "workoutswap"
});

exports.get = function() {
    return con;
};
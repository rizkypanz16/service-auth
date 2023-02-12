const mysql = require('mysql');
var filename = " File DB Connection";
dbdata = {
  host: process.env.AUTH_DBHOST,
  user: process.env.AUTH_DBUSER,
  password: process.env.AUTH_DBPASSWORD,
  database: process.env.AUTH_DBNAME
}
var connection = mysql.createConnection(dbdata);
connection.connect(function(err){
    if (err) throw err
    console.log('connected successfully to DB ...');
});

module.exports = {
    connection : mysql.createConnection(dbdata),
    name : filename
}

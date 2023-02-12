const mysql = require('mysql');
var filename = " File DB Connection";
dbdata = {
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME
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

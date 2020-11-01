const http = require('http')
const fs = require('fs')
const port = process.env.PORT || 80

//var mysql = require('mysql');
//var con = mysql.createConnection({
//  host: "172.17.0.3",
//  user: "root",
//  password: "Passw0rd",
//  database: "nodeapp"
//});

//con.connect(function(err) {
//  if (err) throw err;
//  con.query("SELECT * FROM appconfig", function (err, result, fields) {
//    if (err) throw err;
//    console.log(result);
//  });
//});

//var mysql = require('mysql');
//var connection = mysql.createConnection({
//	host: '172.17.0.3',
//	user: 'root',
//	password: 'Passw0rd',
//	database: 'nodeapp'
//});

//connection.query('SHOW TABLES',function (error, rows, fields) {
//    if (error)
//        return console.log(error);
//    console.log(rows);
//});

//connection.end();

fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err;
    }
    http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    }).listen(port);
});

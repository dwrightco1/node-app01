const http = require('http')
const fs = require('fs')
const port = process.env.PORT || 81
const database_ip = process.env.DATABASE_IP || "172.17.0.2"

var mysql = require('mysql');
var connection = mysql.createConnection({
	host: '172.17.0.2',
	user: 'root',
	password: 'Passw0rd',
	database: 'nodeapp'
});

var mysql_return = ""
connection.query('SHOW TABLES',function (error, rows, fields) {
    if (error)
        return console.log(error);
    console.log(rows);
    mysql_return = rows
});

connection.end();

fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err;
    }
    http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(mysql_return);
        response.write(html);
        response.end();
    }).listen(port);
});

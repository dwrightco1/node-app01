const http = require('http')
const fs = require('fs')
const port = process.env.NODE_PORT || 81
const database_ip = process.env.DATABASE_IP || "ip-not-specified"
const database_user = process.env.DATABASE_USER || "user-not-specified"
const database_pw = process.env.DATABASE_PW || "password-not-specified"
const database_name = process.env.DATABASE_NAME || "instance-not-specified"

var mysql = require('mysql');

console.log("NODEAPP: initializing database connection: " + database_user + "@" + database_ip + ":" + database_name)
var con = mysql.createConnection({
  host: database_ip,
  user: database_user,
  password: database_pw,
  database: "nodeapp"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("NODEAPP: querying database")
  con.query("SELECT * FROM appconfig", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err;
    }
    console.log("NODEAPP: starting http listener on port " + port)
    http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    }).listen(port);
});

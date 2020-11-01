// required modules
const http = require('http')
const fs = require('fs')
var mysql = require('mysql');

// initialize web server & database parameters
const port = process.env.NODE_PORT || 80
const database_ip = process.env.DATABASE_IP || "unset"
const database_user = process.env.DATABASE_USER || "unset"
const database_pw = process.env.DATABASE_PW || "unset"
const database_name = process.env.DATABASE_NAME || "unset"

// update console
console.log("NODEAPP: starting http listener on port " + port)

// create http server
http.createServer(function(nodeapp_request, nodeapp_response) {
    // read database (synchronously)
    console.log(`--> querying database ${database_user}@${database_ip}:${database_name}`)
    var con = mysql.createConnection({
      host: database_ip,
      user: database_user,
      password: database_pw,
      database: "nodeapp"
    });

    con.connect(function(mysql_err) {
      //if (mysql_err) throw mysql_err;
      console.log("NODEAPP: querying database")
      //con.query("SELECT * FROM appconfig", function (select_err, result, fields) {
      //  if (select_err) throw select_err;
      //  console.log(result);
      //});
    });

    // write header & response
    nodeapp_response.writeHeader(200, {"Content-Type": "text/html"});
    nodeapp_response.end('Hello\n');
}).listen(port);

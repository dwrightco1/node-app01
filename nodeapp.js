// initialize web server & database parameters
const port = process.env.PORT || 80
const database_ip = process.env.DATABASE_IP || "unset"
const database_user = process.env.DATABASE_USER || "unset"
const database_pw = process.env.DATABASE_PW || "unset"
const database_name = process.env.DATABASE_NAME || "unset"

// required modules
const http = require('http')
const mysql = require('mysql');
const fs = require('fs')

// initialize database return buffer
var db_return_data = `Attempting to connect to database: ${database_user}@${database_ip}:${database_name}`

console.log("NODEAPP: starting http listener on port " + port)

http.createServer(function(request, response) {
    // update log
    console.log("HTTP: processing request")

    // create database connection
    const con = mysql.createConnection({
        host: database_ip,
        user: database_user,
        password: database_pw,
        database: database_name
    });

    con.connect((err) => {
        if(err){
          console.log('Error connecting to Db');
          db_return_data = `Failed to connect to database: ${database_user}@${database_ip}:${database_name}`
          return;
        }
        console.log('Connection established');
	db_return_data = `Established connection to database: ${database_user}@${database_ip}:${database_name}`
    });

    // perform database query
    con.query('SELECT * FROM appconfig', (err,rows) => {
        if(err) {
            console.log('Failed to query database');
            db_return_data = `Failed to query database: ${database_user}@${database_ip}:${database_name}`
        }
    
	if (typeof rows !== "undefined" && rows !== null) {
            console.log('Data received from Db:');
            console.log(rows);
            db_return_data = `Successfully connected to database: ${database_user}@${database_ip}:${database_name}`
	}
	else {
            db_return_data = `Received empty response from database: ${database_user}@${database_ip}:${database_name}`
        }
    });

    con.end((err) => {
        // terminate connection gracefully (wait for outstanding queries, then send quit packet to MySQL server)
    });
    response.writeHeader(200, {"Content-Type": "text/html"});
    response.write(db_return_data + "\n");
    response.end();
}).listen(port);

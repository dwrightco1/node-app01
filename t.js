// initialize web server & database parameters
const port = process.env.NODE_PORT || 80
const database_ip = process.env.DATABASE_IP || "unset"
const database_user = process.env.DATABASE_USER || "unset"
const database_pw = process.env.DATABASE_PW || "unset"
const database_name = process.env.DATABASE_NAME || "unset"

const mysql = require('mysql');

// First you need to create a connection to the database
// Be sure to replace 'user' and 'password' with the correct values
const con = mysql.createConnection({
  host: database_ip,
  user: database_user,
  password: database_pw,
});

con.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

con.end((err) => {
  // The connection is terminated gracefully
  // Ensures all remaining queries are executed
  // Then sends a quit packet to the MySQL server.
});

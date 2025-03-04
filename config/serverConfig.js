const fs = require('fs');
const path = require('path');
// const mysql = require('mysql2');
// const dotenv = require('dotenv');

// dotenv.config();

// const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// db.getConnection((err, connection) => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//     return;
//   }
//   console.log('Connected to the database');
//   connection.release();
// });

// module.exports = {
//   db,
//   sslOptions: {
//     key: fs.readFileSync(path.join(__dirname, '../ssl/local_server.key')),
//     cert: fs.readFileSync(path.join(__dirname, '../ssl/local_server.crt')),
//     ca: fs.readFileSync(path.join(__dirname, '../ssl/local_server.crt')),
//     requestCert: false,
//     rejectUnauthorized: false,
//   },
// };

const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.PORT
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
  connection.release();
});

module.exports = { db,
  //   sslOptions: {
  //   key: fs.readFileSync(path.join(__dirname, '../ssl/local_server.key')),
  //   cert: fs.readFileSync(path.join(__dirname, '../ssl/local_server.crt')),
  //   ca: fs.readFileSync(path.join(__dirname, '../ssl/local_server.crt')),
  //   requestCert: true,
  //   rejectUnauthorized: true,
  // },
 };
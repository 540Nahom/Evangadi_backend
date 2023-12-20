const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  port: 3306,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
 
});

pool
  .getConnection()
  .then((connection) => {
    console.log("Connected to MySQL database!");
    connection.release(); // Release the connection
  })
  .catch((error) => {
    console.error("Error connecting to MySQL database:", error);
    process.exit(1); // Exit the application if there's an error connecting
  });

module.exports = { pool };

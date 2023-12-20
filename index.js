require("dotenv").config;
const express = require("express");
require("dotenv").config();
const { pool } = require("./Config/db");
const { userTable, questionTable, answerTable } = require("./model/model");
const cors = require("cors");

// Router importing
const authRouter = require("./router/authRouter");
const questionRouter = require("./router/questionsRouter");
const answerRouter = require("./router/answerRouter");
const userRouter = require("./router/userRouter");
const { error } = require("console");

// const { protect } = require("./controller/authController");

const server = express();
const port = process.env.PORT || 5000;

// Middleware
server.use(express.json());
server.use(cors());
server.get("/", (req, res) => {
  res.send("Abebe");
});

// Routers
server.use("/api/v1", authRouter);
server.use("/api/v1", questionRouter);
server.use("/api/v1", answerRouter);
server.use("/api/v1", userRouter);

async function startApp() {
  let connection;

  try {
    connection = await pool.getConnection();
    console.log("Database Connection Established!");

   try {
     // Creating the tables
     await connection.query(userTable);
     await connection.query(questionTable);
     await connection.query(answerTable);
     console.log(
       "userTable, questionTable, and userTable  have been created successfully"
     );
   } catch (error) {
     console.error("Error creating tables:", error);
     // Handle the error here, such as logging, rolling back transactions, or exiting the process
   }


    // Starting/running the server
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.log(err.message);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

startApp();

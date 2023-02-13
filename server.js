const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { db_CONNECT } = require("./db/connect");
const errorHandler = require("./middleware/errorMiddleware");
const colors = require("colors");
const userRoute = require("./routes/userRoute");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// routes middleware
app.use("/api/user", userRoute);

// error middleware
app.use(errorHandler);

// CONNECT MONGODB
db_CONNECT();

// server connection
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`.green.bold);
});

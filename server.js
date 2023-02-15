const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { db_CONNECT } = require("./db/connect");
const errorHandler = require("./middleware/errorMiddleware");
const userRoute = require("./routes/userRoute");
const uploadRoute = require("./routes/uploadRoute");
const path = require("path");

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

app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "public/uploads"))
);

// routes middleware
app.use("/api/user", userRoute);
app.use("/api/get", uploadRoute);
app.use("/api/save", uploadRoute);
app.use("/api/delete", uploadRoute);

// Routes
app.get("/", (req, res) => {
  res.send("server running");
});

// error middleware
app.use(errorHandler);

// CONNECT MONGODB
db_CONNECT();

// server connection
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});

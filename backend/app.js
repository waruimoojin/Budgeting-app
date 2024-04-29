const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const users = require("./models/usersModel");
const cors = require("cors");
const app = express();
const port = 3000;
const bcrypt = require("bcrypt");
const {
  authRoutes,
  budgetRoutes,
  transactionRoutes,
  categoryRoutes,
} = require("./routes");


process.env.ENV = "production";

const { errorConverter, errorHandler } = require("./middlewares/errorHandler");


app.use(express.json({}));
app.use(cors());

// routes
app.use("/api/", authRoutes);
app.use("/budget", budgetRoutes);
app.use("/transaction", transactionRoutes);
app.use("/category", categoryRoutes);





app.use((req, res, next) => {
  next(new ApiError(httpStatus.BAD_REQUEST, "API Not found"));
});


app.use(errorConverter);

app.use(errorHandler);


module.exports = app;

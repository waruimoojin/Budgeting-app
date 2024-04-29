const mongoose = require("mongoose");


async function connectDB() {
    try {
      await mongoose.connect("mongodb://localhost:27017/BudgetDB", {});
      console.log("MongoDB Connected");
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
}

module.exports = connectDB;
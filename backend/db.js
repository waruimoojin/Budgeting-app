const mongoose = require("mongoose");

// you can make a seperate test for this function that will be functional not integration
//. this function is hard to test becuase its tightly coupled its creating the things it depend
// this function shoul returnb true or false or something to to test it better
// or you can chatgpt to write test for these
async function connectDB() {
    try {
      await mongoose.connect("mongodb://localhost:27017/BudgetDB", {}); // this uri
      console.log("MongoDB Connected");
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
}

module.exports = connectDB;
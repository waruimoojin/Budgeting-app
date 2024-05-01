const mongoose = require("mongoose");

const categorySch = {
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  idcategory: {
    type: Number,
  },
};

const category = mongoose.model("category", categorySch);

module.exports = category;

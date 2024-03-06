const mongoose = require('mongoose');


const budgetSch = {
    name: {
        type: String,
        required : [true , "Please enter a budget name"]

    },
    amount: {
        type: Number

    }

}

const budget = mongoose.model('budget', budgetSch);

module.exports = budget;

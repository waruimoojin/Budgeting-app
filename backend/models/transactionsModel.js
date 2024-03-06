const mongoose = require('mongoose');


const transactionsSch = {
    name: {
        type: String,
        required : [true , "Please enter the expense name"]

    },

    amount: {
        type: Number,
       

    },
  
}

const transactions = mongoose.model('transactions',transactionsSch);

module.exports = transactions;

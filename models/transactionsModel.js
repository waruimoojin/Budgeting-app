const mongoose = require('mongoose');


const transactionsSch = {
    usersid: {
        type: Number,
       

    },

    amount: {
        type: Number,
       

    },
    type: {
        type: String,
        required : [true , "Please enter your name"]

    },
    idtransaction: {
        type: Number

    }

}

const transactions = mongoose.model('transactions',transactionsSch);

module.exports = transactions;

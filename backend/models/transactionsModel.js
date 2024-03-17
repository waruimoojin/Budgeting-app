const mongoose = require('mongoose');

const transactionsSchema = new mongoose.Schema({
    expenseid: mongoose.Schema.Types.ObjectId, // Ajout du champ _id
    name: {
        type: String,
        required: [true, "Please enter the expense name"]
    },
    amount: {
        type: Number,
    }
});

const Transaction = mongoose.model('Transaction', transactionsSchema);

module.exports = Transaction;

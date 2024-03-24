
// transactionsModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  name: String,
  amount: Number,
  budgetId: { type: Schema.Types.ObjectId, ref: 'Budget' }, // Référence au modèle de budget
  userId: { type: Schema.Types.ObjectId, ref: 'User' }, // Référence à l'utilisateur
  expenseid: { type: mongoose.Schema.Types.ObjectId, ref: 'Budget', required: true }// Ajout du champ _id
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;


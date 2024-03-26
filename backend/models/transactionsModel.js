const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  name: String,
  amount: Number,
  date: { type: Date, default: Date.now }, // Ajout de la propriété de date avec la date par défaut comme valeur actuelle
  budgetId: { type: Schema.Types.ObjectId, ref: 'Budget' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;

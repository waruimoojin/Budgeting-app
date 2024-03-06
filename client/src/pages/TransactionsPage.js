// TransactionsPage.js
import React from 'react';
import AddBudget from '../components/AddBudget';
import AddTransaction from '../components/AddTransactions';

const TransactionsPage = () => {
  // Logique spécifique à la page des transactions
  return (
    <div>
      <h2>Page des Transactions</h2>
      <AddBudget/>
      <AddTransaction />
    </div>
  );
};

export default TransactionsPage;

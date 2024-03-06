// TransactionsPage.js
import React from 'react';

import AddTransaction from '../components/AddTransactions';

const TransactionsPage = () => {
  // Logique spécifique à la page des transactions
  return (
    <div>
      <h2>Page des Transactions</h2>
      
      <AddTransaction />
    </div>
  );
};

export default TransactionsPage;

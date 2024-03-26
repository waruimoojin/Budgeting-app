// ExpenseItem.js
import React from 'react';

const ExpenseItem = ({ transaction, handleDelete }) => {
  
  return (
    <div key={transaction._id} style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
      <p>Name: {transaction.name}</p>
      <p>Amount: {transaction.amount}</p>
      {transaction.budgetId  && (
        <div >
          <p>Budget Name: {transaction.budgetId ? transaction.budgetId.name: ""}</p>
          <p>Budget Amount: {transaction.budgetId ? transaction.budgetId.amount: ""}</p>
        </div>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ExpenseItem;

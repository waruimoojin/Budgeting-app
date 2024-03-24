// ExpenseItem.js
import React from 'react';

const ExpenseItem = ({ expense, budget, handleDelete }) => {
  return (
    <div key={expense._id} style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
      <p>Name: {expense.name}</p>
      <p>Amount: {expense.amount}</p>
      {budget && (
        <div >
          <p>Budget Name: {budget.name}</p>
          <p>Budget Amount: {budget.amount}</p>
        </div>
      )}
      <button onClick={() => handleDelete(expense._id)}>Delete</button>
    </div>
  );
};

export default ExpenseItem;

import React from 'react';
import trashIcon from './trash-icon.png'; // Importez l'icône de corbeille

const ExpenseItem = ({ transaction, handleDelete }) => {
  
  return (
    <div className="card mb-2" style={{ maxWidth: '900px' }}>
      <div className="card-body">
        <div className="row">
          <div className="col">
            <h5>Transaction</h5>
            <ul>
            <p><li><strong>Name:</strong> {transaction.name}</li></p>
            <p> <li><strong>Amount:</strong> {transaction.amount}</li></p>
            </ul>
          </div>
          {transaction.budgetId && (
            <div className="col">
              <div className="box p-1">
                <h5>Budget Details</h5>
                <p><strong>Budget Name:</strong> {transaction.budgetId.name}</p>
                <p><strong>Budget Amount:</strong> {transaction.budgetId.amount}</p>
              </div>
            </div>
          )}
        </div>
        <div className="text-center mt-2">
          <button className="btn btn-danger" onClick={handleDelete}>
            <img src={trashIcon} alt="Delete" style={{ width: '25px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;
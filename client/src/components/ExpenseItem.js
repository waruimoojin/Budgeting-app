import React from "react";
import trashIcon from "./trash-icon.png";

const ExpenseItem = ({ transaction, handleDelete }) => {
  return (
    <div className="card mb-2 card bg-light" style={{ maxWidth: "900px" }}>
      <div className="card-body">
        <div className="row">
          <div className="col">
            <h5>Transaction</h5>
            <ul>
              <p>
                <li>
                  <strong>Nom:</strong> {transaction.name}
                </li>
              </p>
              <p>
                {" "}
                <li>
                  <strong>Montant:</strong> {transaction.amount}
                </li>
              </p>
            </ul>
          </div>
          {transaction.budgetId && (
            <div className="col">
              <div className="box p-1">
                <h5>Détails du budget</h5>
                <p>
                  <strong>Nom du budget:</strong> {transaction.budgetId.name}
                </p>
                <p>
                  <strong>Montant total:</strong>{" "}
                  {transaction.budgetId.origionalAmount}
                </p>
                <p>
                  <strong>Montant budgétaire:</strong>{" "}
                  {transaction.budgetId.amount}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="text-center mt-2">
          <button className="btn btn-danger" onClick={handleDelete}>
            <img src={trashIcon} alt="Delete" style={{ width: "25px" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;

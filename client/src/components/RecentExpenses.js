import React from "react";
import axios from "axios";
import ExpenseItem from "./ExpenseItem";

const RecentExpenses = ({
  transactions,
  setTransactions,
  selectedBudgetId,
}) => {
  console.log("Transactions ", transactions);
  const handleDeleteExpense = async (expenseId) => {
    console.log("Expense to delete =>", expenseId);

    await axios.delete(`http://localhost:3000/transaction/${expenseId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("Delete => ", transactions);
    const oldTransaction = [
      ...transactions.filter((e) => e._id !== expenseId),
    ].map((e) => {
      return {
        ...e,
        budgetId: {
          ...e.budgetId,
          amount:
            e.budgetId.amount +
            transactions.find((t) => t._id === expenseId).amount,
        },
      };
    });
    setTransactions(oldTransaction);
  };

  console.log("Données réelles des transactions:", transactions);

  const formatDate = (dateString) => {
    if (!dateString) {
      return "Date non disponible";
    }
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container">
      <h2 className="text-center">Dépenses</h2>
      <div className="d-flex justify-content-center flex-wrap">
        {transactions.length ? (
          transactions
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((expense) => {
              console.log("Date de la transaction:", expense.createdAt);
              return (
                <div key={expense._id} className="m-2">
                  <p>Date: {formatDate(expense.createdAt)}</p>
                  <ExpenseItem
                    transaction={expense}
                    handleDelete={() => handleDeleteExpense(expense._id)}
                  />
                </div>
              );
            })
        ) : (
          <p>Aucune dépense trouvée pour ce budget.</p>
        )}
      </div>
    </div>
  );
};

export default RecentExpenses;

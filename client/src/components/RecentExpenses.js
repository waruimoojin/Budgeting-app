import React from 'react';
import axios from 'axios';
import ExpenseItem from './ExpenseItem';

const RecentExpenses = ({ transactions, setTransactions }) => {
  const handleDeleteExpense = async (expenseId) => {
    console.log("Expense to delete =>", expenseId);
    try {
      await axios.delete(`http://localhost:3000/transaction/${expenseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTransactions(transactions.filter(e => e._id !== expenseId));
    } catch (error) {
      console.error('Erreur lors de la suppression de la dépense:', error);
    }
  };

  // Console log des données réelles
  console.log("Données réelles des transactions:", transactions);

  // Trie les transactions par date (la plus récente d'abord)
  // no need of slice it, if you want some chunk then use slice
  const sortedTransactions = transactions.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  // put these function in utils, this way you can re use this func many places
  // Fonction pour formater la date au format "jj/mm/aaaa"
  const formatDate = (dateString) => {
    if (!dateString) {
      return "Date non disponible";
    }
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <h2>Expenses</h2>
      {
        sortedTransactions.length ? sortedTransactions.map(expense => {
          console.log("Date de la transaction:", expense.createdAt); // Ajout du csorry mispelled
          return (
            <div key={expense._id}>
              <p>Date: {formatDate(expense.createdAt)}</p>
              <ExpenseItem transaction={expense} handleDelete={() => handleDeleteExpense(expense._id)} />
            </div>
          );
        }) : <></>
      }
    </div>
  );
};

export default RecentExpenses;

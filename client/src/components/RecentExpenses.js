import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseItem from './ExpenseItem';

const RecentExpenses = () => {
  const [recentExpenses, setRecentExpenses] = useState([]);

  useEffect(() => {
    fetchRecentExpenses();
  }, []);

  const fetchRecentExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/transactions', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setRecentExpenses(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des dépenses récentes:', error);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await axios.delete(`http://localhost:3000/transactions/${expenseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      await fetchRecentExpenses(); // Mettre à jour les dépenses après la suppression
    } catch (error) {
      console.error('Erreur lors de la suppression de la dépense:', error);
    }
  };



  return (
    <div>
      <h2>Recent Expenses</h2>
      {recentExpenses.map(expense => (
        <ExpenseItem key={expense._id} expense={expense} handleDelete={handleDeleteExpense} />
      ))}
    </div>
  );
};

export default RecentExpenses;

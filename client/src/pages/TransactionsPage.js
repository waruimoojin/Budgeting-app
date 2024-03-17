import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTransaction from '../components/AddTransactions';
import RecentExpenses from '../components/RecentExpenses';

const TransactionsPage = () => {
  
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Code pour charger les transactions récentes depuis le serveur...
  }, []);

  const handleDeleteExpense = async (expenseId) => {
    try {
      await axios.delete(`http://localhost:3000/transactions/${expenseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Mettre à jour la liste des transactions après la suppression
      setTransactions(transactions.filter(expense => expense._id !== expenseId));
    } catch (error) {
      console.error('Erreur lors de la suppression de la dépense:', error.response.data);
    }
  };

  return (
    <div>
      <h2>Page des Transactions</h2>
      <AddTransaction />
     
      {/* Ajout du composant RecentExpenses en lui passant la fonction de suppression */}
      
      <RecentExpenses onDeleteExpense={handleDeleteExpense} />
    </div>
  );
};

export default TransactionsPage;
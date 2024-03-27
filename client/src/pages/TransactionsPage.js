import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RecentExpenses from '../components/RecentExpenses';

const TransactionsPage = () => {
  const { budgetId } = useParams();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Code pour charger les transactions récentes depuis le serveur pour le budget sélectionné...
    axios.get(`http://localhost:3000/transaction?budgetId=${budgetId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(data => {
      setTransactions(data.data)
    })
  }, [budgetId]); 

  const handleDeleteExpense = async (expenseId) => {
    try {
      await axios.delete(`http://localhost:3000/transaction/${expenseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTransactions(transactions.filter(expense => expense._id !== expenseId));
    } catch (error) {
      console.error('Erreur lors de la suppression de la dépense:', error.response.data);
    }
  };
  
  return (
    <div>
      <h2>Page des Transactions</h2>
     

      <RecentExpenses onDeleteExpense={handleDeleteExpense} transactions={transactions} setTransactions={setTransactions} /> 
    </div>
  )
}; 

export default TransactionsPage;

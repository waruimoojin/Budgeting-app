import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecentExpenses from '../components/RecentExpenses';
import { useParams } from 'react-router-dom';
import AddTransaction from '../components/AddTransactions';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const { budgetId } = useParams();
  console.log(budgetId)

  useEffect(() => {
    if(budgetId){
    // Récupérer toutes les transactions
      axios.get(`http://localhost:3000/transaction?budgetId=${budgetId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).then(response => {
        
        console.log(response.data) 
        setTransactions(response.data) 
      }).catch(error => {
        console.error('Erreur lors de la récupération des transactions:', error);
      });
  }
  }, [budgetId]);

  return (
    <div>
      <h2>Page des Transactions</h2>
      <AddTransaction transactions={transactions} setTransactions={setTransactions} />
      <RecentExpenses transactions={transactions} setTransactions={setTransactions} />
    </div>
  );
};

export default TransactionsPage;

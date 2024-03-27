import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TransactionsPage = ({setTransactions, transactions}) => {

   // now test now 
  const navigate = useNavigate();
  // const [transactions, setTransactions] = useState([]);
  const [nouvelTransaction, setNouvelTransaction] = useState({
    name: '',
    amount: '',
    expenseid: ''
  });
  const [budgets, setBudgets] = useState([]);
  


  useEffect(() => {
    fetchBudgets();
    
  }, []);


  const fetchBudgets = () => {
    axios.get('http://localhost:3000/budget', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        const userBudgets = response.data.filter(budget => budget.userId === localStorage.getItem('userId'));
        setBudgets(userBudgets);
        
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des budgets:', error);
      });
  };
  


  const ajouterEntite = async () => {
    try {
      const transactionData = {
        ...nouvelTransaction,
        expenseid: nouvelTransaction.budgetId,
        userId: localStorage.getItem('userId') // Inclure l'ID de l'utilisateur
      };
  
      const transactionResponse = await axios.post('http://localhost:3000/transaction', transactionData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
          
        }
        
      });
      
      console.log('Transaction ajoutée avec succès:', transactionResponse.data);
      setTransactions([...transactions, transactionResponse.data]);
      navigate('/transactions');
    } catch (transactionError) {
      console.error('Erreur lors de l\'ajout de la transaction:', transactionError.response.data);
      console.log('Réponse du serveur:', transactionError.response);
    }
  };
  
  
  

  

  const handleInputChange = (e) => {
    setNouvelTransaction({
      ...nouvelTransaction,
      [e.target.name]: e.target.value,
    });
  };



  return (
    <div>
      <h2>Add new expense</h2>
      <div>
      
  <label>Expense name:
    <input type="text" name="name" onChange={handleInputChange} />
  </label>
  <label>Amount:
    <input type="text" name="amount" onChange={handleInputChange} />
  </label>
  <label>Category:
    <select name="budgetId" onChange={handleInputChange}>
      <option value="">Select Budget</option>
      {budgets.map(budget => (
        <option key={budget._id} value={budget._id}>{budget.name} - {budget.amount}</option>
      ))}
          </select>
        </label>
      </div>
      <button onClick={ajouterEntite}>Add Expense</button>

    

     
      
    </div>
  );
};

export default TransactionsPage;

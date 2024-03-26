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
  const [userBudgets, setUserBudgets] = useState([]);
  const [nouvelBudget, setNouvelBudget] = useState({  
    name: '',
    amount: ''
  });

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
        setUserBudgets(response.data);
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
      setNouvelTransaction({ name: '', amount: '', budgetId: '' });
      navigate('/transactions');
    } catch (transactionError) {
      console.error('Erreur lors de l\'ajout de la transaction:', transactionError.response.data);
      console.log('Réponse du serveur:', transactionError.response);
    }
  };
  
  
  

  const ajouterNouveauBudget = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const budgetData = {
        ...nouvelBudget,
        userId: userId
      };

      const budgetResponse = await axios.post('http://localhost:3000/budget', budgetData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log('Nouveau budget ajouté avec succès:', budgetResponse.data);
      fetchBudgets();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du nouveau budget:', error.response.data);
    }
  };

  const handleInputChange = (e) => {
    setNouvelTransaction({
      ...nouvelTransaction,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewBudgetChange = (e) => {
    setNouvelBudget({
      ...nouvelBudget,
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

      <h2>Add new budget</h2>
      <div>
        <label>Budget name:
          <input type="text" name="name" onChange={handleNewBudgetChange} />
        </label>
        <label>Amount:
          <input type="text" name="amount" onChange={handleNewBudgetChange} />
        </label>
      </div>
      <button onClick={ajouterNouveauBudget}>Add Budget</button>

      <h2>Existing Budgets</h2>
      <ul>
        {userBudgets.map(budget => (
          <div key={budget._id} style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
            <p>Name: {budget.name}</p>
            <p>Amount: {budget.amount}</p>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsPage;

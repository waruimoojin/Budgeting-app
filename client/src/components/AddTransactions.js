import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TransactionsPage = ({ setTransactions, transactions }) => {
  const navigate = useNavigate();
  const [nouvelTransaction, setNouvelTransaction] = useState({
    name: '',
    amount: '',
    budgetId: ''
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
        userId: localStorage.getItem('userId')
      };

      const transactionResponse = await axios.post('http://localhost:3000/transaction', transactionData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const budgetToUpdate = budgets.find(budget => budget._id === nouvelTransaction.budgetId);
      const newBudgetAmount = budgetToUpdate.amount - nouvelTransaction.amount;
      await axios.patch(`http://localhost:3000/budget/${nouvelTransaction.budgetId}`, { amount: newBudgetAmount }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        
      });
      console.log("New>>", newBudgetAmount)
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
    <div className="container mt-4">
      <h4 className="mb-3">Add new expense</h4>
      <div className="row">
        <div className="col-md-6">
          <label>Expense name:</label>
          <input type="text" name="name" className="form-control" onChange={handleInputChange} value={nouvelTransaction.name} />
        </div>
        <div className="col-md-6">
          <label>Amount:</label>
          <input type="text" name="amount" className="form-control" onChange={handleInputChange} value={nouvelTransaction.amount} />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <label>Category:</label>
          <select name="budgetId" className="form-control" onChange={handleInputChange} value={nouvelTransaction.budgetId}>
            <option value="">Select Budget</option>
            {budgets.map(budget => (
              <option key={budget._id} value={budget._id}>{budget.name} - {budget.amount}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <button className="btn btn-primary" onClick={ajouterEntite}>Add Expense</button>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;

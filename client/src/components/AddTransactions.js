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
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Add New Expense</h4>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Expense Name:</label>
                  <input type="text" id="name" name="name" className="form-control" onChange={handleInputChange} value={nouvelTransaction.name} />
                </div>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">Amount:</label>
                  <input type="text" id="amount" name="amount" className="form-control" onChange={handleInputChange} value={nouvelTransaction.amount} />
                </div>
                <div className="mb-3">
                  <label htmlFor="budget" className="form-label">Category:</label>
                  <select id="budget" name="budgetId" className="form-select" onChange={handleInputChange} value={nouvelTransaction.budgetId}>
                    <option value="">Select Budget</option>
                    {budgets.map(budget => (
                      <option key={budget._id} value={budget._id}>{budget.name} - {budget.amount}</option>
                    ))}
                  </select>
                </div>
                <div className="text-center">
                  <button type="button" className="btn btn-primary" onClick={ajouterEntite}>Add Expense</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;

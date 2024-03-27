import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function ExistingBudget() {
  const [budgets, setBudgets] = useState([]);
  const [newBudgetName, setNewBudgetName] = useState('');
  const [newBudgetAmount, setNewBudgetAmount] = useState('');
  const [showAddBudgetForm, setShowAddBudgetForm] = useState(false); // State to track whether to show add budget form
  const navigate = useNavigate();

  const fetchBudgets = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/budget', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setBudgets(response.data);
      } else {
        console.error('Failed to fetch budgets:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch budgets:', error);
    }
  }, []);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  const handleBudgetClick = (budgetId) => {
    navigate(`/transactions/${budgetId}`);
  };

  const handleDeleteBudget = async (budgetId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:3000/budget/${budgetId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        // Filter out the deleted budget from the list of budgets
        setBudgets(budgets.filter(budget => budget._id !== budgetId));
      } else {
        console.error('Failed to delete budget:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to delete budget:', error);
    }
  
  
  };

  const handleAddBudget = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/budget',
        { name: newBudgetName, amount: newBudgetAmount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        setNewBudgetName('');
        setNewBudgetAmount('');
        setShowAddBudgetForm(false); // Hide the add budget form after successfully adding a budget
        fetchBudgets(); // Fetch budgets again to display the newly added budget
      } else {
        console.error('Failed to add budget:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to add budget:', error);
    }
  };

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
        <div className="col text-end">
          <button className="btn btn-primary" onClick={() => setShowAddBudgetForm(!showAddBudgetForm)}>
            {showAddBudgetForm ? 'Hide Add Budget Form' : 'Add New Budget'}
          </button>
        </div>
      </div>
      {showAddBudgetForm && (
        <div className="row mb-4">
          <div className="col">
            <h2>Add New Budget</h2>
            <form onSubmit={handleAddBudget}>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="e.g. Groceries"
                  className="form-control"
                  value={newBudgetName}
                  onChange={(e) => setNewBudgetName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="e.g. 500 DH"
                  className="form-control"
                  value={newBudgetAmount}
                  onChange={(e) => setNewBudgetAmount(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add Budget
              </button>
            </form>
          </div>
        </div>
      )}
      <h2>Existing Budgets</h2>
      <div className="row">
        {budgets.map((budget) => (
          <div key={budget._id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{budget.name}</h5>
                <p className="card-text">Amount: {budget.amount}</p>
                <div className="progress mb-3">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${(budget.amount / 1000) * 100}%` }}
                    aria-valuenow={(budget.amount / 1000) * 100}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleBudgetClick(budget._id)}
                >
                  View Transactions
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteBudget(budget._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExistingBudget;

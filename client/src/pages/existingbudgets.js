import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function ExistingBudget() {
  const [budgets, setBudgets] = useState([]);
  const [newBudgetName, setNewBudgetName] = useState("");
  const [newBudgetAmount, setNewBudgetAmount] = useState("");
  const [showAddBudgetForm, setShowAddBudgetForm] = useState(false);
  const navigate = useNavigate();

  const fetchBudgets = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/budget", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setBudgets(response.data);
      } else {
        console.error("Failed to fetch budgets:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to fetch budgets:", error);
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
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:3000/budget/${budgetId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        setBudgets(budgets.filter((budget) => budget._id !== budgetId));
      } else {
        console.error("Failed to delete budget:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to delete budget:", error);
    }
  };

  const handleAddBudget = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/budget",
        {
          name: newBudgetName,
          origionalAmount: newBudgetAmount,
          amount: newBudgetAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 201) {
        setNewBudgetName("");
        setNewBudgetAmount("");
        setShowAddBudgetForm(false);
        fetchBudgets();
      } else {
        console.error("Failed to add budget:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to add budget:", error);
    }
  };

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Retour
          </button>
        </div>
        <div className="col text-end">
          <button
            className="btn btn-primary"
            onClick={() => setShowAddBudgetForm(!showAddBudgetForm)}
          >
            {showAddBudgetForm ? "Masquer le formulaire" : "Ajouter un nouveau budget"}
          </button>
        </div>
      </div>
      {showAddBudgetForm && (
        <div className="row mb-4">
          <div className="col">
            <div className="card">
              <h5 className="card-header">Ajouter un nouveau budget</h5>
              <div className="card-body">
                <form onSubmit={handleAddBudget}>
                  <div className="mb-3">
                    <label htmlFor="budgetName" className="form-label">
                      Nom du budget
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="budgetName"
                      value={newBudgetName}
                      onChange={(e) => setNewBudgetName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="budgetAmount" className="form-label">
                      Montant budgétaire
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="budgetAmount"
                      value={newBudgetAmount}
                      onChange={(e) => setNewBudgetAmount(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Ajouter un budget
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <h2>Budgets existants</h2>
      <div className="row">
        {budgets.map((budget) => (
          <div key={budget._id} className="col-md-4 mb-4">
            <div className="card border-custom shadow ">
              <div className="card-body">
                <h5 className="card-title">{budget.name}</h5>
                <p className="card-text">
                  Budget total: {budget.origionalAmount}
                </p>
                <p className="card-text">Montant restant: {budget.amount}</p>
                <div className="progress mb-3">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{
                      width: `${(budget.amount / budget.origionalAmount) * 100}%`,
                    }}
                    aria-valuenow={
                      (budget.amount / budget.origionalAmount) * 100
                    }
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleBudgetClick(budget._id)}
                >
                  Afficher les transactions
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteBudget(budget._id)}
                >
                  Supprimer
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

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BudgetPage from './pages/BudgetPage';
import TransactionsPage from './pages/TransactionsPage';
import Login from './components/Login';
import Register from './components/Register';
import ExistingBudget from './pages/existingbudgets';
import AddTransaction from './components/AddTransactions';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté lors du chargement initial de l'application
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Code pour déconnecter l'utilisateur, par exemple, effacer le jeton JWT du stockage local
    localStorage.removeItem('token');
    // Mettre à jour l'état de connexion
    setIsLoggedIn(false);
    // Rediriger l'utilisateur vers la page de connexion
    window.location.href = '/login';
  };

  return (
    <Router>
      {/* Condition pour afficher la barre de navigation si l'utilisateur est connecté */}
      {isLoggedIn && (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="#">Gestion du Budget</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/transactions">Transactions</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/existingbudgets">Budget</Link>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <button className="btn btn-outline-danger" onClick={handleLogout}>Déconnexion</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/existingbudgets" element={<ExistingBudget />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/transactions/:budgetId" element={<TransactionsPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/addtransaction/:budgetId" element={<AddTransaction />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import BudgetPage from './pages/BudgetPage';
import TransactionsPage from './pages/TransactionsPage';
import Login from './components/Login';
import Register from './components/Register';
import ExistingBudget from './pages/existingbudgets';
import AddTransaction from './components/AddTransactions';
import Auth from './Auth/Auth';

export const AuthContext = createContext();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in on initial app load
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Code to logout the user
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    // Use navigate to redirect to login page
    navigate('/login');
  };

  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
      
            <Route path='/existingbudgets' element={<Auth><ExistingBudget /></Auth>} />
            <Route path="/budget" element={<Auth><BudgetPage /></Auth>} />
            <Route path="/:budgetId" element={<Auth><TransactionsPage /></Auth>} />
            <Route path="/transactions/:budgetId" element={<Auth><TransactionsPage /></Auth>}/>
            <Route path="/transactions" element={<Auth><TransactionsPage /></Auth>} />
            <Route path="/addtransaction/:budgetId" element={<Auth><AddTransaction /></Auth>} />
        
          </Routes>
        </div>
      </AuthContext.Provider>
    </>
  );
};

export default App;

// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import BudgetPage from './pages/BudgetPage';
import TransactionsPage from './pages/TransactionsPage';
import Login from './components/Login';
import Register from './components/Register';


const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
      
      </Routes>
    </Router>
  );
};

export default App;


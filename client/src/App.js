// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import BudgetPage from './pages/BudgetPage';
import TransactionsPage from './pages/TransactionsPage';
import Login from './components/Login';
import Register from './components/Register';
import ExistingBudget from './pages/existingbudgets';
import AddTransaction from './components/AddTransactions';



const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/existingbudgets" element={<ExistingBudget />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/transactions/:budgetId" element={<TransactionsPage />} />
        <Route path="/addtransaction/:budgetId" element={<AddTransaction />} />
      
      </Routes>
    </Router>
  );
};

export default App;


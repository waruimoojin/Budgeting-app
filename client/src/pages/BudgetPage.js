import React from 'react';
import AddBudget from '../components/AddBudget';
import { useNavigate } from 'react-router-dom';


const BudgetPage = () => {
  const navigate = useNavigate();
  
  const ajouterEntite = () => {
    // Logique pour ajouter un utilisateur
    // ...

    // Redirection vers la page du budget après l'ajout de l'utilisateur
    navigate('/transactions');
  };

  return (
    <div>
    
      <AddBudget onAddBudget={ajouterEntite} />
    </div>
  );
};


export default BudgetPage;
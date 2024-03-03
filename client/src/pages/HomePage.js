// HomePage.js
import React from 'react';
import AddUser from '../components/AddUser';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  
  const handleAddUser = () => {
    // Logique pour ajouter un utilisateur
    // ...

    // Redirection vers la page du budget après l'ajout de l'utilisateur
    navigate('/budget');
  };

  return (
    <div>
      <h2>Page d'accueil</h2>
      <AddUser onAddUser={handleAddUser} />
    </div>
  );
};

export default HomePage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';





const AddBudget = () => {
  const navigate = useNavigate();

  const [budget, setbudget] = useState([]);
  const [nouvelbudget, setNouvelbudget] = useState({
    name: '',
    idbudget: ''
    // Ajoutez d'autres champs en fonction de votre modèle
  });

  useEffect(() => {
    axios.get('http://localhost:3000/budget')
      .then(response => {
        setbudget(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      });
  }, []);
  
  const ajouterEntite = () => {
    axios.post('http://localhost:3000/budget', nouvelbudget)
      .then(budgetResponse => {
        console.log('Catégorie ajoutée avec succès:', budgetResponse.data);
        // Rafraîchit la liste des catégories
        setbudget([...budget, budgetResponse.data]);
        navigate('/transactions')
      })
      
      .catch(budgetError => {
        console.error('Erreur lors de l\'ajout de la catégorie:', budgetError.response.data);
        console.log('Réponse du serveur:', budgetError.response);
      });
  };

  const handleInputChange = (e) => {
    setNouvelbudget({
      ...nouvelbudget,
      [e.target.name]: e.target.value,
    });

    
  };
  
  return (
    <div>
      {/* ... (votre code existant) */}

      <h2>Ajouter une Entité</h2>
      <div>

      </div>

      <h2>Ajouter un budget</h2>
      <div>
        <label>Nom budget:
          <input type="text" name="name" onChange={handleInputChange} />
        </label>
        <label>Montant:
          <input type="text" name="amount" onChange={handleInputChange} />
        </label>
      </div>

      <button onClick={ajouterEntite}>Ajouter Entité</button>
    </div>
  );
};

export default AddBudget;

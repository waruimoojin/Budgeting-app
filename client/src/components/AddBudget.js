// AddBudget.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBudget = () => {
  const navigate = useNavigate();
  
  const fetchBudgets = useCallback(() => {
    const token = localStorage.getItem('token'); // Récupérer le token localement
    axios.get('http://localhost:3000/budget', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setBudget(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des budgets:', error);
      });
  }, []);

  const [budget, setBudget] = useState([]);
  const [nouvelBudget, setNouvelBudget] = useState({
    name: '',
    amount: '',
    userId: ''
  });
  
  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);
  
  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Récupérer l'ID de l'utilisateur localement
    if (userId) { // Vérifier si l'ID de l'utilisateur est défini et non vide
      setNouvelBudget(prevState => ({
        ...prevState,
        userId: userId
      }));
    }
  }, []);

  const ajouterBudget = () => {
    const token = localStorage.getItem('token'); // Récupérer le token localement
    const newBudget = {
      ...nouvelBudget
    };

    axios.post('http://localhost:3000/budget', newBudget, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(budgetResponse => {
        console.log('Budget ajouté avec succès:', budgetResponse.data);
        setBudget([...budget, budgetResponse.data]);
        navigate('/transactions');
      })
      .catch(budgetError => {
        console.error('Erreur lors de l\'ajout du budget:', budgetError.response.data);
        console.log('Réponse du serveur:', budgetError.response);
      });
  };

  const handleInputChange = (e) => {
    setNouvelBudget({
      ...nouvelBudget,
      [e.target.name]: e.target.value,
    });
  };

  console.log(nouvelBudget);

  return (
    <div>
      <h2>Ajouter un budget</h2>
      <div>
        <label>Nom du budget:
          <input type="text" name="name" onChange={handleInputChange} />
        </label>
        <label>Montant:
          <input type="number" name="amount" onChange={handleInputChange} />
        </label>
      </div>

      <button onClick={ajouterBudget}>Ajouter Budget</button>
    </div>
  );
};

export default AddBudget;

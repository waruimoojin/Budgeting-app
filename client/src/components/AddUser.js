import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const navigate = useNavigate();

  const [nouvelUtilisateur, setNouvelUtilisateur] = useState({
    nom: ''
    // Ajoutez d'autres champs en fonction de votre modèle
  });

  useEffect(() => {
    // Effectue une requête GET pour récupérer tous les utilisateurs
    axios.get('http://localhost:3000/users')
      .then(response => {
        // ... (traitement des données si nécessaire)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    setNouvelUtilisateur({
      ...nouvelUtilisateur,
      [e.target.name]: e.target.value,
    });
  };

  const ajouterEntite = () => {
    // Effectue une requête POST pour ajouter un nouvel utilisateur
    axios.post('http://localhost:3000/users', nouvelUtilisateur)
      .then(response => {
        console.log('Entité ajoutée avec succès:', response.data);
        // Rafraîchit la liste des utilisateurs
        // ...

        // Redirection vers la page souhaitée (remplacez '/budget' par votre chemin désiré)
        navigate('/budget');
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout de l\'entité:', error);
      });
  };

  return (
    <div>
      <h2>Ajouter une Entité</h2>
      <div>
        <label>Nom Utilisateur:
          <input type="text" name="nom" onChange={handleInputChange} />
        </label>
      </div>
      <button onClick={ajouterEntite}>Ajouter Entité</button>
    </div>
  );
};

export default AddUser;

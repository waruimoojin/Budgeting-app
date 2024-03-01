import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [nouvelUtilisateur, setNouvelUtilisateur] = useState({
    nom: ''
   
    // Ajoutez d'autres champs en fonction de votre modèle
  });

  useEffect(() => {
    // Effectue une requête GET pour récupérer tous les utilisateurs
    axios.get('http://localhost:3000/users')
      .then(response => {
        setUtilisateurs(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        
      });
  }, []); // Vide le tableau de dépendances pour s'assurer que cela ne se produit qu'une fois lors du montage du composant

  const handleInputChange = (e) => {
    setNouvelUtilisateur({
      ...nouvelUtilisateur,
      [e.target.name]: e.target.value,
    });
  };

  const ajouterUtilisateur = () => {
    // Effectue une requête POST pour ajouter un nouvel utilisateur
    axios.post('http://localhost:3000/users', nouvelUtilisateur)
      .then(response => {
        console.log('Utilisateur ajouté avec succès:', response.data);
        // Rafraîchit la liste des utilisateurs
        setUtilisateurs([...utilisateurs, response.data]);
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error.response.data );
        console.log('Réponse du serveur:', error.response);
      });
  };

  return (
    <div>
      <h1>Liste des Utilisateurs</h1>
      <ul>
        {utilisateurs.map(utilisateur => (
          <li key={utilisateur._id}>{utilisateur.nom}</li>
        ))}
      </ul>

      <h2>Ajouter un Utilisateur</h2>
      <div>
        <label>Nom:
          <input type="text" name="nom" onChange={handleInputChange} />
        </label>
      </div>
    
      <button onClick={ajouterUtilisateur}>Ajouter Utilisateur</button>
    </div>
  );
        };

export default App;

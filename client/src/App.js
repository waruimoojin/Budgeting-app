import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [nouvelUtilisateur, setNouvelUtilisateur] = useState({
    nom: ''
   
    // Ajoutez d'autres champs en fonction de votre modèle
  });

  const [category, setCategory] = useState([]);
  const [nouvelCategory, setNouvelCategory] = useState({
    name: '',
    idcategory: ''
    // Ajoutez d'autres champs en fonction de votre modèle
  });


  const [transactions, setTransactions] = useState([]);
  const [nouvelTransaction, setNouvelTransaction] = useState({
    usersid: '',
    amount: '',
    type: '',
    idtransaction: ''
   
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
      axios.get('http://localhost:3000/category')
      .then(response => {
       
        setCategory(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        
      });
      axios.get('http://localhost:3000/transactions')
      .then(response => {
       
        setTransactions(response.data);
        
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
    setNouvelCategory({
      ...nouvelCategory,
      [e.target.name]: e.target.value,
    });
    setNouvelTransaction({
      ...nouvelTransaction,
      [e.target.name]: e.target.value,
    });
  };

  const ajouterEntite = () => {
    // Effectue une requête POST pour ajouter un nouvel utilisateur
    axios.post('http://localhost:3000/users', nouvelUtilisateur)
      .then(response => {
        console.log('Entité ajoutée avec succès:', response.data);
        // Rafraîchit la liste des utilisateurs
        setUtilisateurs([...utilisateurs, response.data]);

        // Ajoute une nouvelle catégorie
        axios.post('http://localhost:3000/category', nouvelCategory)
          .then(categoryResponse => {
            console.log('Catégorie ajoutée avec succès:', categoryResponse.data);
            // Rafraîchit la liste des catégories
            setCategory([...category, categoryResponse.data]);
          })
          .catch(categoryError => {
            console.error('Erreur lors de l\'ajout de la catégorie:', categoryError.response.data);
            console.log('Réponse du serveur:', categoryError.response);
          });

        // Ajoute une nouvelle transaction
        axios.post('http://localhost:3000/transactions', nouvelTransaction)
          .then(transactionResponse => {
            console.log('Transaction ajoutée avec succès:', transactionResponse.data);
            // Rafraîchit la liste des transactions
            setTransactions([...transactions, transactionResponse.data]);
          })
          .catch(transactionError => {
            console.error('Erreur lors de l\'ajout de la transaction:', transactionError.response.data);
            console.log('Réponse du serveur:', transactionError.response);
          });
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout de l\'entité:', error.response.data);
        console.log('Réponse du serveur:', error.response);
      });
  };

  return (
    <div>
    {/* ... (votre code existant) */}

    <h2>Ajouter une Entité</h2>
    <div>
      <label>Nom Utilisateur:
        <input type="text" name="nom" onChange={handleInputChange} />
      </label>
    </div>

    <h2>Ajouter une Catégorie</h2>
    <div>
      <label>Nom Catégorie:
        <input type="text" name="name" onChange={handleInputChange} />
      </label>
      <label>ID Catégorie:
        <input type="text" name="idcategory" onChange={handleInputChange} />
      </label>
    </div>

    <h2>Ajouter une Transaction</h2>
    <div>
      <label>ID Utilisateur:
        <input type="text" name="usersid" onChange={handleInputChange} />
      </label>
      <label>Montant:
        <input type="text" name="amount" onChange={handleInputChange} />
      </label>
      <label>Type:
        <input type="text" name="type" onChange={handleInputChange} />
      </label>
      <label>ID Transaction:
        <input type="text" name="idtransaction" onChange={handleInputChange} />
      </label>
    </div>

    <button onClick={ajouterEntite}>Ajouter Entité</button>
  </div>
);
};

export default App;

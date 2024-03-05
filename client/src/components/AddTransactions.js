import React, { useState, useEffect } from 'react';
import axios from 'axios';



const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [nouvelTransaction, setNouvelTransaction] = useState({
    usersid: '',
    amount: '',
    type: '',
    idtransaction: ''
    // Ajoutez d'autres champs en fonction de votre modèle
  });

  useEffect(() => {
    axios.get('http://localhost:3000/transactions')
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      });
  }, []);

  const ajouterEntite = () => {
    axios.post('http://localhost:3000/transactions', nouvelTransaction)
      .then(transactionResponse => {
        console.log('Transaction ajoutée avec succès:', transactionResponse.data);
        // Rafraîchit la liste des transactions
        setTransactions([...transactions, transactionResponse.data]);
            // Redirection vers la page souhaitée (remplacez '/budget' par votre chemin désiré)
           
      })
      .catch(transactionError => {
        console.error('Erreur lors de l\'ajout de la transaction:', transactionError.response.data);
        console.log('Réponse du serveur:', transactionError.response);
      });
  }; // <-- Semicolon instead of a comma

  const handleInputChange = (e) => {
    setNouvelTransaction({
      ...nouvelTransaction,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {/* ... (votre code existant) */}

      <h2>Ajouter une Entité</h2>

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

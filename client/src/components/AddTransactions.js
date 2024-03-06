import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const App = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [nouvelTransaction, setNouvelTransaction] = useState({
    name: '',
    amount: ''
 
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
            navigate('/transactions');
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

     

      <h2>Add new expense</h2>
      <div>
        <label>Expense name:
          <input type="text" name="name" onChange={handleInputChange} />
        </label>
        <label>Amount:
          <input type="text" name="amount" onChange={handleInputChange} />
        </label>
       
        
      </div>

      <button onClick={ajouterEntite}>Ajouter Entité</button>
    </div>
  );
};

export default App;

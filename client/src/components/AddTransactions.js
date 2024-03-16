import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [nouvelTransaction, setNouvelTransaction] = useState({
    name: '',
    amount: ''
  });
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    // Récupérer les transactions
    axios.get('http://localhost:3000/transactions', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Ajouter le token JWT dans l'en-tête
      }
    })
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des transactions:', error);
      });

    // Récupérer les budgets de l'utilisateur connecté
    axios.get('http://localhost:3000/budget', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Ajouter le token JWT dans l'en-tête
      }
    })
      .then(response => {
        // Filtrer les budgets pour ne récupérer que ceux de l'utilisateur connecté
        const userBudgets = response.data.filter(budget => budget.userId === localStorage.getItem('userId'));
        setBudgets(userBudgets);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des budgets:', error);
      });
  }, []);

  const ajouterEntite = () => {
    axios.post('http://localhost:3000/transactions', nouvelTransaction, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Ajouter le token JWT dans l'en-tête
      }
    })
      .then(transactionResponse => {
        console.log('Transaction ajoutée avec succès:', transactionResponse.data);
        // Rafraîchit la liste des transactions
        setTransactions([...transactions, transactionResponse.data]);
        navigate('/transactions'); // Redirection vers la page des transactions
      })
      .catch(transactionError => {
        console.error('Erreur lors de l\'ajout de la transaction:', transactionError.response.data);
        console.log('Réponse du serveur:', transactionError.response);
      });
  };

  const handleInputChange = (e) => {
    setNouvelTransaction({
      ...nouvelTransaction,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Add new expense</h2>
      <div>
        <label>Expense name:
          <input type="text" name="name" onChange={handleInputChange} />
        </label>
        <label>Amount:
          <input type="text" name="amount" onChange={handleInputChange} />
        </label>
      </div>
      <button onClick={ajouterEntite}>Add Expense</button>

      {/* Afficher les budgets */}
      <h2>Budgets</h2>
      <ul>
        {budgets.map(budget => (
          <li key={budget._id}>{budget.name}: {budget.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;

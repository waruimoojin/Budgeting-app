import React, { useState } from 'react';
import axios from 'axios';

const AddTransactionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/transactions', formData);
      // Réinitialiser le formulaire après l'envoi réussi
      setFormData({
        name: '',
        amount: '',
        category: ''
      });
      alert('Transaction ajoutée avec succès!');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la transaction:', error);
      alert('Erreur lors de l\'ajout de la transaction. Veuillez réessayer.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Amount:
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} />
      </label>
      <label>
        Category:
        <input type="text" name="category" value={formData.category} onChange={handleChange} />
      </label>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default AddTransactionForm;

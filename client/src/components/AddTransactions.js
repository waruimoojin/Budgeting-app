// AddTransaction.js
import React, { useState } from 'react';

const AddTransaction = ({ onAddTransaction }) => {
  const [usersid, setUsersId] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [idtransaction, setIdTransaction] = useState('');

  const handleAddTransaction = () => {
    onAddTransaction({ usersid, amount, type, idtransaction });
  };

  return (
    <div>
      <h2>Ajouter une Transaction</h2>
      <div>
        <label>ID Utilisateur:
          <input type="text" value={usersid} onChange={(e) => setUsersId(e.target.value)} />
        </label>
        <label>Montant:
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <label>Type:
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
        </label>
        <label>ID Transaction:
          <input type="text" value={idtransaction} onChange={(e) => setIdTransaction(e.target.value)} />
        </label>
      </div>
      <button onClick={handleAddTransaction}>Ajouter Transaction</button>
    </div>
  );
};

export default AddTransaction;

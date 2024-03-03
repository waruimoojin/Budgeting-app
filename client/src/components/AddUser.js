// ./src/components/AddUser.js
import React, { useState } from 'react';

const AddUser = ({ onAddUser }) => {
  const [nom, setNom] = useState('');

  const handleAddUser = () => {
    onAddUser({ nom });
    


    
  };

  

  return (
    <div>
      <h2>Ajouter un Utilisateur</h2>
      <div>
        <label>Nom Utilisateur:
          <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
        </label>
      </div>
      <button onClick={handleAddUser}>Ajouter Utilisateur</button>
    </div>
  );
};

export default AddUser;

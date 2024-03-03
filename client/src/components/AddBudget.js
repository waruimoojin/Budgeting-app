// AddCategory.js
import React, { useState } from 'react';

const AddCategory = ({ onAddCategory }) => {
  const [name, setName] = useState('');
  const [idcategory, setIdCategory] = useState('');

  const handleAddCategory = () => {
    onAddCategory({ name, idcategory });
  };

  return (
    <div>
      <h2>Ajouter une Catégorie</h2>
      <div>
        <label>Nom Catégorie:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>ID Catégorie:
          <input type="text" value={idcategory} onChange={(e) => setIdCategory(e.target.value)} />
        </label>
      </div>
      <button onClick={handleAddCategory}>Ajouter Catégorie</button>
    </div>
  );
};

export default AddCategory;

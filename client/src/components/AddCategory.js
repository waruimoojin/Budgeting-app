import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [category, setCategory] = useState([]);
  const [nouvelCategory, setNouvelCategory] = useState({
    name: '',
    idcategory: ''

  });

  useEffect(() => {
    axios.get('http://localhost:3000/category')
      .then(response => {
        setCategory(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      });
  }, []);

  const ajouterEntite = () => {
    axios.post('http://localhost:3000/category', nouvelCategory)
      .then(categoryResponse => {
        console.log('Catégorie ajoutée avec succès:', categoryResponse.data);

        setCategory([...category, categoryResponse.data]);
      })
      .catch(categoryError => {
        console.error('Erreur lors de l\'ajout de la catégorie:', categoryError.response.data);
        console.log('Réponse du serveur:', categoryError.response);
      });
  };

  const handleInputChange = (e) => {
    setNouvelCategory({
      ...nouvelCategory,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {}

      <h2>Ajouter une Entité</h2>
      <div>

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

      <button onClick={ajouterEntite}>Ajouter Entité</button>
    </div>
  );
};

export default App;

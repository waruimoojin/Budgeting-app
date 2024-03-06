import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const navigate = useNavigate();

  const [nouvelUtilisateur, setNouvelUtilisateur] = useState({
    nom: ''
    // Add other fields based on your model
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        
        // Handle data if needed
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    setNouvelUtilisateur((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const ajouterEntite = async () => {
    try {
      // Use async/await for cleaner asynchronous code
      const response = await axios.post('http://localhost:3000/users', nouvelUtilisateur);
      console.log('Entity added successfully:', response.data);
      // Refresh the list of users
      // ...

      // Redirect to the desired page (replace '/budget' with your desired path)
      navigate('/budget');
    } catch (error) {
      console.error('Error adding entity:', error);
    }
  };

  return (
    <div>
      <h2>Ajouter une Entité</h2>
      <div>
        <label>
          Nom Utilisateur:
          <input type="text" name="nom" value={nouvelUtilisateur.nom} onChange={handleInputChange} />
        </label>
      </div>
      <button onClick={ajouterEntite}>Ajouter Entité</button>
    </div>
  );
};

export default AddUser;

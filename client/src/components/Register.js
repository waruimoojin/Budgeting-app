import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importez la feuille de style Bootstrap
import loginImage from './pngegg.png';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('User registered successfully:', data);
        navigate('/login'); // Redirect to the login page after registration
      } else {
        console.error('Registration failed:', data.message);
        // Handle registration failure (e.g., display error message)
      }
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration failure (e.g., display error message)
    }
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-between" style={{ minHeight: '100vh' }}>
      <div className="row justify-content-center align-items-center flex-grow-1">
        <div className="col-lg-5"> {/* Réduire la largeur de la colonne */}
          <div className="register-container" style={{ maxWidth: '400px' }}> {/* Ajouter une largeur maximale */}
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Register</button>
            </form>
          </div>
        </div>
        <div className="col-lg-7 d-flex justify-content-end order-lg-1 mt-4"> {/* Ajout de la classe mt-4 pour ajouter une marge en haut */}
          <div className="image-container" style={{ marginRight: '20px' }}>
            <img src={loginImage} alt="Register" className="img-fluid" style={{ width: '80%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

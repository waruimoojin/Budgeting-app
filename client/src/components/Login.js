import React, { useState } from 'react';
import { useNavigate ,Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importez la feuille de style Bootstrap
import loginImage from './pngegg.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      if(!response.ok){
        alert(response.message)
        return;
        
      }
      
      if (response.ok) { 
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        
      } else {
        alert('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
    navigate('/budget');
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-between" style={{ minHeight: '100vh' }}>
      <div className="row justify-content-center align-items-center flex-grow-1">
        <div className="col-lg-6 text-start">
          <div className="login-container" style={{ maxWidth: '400px' }}>
            <h2>Login</h2>
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
              <button type="submit" className="btn btn-primary">Login</button>
              
            </form>
            <p className="mt-3">Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </div>
        </div>
        <div className="col-lg-6 d-flex justify-content-end order-lg-1 mt-4">
          <div className="image-container" style={{ marginRight: '20px' }}>
            <img src={loginImage} alt="Login" className="img-fluid" style={{ width: '90%'}} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
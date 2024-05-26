import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import loginImage from "./pngegg.png";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Utilisateur enregistre avec succès:", data);
        navigate("/login");
      } else {
        console.error("Échec de l'enregistrement:", data.message);
      }
    } catch (error) {
      console.error("Échec de l'enregistrement:", error);
    }
  };

  return (
    <div
      className="container-fluid d-flex flex-column justify-content-between"
      style={{ minHeight: "100vh" }}
    >
      <div className="row justify-content-center align-items-center flex-grow-1">
        <div className="col-lg-5">
          {" "}
          {}
          <div className="register-container" style={{ maxWidth: "400px" }}>
            {" "}
            {}
            <h2>S'inscrire</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Entrer votre Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Entrer votre Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                S'inscrire
              </button>
            </form>
          </div>
        </div>
        <div className="col-lg-7 d-flex justify-content-end order-lg-1 mt-4">
          {" "}
          {}
          <div className="image-container" style={{ marginRight: "20px" }}>
            <img
              src={loginImage}
              alt="Register"
              className="img-fluid"
              style={{ width: "80%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

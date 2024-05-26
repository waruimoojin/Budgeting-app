import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import budgetImage from "./pngegg2.png";
const AddBudget = () => {
  const navigate = useNavigate();

  const fetchBudgets = useCallback(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/budget", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setBudget(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des budgets:", error);
      });
  }, []);

  const [budget, setBudget] = useState([]);
  const [nouvelBudget, setNouvelBudget] = useState({
    name: "",
    amount: "",
    userId: "",
  });

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  const ajouterBudget = () => {
    const token = localStorage.getItem("token");
    const newBudget = {
      ...nouvelBudget,
    };

    axios
      .post("http://localhost:3000/budget", newBudget, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((budgetResponse) => {
        console.log("Budget ajouté avec succès:", budgetResponse.data);
        setBudget([...budget, budgetResponse.data]);
        navigate("/transactions");
      })
      .catch((budgetError) => {
        console.error(
          "Erreur lors de l'ajout du budget:",
          budgetError.response.data,
        );
        console.log("Réponse du serveur:", budgetError.response);
      });
  };

  const handleInputChange = (e) => {
    setNouvelBudget({
      ...nouvelBudget,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="row">
        <div className="col-md-6">
          <h1 className="display-1 fw-bold">Bienvenue</h1>
          <p className="display-6 ">
            La budgétisation personnelle est le secret de la liberté financière.
            Créez un budget pour commencer !
          </p>
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Créer un budget</h3>
              <div className="mb-3 row">
                <label htmlFor="name" className="col-sm-2 col-form-label">
                  Nom du budget:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="e.g. Épiceries"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="amount" className="col-sm-2 col-form-label">
                  Montant:
                </label>
                <div className="col-sm-10">
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    name="amount"
                    placeholder="e.g. 500 DH"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <button className="btn btn-primary" onClick={ajouterBudget}>
                Créer un budget
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <img
            src={budgetImage}
            alt="Budget dImage"
            className="img-fluid"
            style={{ width: "90%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddBudget;

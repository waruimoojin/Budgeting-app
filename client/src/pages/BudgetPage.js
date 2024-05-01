import React from "react";
import AddBudget from "../components/AddBudget";
import { useNavigate } from "react-router-dom";

const BudgetPage = () => {
  const navigate = useNavigate();

  const ajouterEntite = () => {
    navigate("/transactions");
  };

  return (
    <div>
      <AddBudget onAddBudget={ajouterEntite} />
    </div>
  );
};

export default BudgetPage;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("utilisateur")) {
      navigate("/connexion");
    }
  });

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;

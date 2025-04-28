import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ text, className }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/logout/", {
        method: "POST",
        credentials: "include", // Si vous utilisez des cookies pour la session
      });

      if (response.ok) {
        console.log("Déconnexion réussie !");
        
        // Suppression des tokens du localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // Rediriger immédiatement vers la page de login
        navigate("/login");
      } else {
        console.error("Erreur lors de la déconnexion.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  return (
    <button onClick={handleLogout} className={`${className}`}>
      {text}
    </button>
  );
};

export default LogoutButton;

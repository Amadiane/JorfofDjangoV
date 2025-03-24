import React from "react";
import { useNavigate } from "react-router-dom";

const Logoutbutton = ({ text, className }) => {
  const navigate = useNavigate(); // Permet de rediriger l'utilisateur

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/logout/", {
        method: "POST",  // Méthode POST pour la déconnexion
        credentials: "include",  // Garde les cookies de session
      });

      if (response.ok) {
        console.log("Déconnexion réussie !");
        localStorage.removeItem("token"); // Supprimer le token si utilisé
        navigate("/login"); // Rediriger vers la page de connexion
      } else {
        console.error("Erreur lors de la déconnexion.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  return (
    <button onClick={handleLogout} className={` ${className}`}>
      {text}
    </button>
  );
};

export default Logoutbutton;

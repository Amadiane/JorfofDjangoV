import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Pour la redirection
import ChatBot from '../ChatBot/ChatBot'; // Chemin d'importation du chatbot

const NotreEquipe = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Pour la redirection si nécessaire

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté avant de récupérer le message
    if (!localStorage.getItem('accessToken')) {
      navigate('/login'); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      return;
    }

    const fetchMessage = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/team-message/');
        if (!response.ok) {
          throw new Error(`Erreur HTTP! statut: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.length > 0) {
          // Trier les messages par date (si l'API renvoie des timestamps ou une date)
          const sortedMessages = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          
          // Récupérer uniquement le dernier message (le plus récent)
          setMessage(sortedMessages[0].content); 
        } else {
          setMessage("Aucun message disponible pour l'instant.");
        }
      } catch (error) {
        setError(error.message); // Gestion des erreurs
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchMessage(); // Appeler la fonction pour récupérer le message
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ChatBot /> {/* Affichage du chatbot */}

      <section className="text-gray-600 body-font overflow-hidden w-full px-4 sm:px-6 lg:px-8">
        <div className="container pb-32 pt-16 mx-auto">
          <div className="main-bl pb-10">
            <div className="bg-white p-8 sm:p-10 rounded-lg shadow-lg max-w-5xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 sm:mb-8">ÉQUIPE FONDATION TAMKINE</h2>
              <p className="text-base sm:text-xl text-gray-700 text-justify whitespace-pre-line">{message}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotreEquipe;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import ChatBot from '../ChatBot/ChatBot'; 
import { useTranslation } from 'react-i18next';

const NotreEquipe = () => {
  const { t, i18n } = useTranslation();  // Utilisation de useTranslation pour gérer la langue
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [language, setLanguage] = useState('fr'); // Par défaut, la langue est le français
  const [title, setTitle] = useState(""); // État pour stocker le titre dynamique


useEffect(() => {
    // Fonction pour récupérer le titre et le contenu en fonction de la langue
    const fetchMessage = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/team-messages/');
        if (!response.ok) {
          throw new Error(`Erreur HTTP! statut: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.length > 0) {
          const sortedMessages = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          
          // Utiliser les données dynamiques pour récupérer le titre et le message en fonction de la langue active
          const messageData = sortedMessages[0]; // Message le plus récent
          setTitle(messageData[`title_${i18n.language}`] || "Titre non disponible");
          setMessage(messageData[`content_${i18n.language}`] || "Message non disponible dans cette langue.");
        } else {
          setMessage("Aucun message disponible pour l'instant.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [i18n.language]); // Met à jour lorsque la langue change

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
      {/* <ChatBot /> Affichage du chatbot */}

      <section className="text-gray-600 body-font overflow-hidden w-full px-4 sm:px-6 lg:px-8">
        <div className="container pb-32 pt-16 mx-auto">
          <div className="main-bl pb-10">
            <div className="bg-white p-8 sm:p-10 rounded-lg shadow-lg max-w-5xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 sm:mb-8"> {title}  {/* Titre dynamique */}</h2>
              <p className="text-base sm:text-xl text-gray-700 text-justify whitespace-pre-line">{message}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotreEquipe;

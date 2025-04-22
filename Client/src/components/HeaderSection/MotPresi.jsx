import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBot from '../ChatBot/ChatBot';

const MotPresi = () => {
  const [motPresi, setMotPresi] = useState(null); // Un seul message du président
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login');
      return;
    }

    const fetchMotPresi = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Récupération du token
        const response = await fetch('http://127.0.0.1:8000/api/motpresi/', {
          headers: {
            'Authorization': `Bearer ${token}`, // Ajout du token dans l'en-tête
          }
        });
        if (!response.ok) {
          throw new Error(`Erreur HTTP! statut: ${response.status}`);
        }
        const data = await response.json();
        console.log('Données reçues :', data);
    
        if (data.length > 0) {
          const sortedMessages = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setMotPresi(sortedMessages[0]);
        } else {
          setMotPresi(null);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMotPresi();
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ChatBot />

      <section className="text-gray-600 body-font overflow-hidden w-full">
        <div className="container px-12 pb-32 pt-16 mx-auto">
          <div className="main-bl space-y-16">
            {/* Titre centré avec plus d'espace au-dessus */}
            <h2 className="text-5xl font-bold text-center text-gray-800 mb-12">Mot du Président</h2>

            {/* Affichage du dernier message */}
            {motPresi ? (
              <div className="bg-white p-12 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 relative overflow-hidden">
                {/* Image de fond ou icône */}
                <div className="absolute inset-0 bg-gray-200 opacity-30 z-0"></div>
                <h3 className="text-3xl font-semibold text-gray-800 mb-6 relative z-10">{motPresi.titre}</h3>
                <p className="text-lg text-gray-700 text-justify whitespace-pre-line relative z-10">
                  {motPresi.texte}
                </p>
                <p className="text-sm text-gray-600 mt-4 relative z-10">Par: {motPresi.auteur}</p>
              </div>
            ) : (
              <p className="text-center text-gray-600">Aucun message du président disponible pour l'instant.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MotPresi;

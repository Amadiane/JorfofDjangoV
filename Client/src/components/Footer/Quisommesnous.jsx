import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBot from '../ChatBot/ChatBot';

const Quisommesnous = () => {
  const [missions, setMissions] = useState([]); // Plusieurs missions
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login');
      return;
    }

    const fetchMissions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/missions/');
        if (!response.ok) {
          throw new Error(`Erreur HTTP! statut: ${response.status}`);
        }
        const data = await response.json();

        if (data.length > 0) {
          const sortedMessages = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          const lastTwo = sortedMessages.slice(0, 2); // On garde les 2 plus récents
          setMissions(lastTwo);
        } else {
          setMissions([]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
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
            <h2 className="text-5xl font-bold text-center text-gray-800 mb-12">NOTRE MISSION & VISION</h2>

            {/* Grille réactive avec plus d'espace autour des cartes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12">
              {missions.length === 0 ? (
                <p className="text-center text-gray-600">Aucune mission disponible pour l'instant.</p>
              ) : (
                missions.map((mission, index) => (
                  <div
                    key={index}
                    className="bg-white p-12 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 relative overflow-hidden"
                  >
                    {/* Image de fond ou icône */}
                    <div className="absolute inset-0 bg-gray-200 opacity-30 z-0"></div>
                    <h3 className="text-3xl font-semibold text-gray-800 mb-6 relative z-10">{mission.title}</h3>
                    <p className="text-lg text-gray-700 text-justify whitespace-pre-line relative z-10">
                      {mission.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quisommesnous;

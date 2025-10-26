// import React, { useEffect, useState } from 'react';
// import { ChevronUp, ChevronDown } from 'react-feather';
// import ChatBotNew from "../ChatBot/ChatbotNew";

// const Programs = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [expandedEvent, setExpandedEvent] = useState(null);
//   const [isSearchFocused, setIsSearchFocused] = useState(false);

//   // Exemple d'événements du club
//   useEffect(() => {
//     setLoading(true);
//     try {
//       // Ici, tu pourrais remplacer par un fetch réel depuis ton backend
//       const data = [
//         {
//           id: 1,
//           title: "Match Jorfof Club vs Kankan Stars",
//           description: "Venez soutenir Jorfof Club dans ce match décisif du championnat régional.",
//           date: "2025-10-25",
//           location: "Salle Municipale de Kankan",
//           photo: "https://source.unsplash.com/400x300/?basketball"
//         },
//         {
//           id: 2,
//           title: "Entraînement ouvert au public",
//           description: "Découvrez l’esprit d’équipe du club et participez à notre séance d’entraînement.",
//           date: "2025-10-28",
//           location: "Terrain du Lycée Alpha Yaya Diallo",
//           photo: "https://source.unsplash.com/400x300/?basketball-training"
//         },
//         {
//           id: 3,
//           title: "Tournoi Interclubs – Phase finale",
//           description: "Jorfof Club affrontera les meilleures équipes de la région. Une journée intense de basket !",
//           date: "2025-11-10",
//           location: "Complexe Sportif de Conakry",
//           photo: "https://source.unsplash.com/400x300/?basketball-tournament"
//         }
//       ];
//       setEvents(data);
//     } catch (err) {
//       setError("Impossible de charger les événements du club.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const filteredEvents = events.filter(event =>
//     event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     event.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const toggleDescription = (index) => {
//     setExpandedEvent(expandedEvent === index ? null : index);
//   };

//   return (
//     <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
//       {/* Header */}
//       <header className="bg-gradient-to-r from-[#1C1C47] to-[#12138B] text-white text-center py-8 shadow-md">
//         <h1 className="text-4xl font-bold mb-2">Jorfof Club 🏀</h1>
//         <p className="text-lg opacity-90 max-w-2xl mx-auto">
//           Passion, esprit d’équipe et performance — notre club vit au rythme du basket.
//         </p>
//       </header>

//       {/* Barre de recherche */}
//       <div className="container mx-auto px-4 py-8 max-w-4xl">
//         <input
//           type="text"
//           placeholder="Rechercher un match ou événement..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onFocus={() => setIsSearchFocused(true)}
//           onBlur={() => setIsSearchFocused(false)}
//           className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1C1C47] shadow-sm transition-all ${isSearchFocused ? 'scale-105' : ''}`}
//         />
//       </div>

//       {/* Contenu */}
//       <div className="container mx-auto px-4 max-w-6xl">
//         {loading ? (
//           <div className="flex justify-center items-center py-10">
//             <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1C1C47]"></div>
//             <span className="ml-3 text-gray-600 text-base">Chargement...</span>
//           </div>
//         ) : error ? (
//           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md my-4">
//             <p className="font-bold">Erreur</p>
//             <p>{error}</p>
//           </div>
//         ) : filteredEvents.length === 0 ? (
//           <div className="text-center py-10 bg-white rounded-lg shadow-md px-4">
//             <p className="mt-3 text-gray-600 text-base">Aucun événement trouvé.</p>
//             {searchTerm && (
//               <button
//                 onClick={() => setSearchTerm("")}
//                 className="mt-2 text-[#1C1C47] hover:text-[#3b3b82] transition-colors"
//               >
//                 Effacer la recherche
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredEvents.map((event, index) => (
//               <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col">
//                 <div className="relative h-48 overflow-hidden">
//                   <img
//                     src={event.photo}
//                     alt={event.title}
//                     className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
//                     loading="lazy"
//                   />
//                 </div>
//                 <div className="p-4 flex flex-col flex-grow">
//                   <h2 className="text-lg font-semibold text-[#1C1C47] mb-2">{event.title}</h2>
//                   <p className="text-gray-700 text-sm">{event.date} — {event.location}</p>
//                   <div className={`overflow-hidden transition-all duration-500 flex-grow ${expandedEvent === index ? 'max-h-screen' : 'max-h-20'}`}>
//                     <p className="text-gray-600 text-sm mt-2">{event.description}</p>
//                   </div>
//                   <button
//                     className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center mt-3"
//                     onClick={() => toggleDescription(index)}
//                   >
//                     {expandedEvent === index ? <>Voir moins <ChevronUp size={14} className="ml-1" /></> : <>Lire la suite <ChevronDown size={14} className="ml-1" /></>}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Footer CTA */}
//       <div className="bg-white py-16 text-black text-center">
//         <h2 className="text-3xl font-bold mb-4">Rejoignez-nous !</h2>
//         <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
//           Suivez nos actualités, venez assister aux matchs et soutenez Jorfof Club !
//         </p>
//       </div>

//       {/* ChatBot */}
//       <div className="fixed bottom-6 right-6 z-50">
//         <ChatBotNew />
//       </div>
//     </div>
//   );
// };

// export default Programs;



import React, { useEffect, useState } from "react";
import { ChevronUp, ChevronDown } from "react-feather";
import ChatBotNew from "../ChatBot/ChatbotNew";
import CONFIG from "../../config/config.js";

const Programs = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedMatch, setExpandedMatch] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // ✅ Chargement des matchs depuis le backend Django
  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        const response = await fetch(CONFIG.API_MATCH_LIST);
        if (!response.ok) throw new Error("Erreur lors du chargement des matchs");
        const data = await response.json();
        setMatches(data);
      } catch (err) {
        console.error("Erreur API :", err);
        setError("Impossible de charger les matchs pour le moment.");
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  // ✅ Filtrage des matchs
  const filteredMatches = matches.filter(
    (match) =>
      match.home_team_name_fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.away_team_name_fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.location_fr.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDescription = (index) => {
    setExpandedMatch(expandedMatch === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1C1C47] to-[#12138B] text-white text-center py-8 shadow-md">
        <h1 className="text-4xl font-bold mb-2">Matchs du Jorfof Club 🏀</h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Découvrez tous les matchs à venir et les résultats récents de notre club.
        </p>
      </header>

      {/* Barre de recherche */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <input
          type="text"
          placeholder="Rechercher un match..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1C1C47] shadow-sm transition-all ${
            isSearchFocused ? "scale-105" : ""
          }`}
        />
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 max-w-6xl">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1C1C47]"></div>
            <span className="ml-3 text-gray-600 text-base">Chargement des matchs...</span>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md my-4">
            <p className="font-bold">Erreur</p>
            <p>{error}</p>
          </div>
        ) : filteredMatches.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-lg shadow-md px-4">
            <p className="mt-3 text-gray-600 text-base">Aucun match trouvé.</p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-2 text-[#1C1C47] hover:text-[#3b3b82] transition-colors"
              >
                Effacer la recherche
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((match, index) => (
              <div
                key={match.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col"
              >
                {/* ✅ Affiche ou logo du match */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={
                      match.banner_image?.startsWith("http")
                        ? match.banner_image
                        : `https://res.cloudinary.com/${CONFIG.CLOUDINARY_NAME}/image/upload/${match.banner_image}`
                    }
                    alt={`${match.home_team_name_fr} vs ${match.away_team_name_fr}`}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/400x300?text=Image+indisponible")
                    }
                  />
                </div>

                {/* ✅ Infos principales */}
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold text-[#1C1C47] mb-2">
                    {match.home_team_name_fr} vs {match.away_team_name_fr}
                  </h2>

                  <p className="text-gray-700 text-sm">
                    📅 {match.match_date} à {match.match_time?.slice(0, 5)}
                  </p>
                  <p className="text-gray-700 text-sm mb-2">📍 {match.location_fr}</p>

                  {/* ✅ Score (si disponible) */}
                  {match.home_score !== null && match.away_score !== null && (
                    <p className="text-[#12138B] font-semibold">
                      Résultat : {match.home_score} - {match.away_score}
                    </p>
                  )}

                  {/* ✅ Description */}
                  <div
                    className={`overflow-hidden transition-all duration-500 flex-grow ${
                      expandedMatch === index ? "max-h-screen" : "max-h-20"
                    }`}
                  >
                    <p className="text-gray-600 text-sm mt-2">
                      {match.description_fr || "Aucune description disponible."}
                    </p>
                  </div>

                  <button
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center mt-3"
                    onClick={() => toggleDescription(index)}
                  >
                    {expandedMatch === index ? (
                      <>
                        Voir moins <ChevronUp size={14} className="ml-1" />
                      </>
                    ) : (
                      <>
                        Lire la suite <ChevronDown size={14} className="ml-1" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="bg-white py-16 text-black text-center">
        <h2 className="text-3xl font-bold mb-4">Rejoignez-nous !</h2>
        <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
          Suivez nos actualités et venez encourager le Jorfof Club à chaque match !
        </p>
      </div>

      {/* ChatBot */}
      <div className="fixed bottom-6 right-6 z-50">
        <ChatBotNew />
      </div>
    </div>
  );
};

export default Programs;

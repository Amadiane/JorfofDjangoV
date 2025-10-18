// import React, { useEffect, useState } from 'react';
// import { ChevronUp, ChevronDown } from 'react-feather';
// import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';
// import ChatBotNew from "../ChatBot/ChatbotNew";

// const Programs = () => {
//   const navigate = useNavigate();
//   const { i18n, t } = useTranslation(); // Utilisation de i18n en plus de t
//   const [programmes, setProgrammes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [expandedProgram, setExpandedProgram] = useState(null);
//   const [isSearchFocused, setIsSearchFocused] = useState(false);
//   const apiUrl = import.meta.env.VITE_API_BACKEND;

//   useEffect(() => {
//     const fetchPrograms = async () => {
//       try {
//         setLoading(true);

//         const response = await fetch(apiUrl + "/api/programmes/");
//         if (!response.ok) throw new Error(t("errors.loading_programs"));
//         const data = await response.json();
//         setProgrammes(data);
//       } catch (err) {
//         console.error(t("errors.fetch_error"), err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPrograms();
//   }, [t]);

//   // Filtrage multilingue des programmes
//   const filteredPrograms = programmes.filter(program =>
//     (program[`title_${i18n.language}`] || program.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//     ((program[`description_${i18n.language}`] || program.description || "").toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const getImageSrc = (program) => {
//     if (program.photo_couverture) {
//       return program.photo_couverture.startsWith("http")
//         ? program.photo_couverture
//         : `${apiUrl}${program.photo_couverture}`;
//     }
//     return `${apiUrl}/api/placeholder/400/320`;
//   };

//   const toggleDescription = (index) => {
//     setExpandedProgram(expandedProgram === index ? null : index);
//   };

//   const handleClick = () => {
//     navigate('/contacter-tamkine');
//   };

//   return (
//     <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
//       {/* En-tête */}
//       <header className="bg-gradient-to-r from-[#1C1C47] to-[#12138B] text-white text-center py-4 px-4 md:py-8 lg:py-12 shadow-md">
//         <div className="pt-16">
//           <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t('programs.title')}</h1>
//           <p className="max-w-2xl mx-auto text-base md:text-lg opacity-90">
//             {t('programs.subtitle')}
//           </p>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-8 md:py-16 max-w-6xl">
//         <div className="max-w-md mx-auto mb-8">
//           <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
//             <input
//               type="text"
//               placeholder={t("programs.search_placeholder")}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               onFocus={() => setIsSearchFocused(true)}
//               onBlur={() => setIsSearchFocused(false)}
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1C1C47] focus:border-transparent shadow-sm"
//               aria-label={t("programs.search_aria_label")}
//             />
//           </div>
//         </div>

//         {loading ? (
//           <div className="flex justify-center items-center py-10">
//             <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1C1C47]"></div>
//             <span className="ml-3 text-gray-600 text-sm sm:text-base">{t("common.loading")}</span>
//           </div>
//         ) : error ? (
//           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md my-4 text-sm sm:text-base" role="alert">
//             <p className="font-bold">{t("common.error")}</p>
//             <p>{error}</p>
//           </div>
//         ) : filteredPrograms.length === 0 ? (
//           <div className="text-center py-10 bg-white rounded-lg shadow-md px-4">
//             <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <p className="mt-3 text-base sm:text-lg text-gray-600">{t("programs.no_programs")}</p>
//             {searchTerm && (
//               <button 
//                 onClick={() => setSearchTerm("")}
//                 className="mt-2 text-[#1C1C47] hover:text-[#3b3b82] transition-colors"
//               >
//                 {t("programs.clear_search")}
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
//             {filteredPrograms.map((program, index) => (
//               <div 
//                 key={index} 
//                 className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1"
//               >
//                 <div className="relative h-48 sm:h-56 overflow-hidden">
//                   <img
//                     src={getImageSrc(program)}
//                     alt={program[`title_${i18n.language}`] || program.title}
//                     className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
//                     loading="lazy"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
//                 </div>
//                 <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
//                   <h2 className="text-lg sm:text-xl font-semibold text-[#1C1C47] mb-2 sm:mb-3">
//                     {program[`title_${i18n.language}`] || program.title}
//                   </h2>
                  
//                   <div className={`overflow-hidden transition-all duration-500 flex-grow ${expandedProgram === index ? 'max-h-screen' : 'max-h-20 sm:max-h-24'}`}>
//                     <p className="text-gray-600 text-sm sm:text-base">
//                       {program[`description_${i18n.language}`] || program.description}
//                     </p>
//                   </div>
                  
//                   <button
//                     className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center mt-4"
//                     onClick={() => toggleDescription(index)}
//                     aria-expanded={expandedProgram === index}
//                   >
//                     {expandedProgram === index ? (
//                       <>
//                         {t("programs.show_less")}
//                         <ChevronUp size={14} className="ml-1" />
//                       </>
//                     ) : (
//                       <>
//                         {t("programs.read_more")}
//                         <ChevronDown size={14} className="ml-1" />
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Footer CTA */}
//       <div className="bg-white py-16 text-black">
//         <div className="container mx-auto px-4 md:px-8 max-w-6xl text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-6">
//             {t('programs.cta_title')}
//           </h2>
//           <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
//             {t('programs.cta_description')}
//           </p>
//           <button
//             onClick={handleClick}
//             className="bg-[#12138B] text-white hover:bg-[#1e1fab] transition px-8 py-4 rounded-full font-semibold text-lg shadow-md"
//           >
//              {t('contact_us')}
//           </button>
//         </div>
//       </div>
//       <div className="fixed bottom-6 right-6 z-50">
//               <ChatBotNew />
//             </div>
//     </div>
//   );
// };

// export default Programs;


import React, { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown } from 'react-feather';
import ChatBotNew from "../ChatBot/ChatbotNew";

const Programs = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Exemple d'événements du club
  useEffect(() => {
    setLoading(true);
    try {
      // Ici, tu pourrais remplacer par un fetch réel depuis ton backend
      const data = [
        {
          id: 1,
          title: "Match Jorfof Club vs Kankan Stars",
          description: "Venez soutenir Jorfof Club dans ce match décisif du championnat régional.",
          date: "2025-10-25",
          location: "Salle Municipale de Kankan",
          photo: "https://source.unsplash.com/400x300/?basketball"
        },
        {
          id: 2,
          title: "Entraînement ouvert au public",
          description: "Découvrez l’esprit d’équipe du club et participez à notre séance d’entraînement.",
          date: "2025-10-28",
          location: "Terrain du Lycée Alpha Yaya Diallo",
          photo: "https://source.unsplash.com/400x300/?basketball-training"
        },
        {
          id: 3,
          title: "Tournoi Interclubs – Phase finale",
          description: "Jorfof Club affrontera les meilleures équipes de la région. Une journée intense de basket !",
          date: "2025-11-10",
          location: "Complexe Sportif de Conakry",
          photo: "https://source.unsplash.com/400x300/?basketball-tournament"
        }
      ];
      setEvents(data);
    } catch (err) {
      setError("Impossible de charger les événements du club.");
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDescription = (index) => {
    setExpandedEvent(expandedEvent === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1C1C47] to-[#12138B] text-white text-center py-8 shadow-md">
        <h1 className="text-4xl font-bold mb-2">Jorfof Club 🏀</h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Passion, esprit d’équipe et performance — notre club vit au rythme du basket.
        </p>
      </header>

      {/* Barre de recherche */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <input
          type="text"
          placeholder="Rechercher un match ou événement..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1C1C47] shadow-sm transition-all ${isSearchFocused ? 'scale-105' : ''}`}
        />
      </div>

      {/* Contenu */}
      <div className="container mx-auto px-4 max-w-6xl">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1C1C47]"></div>
            <span className="ml-3 text-gray-600 text-base">Chargement...</span>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md my-4">
            <p className="font-bold">Erreur</p>
            <p>{error}</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-lg shadow-md px-4">
            <p className="mt-3 text-gray-600 text-base">Aucun événement trouvé.</p>
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
            {filteredEvents.map((event, index) => (
              <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.photo}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold text-[#1C1C47] mb-2">{event.title}</h2>
                  <p className="text-gray-700 text-sm">{event.date} — {event.location}</p>
                  <div className={`overflow-hidden transition-all duration-500 flex-grow ${expandedEvent === index ? 'max-h-screen' : 'max-h-20'}`}>
                    <p className="text-gray-600 text-sm mt-2">{event.description}</p>
                  </div>
                  <button
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center mt-3"
                    onClick={() => toggleDescription(index)}
                  >
                    {expandedEvent === index ? <>Voir moins <ChevronUp size={14} className="ml-1" /></> : <>Lire la suite <ChevronDown size={14} className="ml-1" /></>}
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
          Suivez nos actualités, venez assister aux matchs et soutenez Jorfof Club !
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

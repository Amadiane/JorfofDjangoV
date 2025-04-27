import React, { useEffect, useState } from 'react';

const Programs = () => {
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedProgram, setExpandedProgram] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/api/programmes/");
        if (!response.ok) throw new Error("Erreur lors du chargement des programmes.");
        const data = await response.json();
        setProgrammes(data);
      } catch (err) {
        console.error("Erreur de récupération:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const filteredPrograms = programmes.filter(program =>
    program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (program.description && program.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getImageSrc = (program) => {
    if (program.photo_couverture) {
      return program.photo_couverture.startsWith("http")
        ? program.photo_couverture
        : `http://127.0.0.1:8000${program.photo_couverture}`;
    }
    return "/api/placeholder/400/320";
  };

  const toggleDescription = (index) => {
    setExpandedProgram(expandedProgram === index ? null : index);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Espace pour éviter que le header ne cache le contenu - augmenté */}
      <div className="h-20"></div>
      <div className="pt-4"></div>

      {/* Section de titre principale avec couleur de platforms */}
      <div className="px-4 pb-8">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-[#1C1C47]">
              Nos Programmes
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
              Découvrez les différents programmes et initiatives de notre fondation pour maximiser notre impact collectif.
            </p>
          </header>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 max-w-6xl">
        {/* Barre de recherche optimisée pour mobile */}
        <div className="max-w-md mx-auto mb-8">
          <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
            <input
              type="text"
              placeholder="Rechercher un programme..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1C1C47] focus:border-transparent shadow-sm"
              aria-label="Rechercher un programme"
            />
            <svg 
              className="absolute right-3 top-3 h-6 w-6 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        {/* Affichage des résultats - optimisé pour mobile */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1C1C47]"></div>
            <span className="ml-3 text-gray-600 text-sm sm:text-base">Chargement des programmes...</span>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md my-4 text-sm sm:text-base" role="alert">
            <p className="font-bold">Erreur</p>
            <p>{error}</p>
          </div>
        ) : filteredPrograms.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-lg shadow-md px-4">
            <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-3 text-base sm:text-lg text-gray-600">Aucun programme ne correspond à votre recherche.</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredPrograms.map((program, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1"
              >
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={getImageSrc(program)}
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 sm:p-5 flex flex-col flex-grow">
                  <h2 className="text-lg sm:text-xl font-semibold text-[#1C1C47] mb-2 sm:mb-3">
                    {program.title}
                  </h2>
                  
                  <div className={`overflow-hidden transition-all duration-500 flex-grow ${expandedProgram === index ? 'max-h-screen' : 'max-h-20 sm:max-h-24'}`}>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {program.description}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => toggleDescription(index)}
                    className="mt-3 sm:mt-4 px-3 sm:px-4 py-2 bg-[#1C1C47] text-white rounded-md hover:bg-[#3b3b82] transition-colors flex items-center justify-center w-full focus:outline-none focus:ring-2 focus:ring-[#1C1C47] focus:ring-opacity-50 text-sm sm:text-base"
                    aria-expanded={expandedProgram === index}
                  >
                    {expandedProgram === index ? "Voir moins" : "Voir plus"}
                    <svg 
                      className={`ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 ${expandedProgram === index ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Programs;

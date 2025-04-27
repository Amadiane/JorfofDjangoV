import React, { useEffect, useState } from 'react';

const Platforms = () => {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDescription, setExpandedDescription] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://127.0.0.1:8000/api/platforms/')
      .then(res => {
        if (!res.ok) throw new Error("Échec du chargement des plateformes");
        return res.json();
      })
      .then(data => {
        setPlatforms(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Impossible de charger les plateformes pour le moment");
        setLoading(false);
      });
  }, []);

  // Correction du problème d'affichage des images avec méthode similaire à Actualites
  const getImageUrl = (iconPath) => {
    if (!iconPath) return null;
    
    // Si l'URL est déjà complète
    if (iconPath.startsWith('http')) {
      return iconPath;
    }
    
    // Si c'est un chemin relatif
    return `http://127.0.0.1:8000${iconPath.startsWith('/') ? '' : '/'}${iconPath}`;
  };

  const toggleDescription = (id) => {
    setExpandedDescription(expandedDescription === id ? null : id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>Erreur lors du chargement des plateformes: {error}</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-100 min-h-screen">
      {/* Ajout d'un espacement comme dans Actualites pour assurer que le titre est visible */}
      <div className="h-16"></div>
      <div className="pt-8"></div>

      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#1C1C47]">
            Notre écosystème de plateformes
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Découvrez les différentes plateformes et initiatives de notre fondation pour maximiser notre impact collectif.
          </p>
        </header>

        {platforms.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-white rounded-xl p-8 shadow-md">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-lg font-medium">Aucune plateforme n'est disponible pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map(platform => {
              // Formatage de la date similaire à Actualites
              let formattedDate = "Date non disponible";
              try {
                if (platform.added_at) {
                  const options = { year: 'numeric', month: 'long', day: 'numeric' };
                  formattedDate = new Date(platform.added_at).toLocaleDateString('fr-FR', options);
                }
              } catch (e) {
                console.error('Erreur lors du formatage de la date:', e);
              }

              return (
                <div key={platform.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {/* Bloc d'image inspiré du composant Actualites */}
                  {platform.icon ? (
                    <div className="h-48 w-full relative">
                      <img 
                        src={getImageUrl(platform.icon)}
                        alt={`${platform.name} icon`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.log('Image non chargée:', e.target.src);
                          e.target.onerror = null;
                          e.target.parentNode.innerHTML = `
                            <div class="h-full w-full bg-gray-200 flex items-center justify-center">
                              <p class="text-gray-500">Image non disponible</p>
                            </div>
                          `;
                        }}
                      />
                    </div>
                  ) : (
                    <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <p className="text-gray-500 ml-2">Image non disponible</p>
                    </div>
                  )}

                  <div className="p-4">
                    <h2 className="text-xl font-bold text-[#1C1C47] mb-2">{platform.name || "Plateforme sans nom"}</h2>
                    
                    {platform.description ? (
                      <div className="mb-4">
                        <p className={`text-gray-600 text-sm ${expandedDescription === platform.id ? '' : 'line-clamp-3'}`}>
                          {platform.description}
                        </p>
                        {platform.description.length > 120 && (
                          <button
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
                            onClick={() => toggleDescription(platform.id)}
                          >
                            {expandedDescription === platform.id ? "Voir moins" : "Voir plus"}
                          </button>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-400 text-sm italic mb-4">Pas de description disponible</p>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        Ajouté le {formattedDate}
                      </span>
                      
                      <a
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-[#1C1C47] text-white rounded-md hover:bg-[#3b3b82] transition-colors text-sm font-medium"
                      >
                        Visiter
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Platforms;

import React, { useEffect, useState } from 'react';

const Platforms = () => {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="animate-pulse text-[#1C1C47] text-lg">Chargement de nos plateformes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <div className="text-red-600 text-center">{error}</div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#1C1C47]">
            Notre écosystème de plateformes
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Découvrez les différentes plateformes et initiatives de notre fondation pour maximiser notre impact collectif.
          </p>
        </header>

        {platforms.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Aucune plateforme n'est disponible pour le moment.
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {platforms.map(platform => {
              console.log('Date received:', platform.added_at);  // Ajout du log pour déboguer
              const date = new Date(platform.added_at);
              const dateString = !isNaN(date) 
                ? date.toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : "Date invalide";

              return (
                <div key={platform.id} className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] border border-gray-100">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      {platform.icon ? (
                        <img 
                          src={`http://127.0.0.1:8000${platform.icon}`}
                          alt={`${platform.name} icon`}
                          className="w-12 h-12 object-contain rounded-lg mr-4"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-[#1C1C47]/10 flex items-center justify-center rounded-lg mr-4">
                          <svg className="w-6 h-6 text-[#1C1C47]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                        </div>
                      )}
                      <h2 className="text-xl font-bold text-[#1C1C47]">{platform.name}</h2>
                    </div>

                    <div className="mb-6">
                      {platform.description ? (
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {platform.description}
                        </p>
                      ) : (
                        <p className="text-gray-400 text-sm italic">Pas de description disponible</p>
                      )}
                    </div>

                    <div className="flex flex-col space-y-3">
                      {platform.description && platform.description.length > 120 && (
                        <button
                          className="text-[#1C1C47] text-sm font-medium hover:text-[#3b3b82] transition-colors"
                          onClick={() => alert(platform.description)}
                        >
                          Voir la description complète
                        </button>
                      )}

                      <a
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-4 py-2 bg-[#1C1C47] text-white rounded-lg hover:bg-[#3b3b82] transition-colors font-medium"
                      >
                        Visiter la plateforme
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="px-6 py-2 bg-gray-50 text-xs text-gray-500 flex justify-end">
                    Ajouté le {dateString}
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

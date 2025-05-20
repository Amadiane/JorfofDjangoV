import React, { useEffect, useState } from "react";
import { ExternalLink, Loader, ChevronRight } from "lucide-react";
import { useTranslation } from 'react-i18next';  // Import de useTranslation
import ChatBotNew from "../ChatBot/ChatbotNew";

const MediaPartenaire = () => {
  const [partenaires, setPartenaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('tous');
  const [categories, setCategories] = useState(['tous']);
  const { t } = useTranslation();  // Initialisation du hook de traduction

  useEffect(() => {
    const fetchPartenaires = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/api/partenaires/");
        if (!response.ok) throw new Error("Erreur lors du chargement des données");
        const data = await response.json();
        
        // Extraire les catégories uniques des partenaires
        const uniqueCategories = [...new Set(data.map(p => p.categorie).filter(Boolean))];
        setCategories(['tous', ...uniqueCategories]);
        
        setPartenaires(data);
        setError(null);
      } catch (error) {
        console.error("Erreur:", error);
        setError("Impossible de charger les partenaires. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    fetchPartenaires();
  }, []);

  const filteredPartenaires = activeFilter === 'tous' 
    ? partenaires 
    : partenaires.filter(p => p.categorie === activeFilter);

  return (
    <div className="bg-gray-50 min-h-screen ">
      {/* En-tête avec gradient comme dans Community */}
      <header className="bg-gradient-to-r from-[#1C1C47] to-[#12138B] text-white text-center py-8 px-4 md:py-12 lg:py-16 shadow-md">
  <div className="pt-16">
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t('Nos Partenaires Médias')}</h1>
    <p className="max-w-2xl mx-auto text-base md:text-lg opacity-90">
      {t('Découvrez les organisations médiatiques qui soutiennent la mission et les initiatives de la Fondation Tamkine.')}
    </p>
  </div>
</header>



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filtres de navigation */}
        {categories.length > 1 && !loading && !error && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-[#1C1C47] mb-4">{t('Filtrer par catégorie')}</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    activeFilter === cat 
                      ? 'bg-[#1C1C47] text-white shadow-md' 
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <Loader className="animate-spin text-[#1C1C47]" size={40} />
            <p className="mt-4 text-gray-600">{t('Chargement des partenaires...')}</p>
          </div>
        ) : error ? (
          <div className="bg-white border border-red-200 rounded-lg p-8 text-center shadow-md">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-[#1C1C47] hover:bg-[#15154b] text-white px-6 py-3 rounded-md transition"
            >
              {t('Réessayer')}
            </button>
          </div>
        ) : filteredPartenaires.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600">{t('Aucun partenaire trouvé pour cette catégorie.')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPartenaires.map((partenaire, index) => (
              <PartenaireCard key={index} partenaire={partenaire} />
            ))}
          </div>
        )}
      </div>
      <div className="fixed bottom-6 right-6 z-50">
        <ChatBotNew />
      </div>
    </div>
  );
};

const PartenaireCard = ({ partenaire }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();  // Initialisation du hook de traduction

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full transition-all duration-300 transform hover:-translate-y-2"
      style={{
        boxShadow: isHovered ? '0 12px 24px rgba(0, 0, 0, 0.15)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image du partenaire avec taille agrandie */}
      <div className="relative h-72 overflow-hidden">
        {partenaire.couverture ? (
          <img
            src={partenaire.couverture}
            alt={`Logo de ${partenaire.titre}`}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 font-medium">{t('Aucune image')}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {partenaire.categorie && (
          <div className="absolute top-4 right-4 bg-[#1C1C47]/80 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
            {partenaire.categorie}
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="p-6 flex-grow flex flex-col">
        <h2 className="text-2xl font-semibold text-[#1C1C47] mb-3">{partenaire.titre}</h2>
        
        <p className="text-gray-700 mb-6 flex-grow">
          {partenaire.description || "Aucune description disponible pour ce partenaire."}
        </p>

        {/* Informations supplémentaires (si disponibles) */}
        {(partenaire.ville || partenaire.date_creation) && (
          <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
            {partenaire.ville && (
              <div className="flex items-center">
                <span className="font-medium">{t('Localisation:')}</span>
                <span className="ml-2">{partenaire.ville}</span>
              </div>
            )}
            {partenaire.date_creation && (
              <div className="flex items-center">
                <span className="font-medium">{t('Établi:')}</span>
                <span className="ml-2">{new Date(partenaire.date_creation).getFullYear()}</span>
              </div>
            )}
          </div>
        )}

        {/* Bouton */}
        <div className="mt-auto">
          {partenaire.site_url ? (
            <a
              href={partenaire.site_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#1C1C47] hover:bg-[#15154b] text-white py-3 px-6 rounded-lg transition-colors duration-300 w-full text-center group"
            >
             {t(' Visiter le site')}
              <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          ) : (
            <button className="bg-gray-200 text-gray-500 py-3 px-6 rounded-lg w-full cursor-not-allowed">
             {t(' Site non disponible')}
            </button>
          )}
        </div>
      </div>
    
    </div>
  );
};

export default MediaPartenaire;
import React, { useEffect, useState } from 'react';
// import ChatBot from '../ChatBot/ChatBot';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ChatBotNew from "../ChatBot/ChatbotNew";

const Actualites = () => {
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [latestPost, setLatestPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFullContent, setShowFullContent] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BACKEND;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(apiUrl + "/api/blog/");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const sortedBlogs = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setBlogs(sortedBlogs);
        setLatestPost(sortedBlogs[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [navigate]);

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const toggleFullContent = () => setShowFullContent(!showFullContent);

  const toggleCardContent = (id) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* En-tête harmonisée avec Partner et Programs */}
      <header className="bg-gradient-to-r from-[#1C1C47] to-[#12138B] text-white text-center py-4 px-4 md:py-8 lg:py-12 shadow-md">
        <div className="pt-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t('Actualités')}</h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg opacity-90">
            {t('Découvrez les dernières nouvelles et mises à jour de la Fondation Tamkine')}
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-16 max-w-6xl">
        {/* Barre de recherche */}
        <div className="max-w-md mx-auto mb-10">
          <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
            <input
              type="text"
              placeholder={t("Rechercher un programme...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1C1C47] focus:border-transparent shadow-sm"
              aria-label={t("Rechercher un programme")}
            />
          </div>
          {/* <p className="mt-3 text-base sm:text-lg text-gray-600">{t("Aucun programme ne correspond à votre recherche.")}</p> */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="mt-2 text-[#1C1C47] hover:text-[#3b3b82] transition-colors"
            >
              {t("Effacer la recherche")}
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1C1C47]"></div>
            <span className="ml-3 text-gray-600 text-sm sm:text-base">{t("Chargement des actualités...")}</span>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md my-4" role="alert">
            <p className="font-bold">{t('Erreur')}</p>
            <p>{t('Erreur lors du chargement')} : {error}</p>
          </div>
        ) : (
          <>
            {latestPost && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex flex-wrap items-center justify-center md:justify-start">
                  <span className="bg-red-600 text-white px-3 py-1 mr-3 mb-2 rounded">{t('À LA UNE')}</span>
                  {t('Dernière nouvelle')}
                </h2>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2">
                      {latestPost.image ? (
                        <img
                          src={latestPost.image}
                          alt={latestPost.title}
                          className="w-full h-64 sm:h-80 md:h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-64 sm:h-80 md:h-full bg-gray-200 flex items-center justify-center">
                          <p className="text-gray-500">{t('Pas d\'image disponible')}</p>
                        </div>
                      )}
                    </div>
                    <div className="p-6 md:p-8 flex flex-col justify-between w-full md:w-1/2">
                      <div className="flex flex-col h-full">
                        <h3 className="text-xl md:text-2xl font-bold mb-4 text-[#1C1C47]">{latestPost.title}</h3>
                        <div className="flex-grow overflow-hidden">
                          <p className={`text-gray-600 ${showFullContent ? '' : 'line-clamp-6 md:line-clamp-8'}`}
                            style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', lineHeight: '1.7' }}>
                            {latestPost.content}
                          </p>
                        </div>
                      </div>
                      <div className="mt-6">
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <Clock size={16} className="mr-1" />
                          <span>{formatDate(latestPost.created_at)}</span>
                        </div>
                        <button
                          className="bg-[#12138B] hover:bg-[#1e1fab] text-white px-5 py-2 rounded-lg flex items-center justify-center w-full md:w-auto transition-all transform hover:scale-105 shadow-md"
                          onClick={toggleFullContent}
                          aria-expanded={showFullContent}
                        >
                          {showFullContent ? (
                            <>
                              {t('Réduire')}
                              <ChevronUp size={16} className="ml-2" />
                            </>
                          ) : (
                            <>
                              {t('Lire plus')}
                              <ChevronDown size={16} className="ml-2" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[#1C1C47]">{t('Nouvelles récentes')}</h2>
              
              {filteredBlogs.length <= 1 ? (
                <div className="text-center py-10 bg-white rounded-lg shadow-md px-4">
                  <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="mt-3 text-base sm:text-lg text-gray-600">
                    {searchQuery ? t('Aucune actualité ne correspond à votre recherche.') : t('Aucune actualité disponible pour le moment.')}
                  </p>
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="mt-2 text-[#1C1C47] hover:text-[#3b3b82] transition-colors"
                    >
                      {t("Effacer la recherche")}
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredBlogs.map((blog) => (
                    <div key={blog.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="flex flex-col h-full">
                        <div className="overflow-hidden">
                          {blog.image ? (
                            <img
                              src={blog.image}
                              alt={blog.title}
                              className="w-full h-40 object-cover transition-transform duration-700 hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                              <p className="text-gray-500">{t('Pas d\'image disponible')}</p>
                            </div>
                          )}
                        </div>
                        <div className="p-4 flex flex-col justify-between flex-grow">
                          <h3 className="text-xl font-semibold text-[#1C1C47] mb-4">{blog.title}</h3>
                          <div className="overflow-hidden">
                            <p className="text-gray-600 line-clamp-4">{blog.content}</p>
                          </div>
                          <div className="mt-4">
                            <button
                              className="bg-[#1C1C47] text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-[#12138B] w-full"
                              onClick={() => toggleCardContent(blog.id)}
                            >
                              {expandedCards[blog.id] ? t('Lire moins') : t('Lire plus')}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>
      <div className="fixed bottom-6 right-6 z-50">
        <ChatBotNew />
      </div>
    </div>
  );
};

export default Actualites;

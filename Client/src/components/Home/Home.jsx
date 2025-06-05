import React, { useEffect, useState } from 'react';
import ChatBotNew from "../ChatBot/ChatbotNew";
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Actualites = () => {
  const { t, i18n } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [latestPost, setLatestPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFullContent, setShowFullContent] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BACKEND;

  // Fonction pour obtenir le contenu selon la langue actuelle
  const getLocalizedContent = (blog, field) => {
    const currentLang = i18n.language || 'fr';
    
    // Mapping des langues
    const langMap = {
      'fr': '_fr',
      'en': '_en',
      'ar': '_ar'
    };
    
    const suffix = langMap[currentLang] || '_fr';
    
    // Essayer d'abord avec la langue actuelle
    if (blog[field + suffix] && blog[field + suffix].trim()) {
      return blog[field + suffix];
    }
    
    // Fallback vers le français
    if (blog[field + '_fr'] && blog[field + '_fr'].trim()) {
      return blog[field + '_fr'];
    }
    
    // Fallback vers l'anglais
    if (blog[field + '_en'] && blog[field + '_en'].trim()) {
      return blog[field + '_en'];
    }
    
    // Fallback vers l'arabe
    if (blog[field + '_ar'] && blog[field + '_ar'].trim()) {
      return blog[field + '_ar'];
    }
    
    // Fallback vers les anciennes propriétés si elles existent
    if (blog[field]) {
      return blog[field];
    }
    
    return '';
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl + "/api/blog/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Trier par date de création (plus récent en premier)
        const sortedBlogs = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        setBlogs(sortedBlogs);
        setLatestPost(sortedBlogs[0] || null);
      } catch (error) {
        console.error('Erreur lors du chargement des blogs:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [apiUrl]);

  // Fonction pour rafraîchir les données
  const refreshBlogs = async () => {
    try {
      const response = await fetch(apiUrl + "/api/blog/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const sortedBlogs = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setBlogs(sortedBlogs);
      setLatestPost(sortedBlogs[0] || null);
    } catch (error) {
      console.error('Erreur lors du rafraîchissement:', error);
    }
  };

  // Filtrer les blogs selon la recherche
  const filteredBlogs = blogs.filter(blog => {
    const title = getLocalizedContent(blog, 'title').toLowerCase();
    const content = getLocalizedContent(blog, 'content').toLowerCase();
    const query = searchQuery.toLowerCase();
    
    return title.includes(query) || content.includes(query);
  });

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    
    // Adapter la locale selon la langue
    const currentLang = i18n.language || 'fr';
    const localeMap = {
      'fr': 'fr-FR',
      'en': 'en-US',
      'ar': 'ar-MA'
    };
    
    const locale = localeMap[currentLang] || 'fr-FR';
    return new Date(dateString).toLocaleDateString(locale, options);
  };

  const toggleFullContent = () => setShowFullContent(!showFullContent);

  const toggleCardContent = (id) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="h-16"></div>
        <div className="pt-8"></div>
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="h-16"></div>
        <div className="pt-8"></div>
        <main className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{t('error_loading')} {error}</p>
            <button 
              onClick={refreshBlogs}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              {t('retry') || 'Réessayer'}
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="h-16"></div>
      <div className="pt-8"></div>

      <main className="container mx-auto px-4 py-8">
        {/* Titre principal */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 inline-block relative">
            {t('news') || 'Actualités'}
            <div className="h-1 w-24 bg-blue-600 mx-auto mt-2"></div>
          </h1>
        </div>

        {/* Barre de recherche */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t('search_placeholder') || 'Rechercher dans les actualités...'}
              value={searchQuery}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <span className="text-gray-400 hover:text-gray-600">×</span>
              </button>
            )}
          </div>
        </div>

        {/* Article principal (dernier publié) */}
        {latestPost && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex flex-wrap items-center justify-center md:justify-start">
              <span className="bg-red-600 text-white px-3 py-1 mr-3 mb-2 rounded">
                {t('À LA UNE') || 'À LA UNE'}
              </span>
              {t('Dernière nouvelle') || 'Dernière nouvelle'}
            </h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2">
                  {latestPost.image ? (
                    <img 
                      src={latestPost.image} 
                      alt={getLocalizedContent(latestPost, 'title')} 
                      className="w-full h-64 sm:h-80 md:h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-64 sm:h-80 md:h-full bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500">{t('no_image') || 'Aucune image'}</p>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col justify-between w-full md:w-1/2">
                  <div className="flex flex-col h-full">
                    <h3 className="text-xl font-bold mb-3">
                      {getLocalizedContent(latestPost, 'title')}
                    </h3>
                    <div className="flex-grow overflow-hidden">
                      <p className={`text-gray-600 ${showFullContent ? '' : 'line-clamp-6 md:line-clamp-8 lg:text-base xl:text-lg'}`} 
                         style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', lineHeight: '1.6' }}>
                        {getLocalizedContent(latestPost, 'content')}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Clock size={16} className="mr-1" />
                      <span>{formatDate(latestPost.created_at)}</span>
                    </div>
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center w-full md:w-auto transition-colors duration-300"
                      onClick={toggleFullContent}
                    >
                      {showFullContent ? (
                        <>
                          {t('read_less') || 'Lire moins'}
                          <ChevronUp size={16} className="ml-2" />
                        </>
                      ) : (
                        <>
                          {t('read_more') || 'Lire plus'}
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

        {/* Autres articles */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-center md:text-left">
              {t('Nouvelles récentes') || 'Nouvelles récentes'}
            </h2>
            <button
              onClick={refreshBlogs}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-300"
            >
              {t('refresh') || 'Actualiser'}
            </button>
          </div>
          
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">
                {searchQuery 
                  ? (t('no_match') || 'Aucun article ne correspond à votre recherche.') 
                  : (t('no_articles') || 'Aucun article disponible pour le moment.')
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.slice(1).map((blog) => (
                <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                  {blog.image ? (
                    <img 
                      src={blog.image} 
                      alt={getLocalizedContent(blog, 'title')} 
                      className="h-48 w-full object-cover" 
                    />
                  ) : (
                    <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500">{t('no_image') || 'Aucune image'}</p>
                    </div>
                  )}
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-bold mb-2 text-lg">
                      {getLocalizedContent(blog, 'title')}
                    </h3>
                    <div className="flex-grow">
                      <p className={`text-gray-600 text-sm mb-3 ${expandedCards[blog.id] ? '' : 'line-clamp-3'}`}>
                        {getLocalizedContent(blog, 'content')}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock size={14} className="mr-1" />
                        {formatDate(blog.created_at)}
                      </span>
                      <button
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                        onClick={() => toggleCardContent(blog.id)}
                      >
                        {expandedCards[blog.id] ? (
                          <>
                            {t('collapse') || 'Réduire'}
                            <ChevronUp size={14} className="ml-1" />
                          </>
                        ) : (
                          <>
                            {t('read') || 'Lire'}
                            <ChevronDown size={14} className="ml-1" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ChatBot fixe */}
      <div className="fixed bottom-6 right-6 z-50">
        <ChatBotNew />
      </div>
    </div>
  );
};

export default Actualites;
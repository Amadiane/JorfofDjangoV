// import React, { useEffect, useState } from 'react';
// import ChatBotNew from "../ChatBot/ChatbotNew";
// import { useNavigate } from 'react-router-dom';
// import { Clock, ChevronDown, ChevronUp, Search } from 'lucide-react';
// import { useTranslation } from 'react-i18next';

// const Actualites = () => {
//   const { t, i18n } = useTranslation();
//   const [blogs, setBlogs] = useState([]);
//   const [latestPost, setLatestPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFullContent, setShowFullContent] = useState(false);
//   const [expandedCards, setExpandedCards] = useState({});
//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_API_BACKEND;

//   // Fonction pour obtenir le contenu selon la langue actuelle
//   const getLocalizedContent = (blog, field) => {
//     const currentLang = i18n.language || 'fr';
    
//     // Mapping des langues
//     const langMap = {
//       'fr': '_fr',
//       'en': '_en',
//       'ar': '_ar'
//     };
    
//     const suffix = langMap[currentLang] || '_fr';
    
//     // Essayer d'abord avec la langue actuelle
//     if (blog[field + suffix] && blog[field + suffix].trim()) {
//       return blog[field + suffix];
//     }
    
//     // Fallback vers le français
//     if (blog[field + '_fr'] && blog[field + '_fr'].trim()) {
//       return blog[field + '_fr'];
//     }
    
//     // Fallback vers l'anglais
//     if (blog[field + '_en'] && blog[field + '_en'].trim()) {
//       return blog[field + '_en'];
//     }
    
//     // Fallback vers l'arabe
//     if (blog[field + '_ar'] && blog[field + '_ar'].trim()) {
//       return blog[field + '_ar'];
//     }
    
//     // Fallback vers les anciennes propriétés si elles existent
//     if (blog[field]) {
//       return blog[field];
//     }
    
//     return '';
//   };

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(apiUrl + "/api/blog/");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
        
//         // Trier par date de création (plus récent en premier)
//         const sortedBlogs = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
//         setBlogs(sortedBlogs);
//         setLatestPost(sortedBlogs[0] || null);
//       } catch (error) {
//         console.error('Erreur lors du chargement des blogs:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogs();
//   }, [apiUrl]);

//   // Fonction pour rafraîchir les données
//   const refreshBlogs = async () => {
//     try {
//       const response = await fetch(apiUrl + "/api/blog/");
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       const sortedBlogs = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//       setBlogs(sortedBlogs);
//       setLatestPost(sortedBlogs[0] || null);
//     } catch (error) {
//       console.error('Erreur lors du rafraîchissement:', error);
//     }
//   };

//   // Filtrer les blogs selon la recherche
//   const filteredBlogs = blogs.filter(blog => {
//     const title = getLocalizedContent(blog, 'title').toLowerCase();
//     const content = getLocalizedContent(blog, 'content').toLowerCase();
//     const query = searchQuery.toLowerCase();
    
//     return title.includes(query) || content.includes(query);
//   });

//   const formatDate = (dateString) => {
//     const options = { 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric', 
//       hour: '2-digit', 
//       minute: '2-digit' 
//     };
    
//     // Adapter la locale selon la langue
//     const currentLang = i18n.language || 'fr';
//     const localeMap = {
//       'fr': 'fr-FR',
//       'en': 'en-US',
//       'ar': 'ar-MA'
//     };
    
//     const locale = localeMap[currentLang] || 'fr-FR';
//     return new Date(dateString).toLocaleDateString(locale, options);
//   };

//   const toggleFullContent = () => setShowFullContent(!showFullContent);

//   const toggleCardContent = (id) => {
//     setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const clearSearch = () => {
//     setSearchQuery('');
//   };

//   if (loading) {
//     return (
//       <div className="bg-gray-100 min-h-screen">
//         <div className="h-16"></div>
//         <div className="pt-8"></div>
//         <main className="container mx-auto px-4 py-8">
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//           </div>
//         </main>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-gray-100 min-h-screen">
//         <div className="h-16"></div>
//         <div className="pt-8"></div>
//         <main className="container mx-auto px-4 py-8">
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//             <p>{t('error_loading')} {error}</p>
//             <button 
//               onClick={refreshBlogs}
//               className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
//             >
//               {t('retry') || 'Réessayer'}
//             </button>
//           </div>
//         </main>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <div className="h-16"></div>
//       <div className="pt-8"></div>

//       <main className="container mx-auto px-4 py-8">
//         {/* Titre principal */}
//         <div className="text-center mb-12">
//           <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 inline-block relative">
//             {t('news') || 'Actualités'}
//             <div className="h-1 w-24 bg-blue-600 mx-auto mt-2"></div>
//           </h1>
//         </div>

//         {/* Barre de recherche */}
//         <div className="mb-8">
//           <div className="relative max-w-md mx-auto">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder={t('search_placeholder') || 'Rechercher dans les actualités...'}
//               value={searchQuery}
//               onChange={handleSearchChange}
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//             />
//             {searchQuery && (
//               <button
//                 onClick={clearSearch}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//               >
//                 <span className="text-gray-400 hover:text-gray-600">×</span>
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Article principal (dernier publié) */}
//         {latestPost && (
//           <div className="mb-12">
//             <h2 className="text-2xl font-bold mb-6 flex flex-wrap items-center justify-center md:justify-start">
//               <span className="bg-red-600 text-white px-3 py-1 mr-3 mb-2 rounded">
//                 {t('À LA UNE') || 'À LA UNE'}
//               </span>
//               {t('Dernière nouvelle') || 'Dernière nouvelle'}
//             </h2>
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <div className="flex flex-col md:flex-row">
//                 <div className="w-full md:w-1/2">
//                   {latestPost.image ? (
//                     <img 
//                       src={latestPost.image} 
//                       alt={getLocalizedContent(latestPost, 'title')} 
//                       className="w-full h-64 sm:h-80 md:h-full object-cover" 
//                     />
//                   ) : (
//                     <div className="w-full h-64 sm:h-80 md:h-full bg-gray-200 flex items-center justify-center">
//                       <p className="text-gray-500">{t('no_image') || 'Aucune image'}</p>
//                     </div>
//                   )}
//                 </div>
//                 <div className="p-6 flex flex-col justify-between w-full md:w-1/2">
//                   <div className="flex flex-col h-full">
//                     <h3 className="text-xl font-bold mb-3">
//                       {getLocalizedContent(latestPost, 'title')}
//                     </h3>
//                     <div className="flex-grow overflow-hidden">
//                       <p className={`text-gray-600 ${showFullContent ? '' : 'line-clamp-6 md:line-clamp-8 lg:text-base xl:text-lg'}`} 
//                          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', lineHeight: '1.6' }}>
//                         {getLocalizedContent(latestPost, 'content')}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="mt-4">
//                     <div className="flex items-center text-sm text-gray-500 mb-4">
//                       <Clock size={16} className="mr-1" />
//                       <span>{formatDate(latestPost.created_at)}</span>
//                     </div>
//                     <button
//                       className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center w-full md:w-auto transition-colors duration-300"
//                       onClick={toggleFullContent}
//                     >
//                       {showFullContent ? (
//                         <>
//                           {t('read_less') || 'Lire moins'}
//                           <ChevronUp size={16} className="ml-2" />
//                         </>
//                       ) : (
//                         <>
//                           {t('read_more') || 'Lire plus'}
//                           <ChevronDown size={16} className="ml-2" />
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Autres articles */}
//         <div className="mb-12">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-center md:text-left">
//               {t('Nouvelles récentes') || 'Nouvelles récentes'}
//             </h2>
//             <button
//               onClick={refreshBlogs}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-300"
//             >
//               {t('refresh') || 'Actualiser'}
//             </button>
//           </div>
          
//           {filteredBlogs.length === 0 ? (
//             <div className="text-center py-8">
//               <p className="text-gray-600">
//                 {searchQuery 
//                   ? (t('no_match') || 'Aucun article ne correspond à votre recherche.') 
//                   : (t('no_articles') || 'Aucun article disponible pour le moment.')
//                 }
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredBlogs.slice(1).map((blog) => (
//                 <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
//                   {blog.image ? (
//                     <img 
//                       src={blog.image} 
//                       alt={getLocalizedContent(blog, 'title')} 
//                       className="h-48 w-full object-cover" 
//                     />
//                   ) : (
//                     <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
//                       <p className="text-gray-500">{t('no_image') || 'Aucune image'}</p>
//                     </div>
//                   )}
//                   <div className="p-4 flex flex-col flex-grow">
//                     <h3 className="font-bold mb-2 text-lg">
//                       {getLocalizedContent(blog, 'title')}
//                     </h3>
//                     <div className="flex-grow">
//                       <p className={`text-gray-600 text-sm mb-3 ${expandedCards[blog.id] ? '' : 'line-clamp-3'}`}>
//                         {getLocalizedContent(blog, 'content')}
//                       </p>
//                     </div>
//                     <div className="flex justify-between items-center mt-2">
//                       <span className="text-xs text-gray-500 flex items-center">
//                         <Clock size={14} className="mr-1" />
//                         {formatDate(blog.created_at)}
//                       </span>
//                       <button
//                         className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
//                         onClick={() => toggleCardContent(blog.id)}
//                       >
//                         {expandedCards[blog.id] ? (
//                           <>
//                             {t('collapse') || 'Réduire'}
//                             <ChevronUp size={14} className="ml-1" />
//                           </>
//                         ) : (
//                           <>
//                             {t('read') || 'Lire'}
//                             <ChevronDown size={14} className="ml-1" />
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </main>

//       {/* ChatBot fixe */}
//       <div className="fixed bottom-6 right-6 z-50">
//         <ChatBotNew />
//       </div>
//     </div>
//   );
// };

// export default Actualites;

import React, { useEffect, useState } from 'react';
import ChatBotNew from "../ChatBot/ChatbotNew";
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronDown, ChevronUp, Search, X, Zap, TrendingUp, RefreshCw } from 'lucide-react';
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

  const getLocalizedContent = (blog, field) => {
    const currentLang = i18n.language || 'fr';
    const langMap = { 'fr': '_fr', 'en': '_en', 'ar': '_ar' };
    const suffix = langMap[currentLang] || '_fr';
    
    if (blog[field + suffix] && blog[field + suffix].trim()) {
      return blog[field + suffix];
    }
    if (blog[field + '_fr'] && blog[field + '_fr'].trim()) {
      return blog[field + '_fr'];
    }
    if (blog[field + '_en'] && blog[field + '_en'].trim()) {
      return blog[field + '_en'];
    }
    if (blog[field + '_ar'] && blog[field + '_ar'].trim()) {
      return blog[field + '_ar'];
    }
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

  const filteredBlogs = blogs.filter(blog => {
    const title = getLocalizedContent(blog, 'title').toLowerCase();
    const content = getLocalizedContent(blog, 'content').toLowerCase();
    const query = searchQuery.toLowerCase();
    return title.includes(query) || content.includes(query);
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const currentLang = i18n.language || 'fr';
    const localeMap = { 'fr': 'fr-FR', 'en': 'en-US', 'ar': 'ar-MA' };
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
      <div className="min-h-screen bg-[#0a0e27] relative overflow-hidden">
        {/* Effets de fond */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
        
        <div className="h-16"></div>
        <div className="pt-8"></div>
        <main className="container mx-auto px-4 py-8 relative">
          <div className="flex flex-col justify-center items-center h-64">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500/30 blur-2xl rounded-full animate-pulse"></div>
              <div className="relative w-16 h-16 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
            </div>
            <span className="mt-6 text-gray-400 text-lg font-semibold">{t('loading') || 'Chargement...'}</span>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0e27] relative overflow-hidden">
        {/* Effets de fond */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
        
        <div className="h-16"></div>
        <div className="pt-8"></div>
        <main className="container mx-auto px-4 py-8 relative">
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-2xl"></div>
            <div className="relative bg-red-500/20 border-2 border-red-500/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-red-400" />
                <p className="text-red-300 font-bold text-lg">{t('error_loading')} {error}</p>
              </div>
              <button 
                onClick={refreshBlogs}
                className="relative group/btn overflow-hidden w-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 blur-lg opacity-50 group-hover/btn:opacity-75 transition-opacity"></div>
                <div className="relative flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl font-black shadow-2xl border-2 border-red-400/50 group-hover/btn:scale-[1.02] transition-all">
                  <RefreshCw className="w-5 h-5" />
                  {t('retry') || 'Réessayer'}
                </div>
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] relative overflow-hidden">
      {/* Effets de fond lumineux */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grille de fond */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

      <div className="h-16"></div>
      <div className="pt-8"></div>

      <main className="container mx-auto px-4 py-8 relative">
        {/* Titre principal */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-orange-500/30 blur-2xl rounded-full animate-pulse"></div>
            <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-400 to-white tracking-tight">
              {t('news') || 'ACTUALITÉS'}
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 text-orange-400 font-bold">
            <Zap className="w-4 h-4" />
            <span>EN DIRECT DU TERRAIN</span>
            <Zap className="w-4 h-4" />
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Barre de recherche */}
        <div className="mb-12 max-w-xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative bg-[#0f1729]/90 backdrop-blur-xl rounded-xl border-2 border-orange-500/30 group-hover:border-orange-500/50 transition-all p-3">
              <div className="flex items-center">
                <Search className="h-5 w-5 text-orange-400 ml-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder={t('search_placeholder') || 'Rechercher dans les actualités...'}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 bg-transparent text-white placeholder-gray-500 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="ml-2 p-1 hover:bg-white/10 rounded transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-400 hover:text-white" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Article principal */}
        {latestPost && (
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500/50 blur-xl rounded-full animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-black text-sm shadow-2xl shadow-orange-500/50 border-2 border-orange-400/50 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  {t('À LA UNE') || 'À LA UNE'}
                </div>
              </div>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-orange-500/50 to-transparent rounded-full"></div>
            </div>

            <div className="relative group/featured">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-blue-500 to-orange-500 rounded-3xl blur opacity-30 group-hover/featured:opacity-50 transition-opacity animate-pulse"></div>
              
              <div className="relative bg-[#0f1729]/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border-2 border-orange-500/30 group-hover/featured:border-orange-500/50 transition-all">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2 relative overflow-hidden">
                    {latestPost.image ? (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1729] via-transparent to-transparent z-10"></div>
                        <img 
                          src={latestPost.image} 
                          alt={getLocalizedContent(latestPost, 'title')} 
                          className="w-full h-64 sm:h-80 md:h-full object-cover group-hover/featured:scale-110 transition-transform duration-700" 
                        />
                      </>
                    ) : (
                      <div className="w-full h-64 sm:h-80 md:h-full bg-gradient-to-br from-orange-500/20 to-blue-500/20 flex items-center justify-center">
                        <p className="text-gray-500 font-semibold">{t('no_image') || 'Aucune image'}</p>
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex flex-col justify-between w-full md:w-1/2">
                    <div className="flex flex-col h-full">
                      <h3 className="text-2xl md:text-3xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-400 to-white leading-tight">
                        {getLocalizedContent(latestPost, 'title')}
                      </h3>
                      <div className="flex-grow overflow-hidden">
                        <p className={`text-gray-400 leading-relaxed ${showFullContent ? '' : 'line-clamp-6'}`}>
                          {getLocalizedContent(latestPost, 'content')}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-orange-500/30 mb-4 inline-flex">
                        <Clock className="w-4 h-4 mr-2 text-orange-400" />
                        <span className="text-sm text-gray-300 font-semibold">{formatDate(latestPost.created_at)}</span>
                      </div>
                      <button
                        className="relative group/btn overflow-hidden w-full md:w-auto"
                        onClick={toggleFullContent}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 blur-lg opacity-50 group-hover/btn:opacity-75 transition-opacity"></div>
                        <div className="relative flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-black shadow-2xl shadow-orange-500/50 border-2 border-orange-400/50 group-hover/btn:scale-[1.02] transition-all">
                          {showFullContent ? (
                            <>
                              {t('read_less') || 'Lire moins'}
                              <ChevronUp className="w-4 h-4" />
                            </>
                          ) : (
                            <>
                              {t('read_more') || 'Lire plus'}
                              <ChevronDown className="w-4 h-4" />
                            </>
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Autres articles */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/50 blur-xl rounded-full"></div>
                <h2 className="relative text-2xl md:text-3xl font-black text-white">
                  {t('Nouvelles récentes') || 'Nouvelles récentes'}
                </h2>
              </div>
              <div className="h-0.5 w-16 bg-gradient-to-r from-blue-500/50 to-transparent rounded-full"></div>
            </div>
            <button
              onClick={refreshBlogs}
              className="relative group/refresh"
            >
              <div className="absolute inset-0 bg-blue-500/30 blur-lg opacity-0 group-hover/refresh:opacity-100 transition-opacity rounded-lg"></div>
              <div className="relative flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-blue-500/30 hover:border-blue-500/50 transition-all font-bold text-blue-400 hover:text-white">
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm">{t('refresh') || 'Actualiser'}</span>
              </div>
            </button>
          </div>
          
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-16">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full"></div>
                <p className="relative text-gray-400 text-lg font-semibold">
                  {searchQuery 
                    ? (t('no_match') || 'Aucun article ne correspond à votre recherche.') 
                    : (t('no_articles') || 'Aucun article disponible pour le moment.')
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.slice(1).map((blog) => (
                <div key={blog.id} className="relative group/card">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-blue-500 rounded-2xl blur opacity-0 group-hover/card:opacity-40 transition-opacity"></div>
                  
                  <div className="relative bg-[#0f1729]/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border-2 border-white/10 hover:border-orange-500/50 transition-all flex flex-col h-full">
                    <div className="relative h-48 overflow-hidden">
                      {blog.image ? (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1729] to-transparent z-10"></div>
                          <img 
                            src={blog.image} 
                            alt={getLocalizedContent(blog, 'title')} 
                            className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700" 
                          />
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orange-500/20 to-blue-500/20 flex items-center justify-center">
                          <p className="text-gray-500 text-sm font-semibold">{t('no_image') || 'Aucune image'}</p>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-black text-lg mb-3 text-white group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-gradient-to-r group-hover/card:from-orange-400 group-hover/card:to-blue-400 transition-all leading-tight">
                        {getLocalizedContent(blog, 'title')}
                      </h3>
                      <div className="flex-grow">
                        <p className={`text-gray-400 text-sm leading-relaxed mb-4 ${expandedCards[blog.id] ? '' : 'line-clamp-3'}`}>
                          {getLocalizedContent(blog, 'content')}
                        </p>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t-2 border-orange-500/20">
                        <span className="text-xs text-gray-500 flex items-center font-semibold">
                          <Clock className="w-3.5 h-3.5 mr-1 text-orange-400" />
                          {formatDate(blog.created_at)}
                        </span>
                        <button
                          className="flex items-center gap-1 text-orange-400 hover:text-white text-sm font-bold transition-colors"
                          onClick={() => toggleCardContent(blog.id)}
                        >
                          {expandedCards[blog.id] ? (
                            <>
                              {t('collapse') || 'Réduire'}
                              <ChevronUp className="w-4 h-4" />
                            </>
                          ) : (
                            <>
                              {t('read') || 'Lire'}
                              <ChevronDown className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
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

      {/* Particules décoratives */}
      <div className="absolute top-32 left-10 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
      <div className="absolute top-48 right-20 w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-32 left-20 w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default Actualites;
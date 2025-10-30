// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Clock, ChevronDown, ChevronUp, X } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import ChatBotNew from "../ChatBot/ChatbotNew";
// import CONFIG from "../../config/config.js";

// const Actualites = () => {
//   const { t, i18n } = useTranslation();
//   const [newsList, setNewsList] = useState([]);
//   const [latestNews, setLatestNews] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedNews, setSelectedNews] = useState(null);
//   const [expandedCards, setExpandedCards] = useState({});
//   const navigate = useNavigate();

//   const currentLang = i18n.language || "fr";

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         console.log("📡 Requête envoyée à :", CONFIG.API_NEWS_LIST);
//         const response = await fetch(CONFIG.API_NEWS_LIST);

//         if (!response.ok) throw new Error(`HTTP ${response.status}`);

//         const data = await response.json();
//         console.log("✅ Données reçues :", data);

//         const sorted = data.sort(
//           (a, b) => new Date(b.created_at) - new Date(a.created_at)
//         );

//         setNewsList(sorted);
//         setLatestNews(sorted[0] || null);
//       } catch (err) {
//         console.error("❌ Erreur :", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNews();
//   }, [navigate]);

//   const getLocalizedField = (item, base) => {
//     const key = `${base}_${currentLang}`;
//     return item[key] || item[`${base}_fr`] || "";
//   };

//   const filteredNews = newsList.filter((n) => {
//     const title = getLocalizedField(n, "title").toLowerCase();
//     const content = getLocalizedField(n, "content").toLowerCase();
//     const q = searchQuery.toLowerCase();
//     return title.includes(q) || content.includes(q);
//   });

//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString("fr-FR", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });

//   const toggleCardContent = (id) =>
//     setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));

//   const getImageUrl = (path) => {
//     if (!path) return null;
//     if (path.startsWith("http")) return path;
//     return `${CONFIG.BASE_URL}${path}`;
//   };

//   const openNewsModal = (news) => {
//     setSelectedNews(news);
//     document.body.style.overflow = 'hidden';
//   };

//   const closeNewsModal = () => {
//     setSelectedNews(null);
//     document.body.style.overflow = 'unset';
//   };

//   return (
//     <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
//       <section className="text-center py-12">
//       <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent mb-4">
//         Actualités
//       </h2>
//       <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//         Retrouvez les dernières nouvelles du Jorfof Basket Club, les matchs récents et les moments forts !
//       </p>
//       </section>
//       {/* Contenu principal */}
//       <main className="w-full px-4 py-12">
//         {/* Recherche */}
//         {/* <div className="max-w-xl mx-auto mb-12">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder={t("Rechercher une actualité...")}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-[#1C1C47] focus:border-transparent shadow-sm text-lg"
//             />
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery("")}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 <X size={24} />
//               </button>
//             )}
//           </div>
//         </div> */}

//         {/* États */}
//         {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1C1C47]"></div>
//             <span className="ml-4 text-gray-600 text-lg">{t("Chargement des actualités...")}</span>
//           </div>
//         ) : error ? (
//           <div className="max-w-4xl mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded shadow-md">
//             <p className="font-bold">{t("Erreur")}</p>
//             <p>{error}</p>
//           </div>
//         ) : (
//           <>
//             {/* Dernière actualité en vedette */}
//             {latestNews && (
//               <div className="max-w-7xl mx-auto mb-16">
//                 <h2 className="text-3xl font-bold mb-8 flex items-center">
//                   <span className="bg-red-600 text-white px-4 py-2 mr-4 rounded-lg text-base">
//                     {t("À LA UNE")}
//                   </span>
//                   {t("Dernière nouvelle")}
//                 </h2>

//                 <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
//                   <div className="grid md:grid-cols-2 gap-0">
//                     {/* Image */}
//                     <div className="relative h-96 md:h-auto overflow-hidden">
//                       {latestNews.image ? (
//                         <img
//                           src={getImageUrl(latestNews.image)}
//                           alt={getLocalizedField(latestNews, "title")}
//                           className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
//                         />
//                       ) : (
//                         <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
//                           <p className="text-gray-500 text-lg">{t("Pas d'image disponible")}</p>
//                         </div>
//                       )}
//                     </div>

//                     {/* Contenu */}
//                     <div className="p-8 md:p-10 flex flex-col justify-between">
//                       <div>
//                         <h3 className="text-3xl font-bold mb-6 text-[#1C1C47] leading-tight">
//                           {getLocalizedField(latestNews, "title")}
//                         </h3>
//                         <p className="text-gray-700 text-lg leading-relaxed line-clamp-6 mb-6">
//                           {getLocalizedField(latestNews, "content")}
//                         </p>
//                       </div>

//                       <div className="flex justify-between items-center pt-6 border-t border-gray-200">
//                         <div className="flex items-center text-gray-500">
//                           <Clock size={18} className="mr-2" />
//                           <span className="text-sm">{formatDate(latestNews.created_at)}</span>
//                         </div>
//                         <button
//                           className="bg-[#12138B] hover:bg-[#1e1fab] text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
//                           onClick={() => openNewsModal(latestNews)}
//                         >
//                           {t("Lire plus")}
//                           <ChevronDown size={18} />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Grille des autres actualités */}
//             <div className="max-w-7xl mx-auto">
//               <h2 className="text-3xl font-bold mb-8">{t("Autres actualités")}</h2>
//               <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//                 {filteredNews.length > 1 ? (
//                   filteredNews.slice(1).map((n) => (
//                     <div
//                       key={n.id}
//                       className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
//                       onClick={() => openNewsModal(n)}
//                     >
//                       {/* Image */}
//                       <div className="relative h-56 overflow-hidden">
//                         {n.image ? (
//                           <img
//                             src={getImageUrl(n.image)}
//                             alt={getLocalizedField(n, "title")}
//                             className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
//                           />
//                         ) : (
//                           <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
//                             <p className="text-gray-500">{t("Pas d'image disponible")}</p>
//                           </div>
//                         )}
//                       </div>

//                       {/* Contenu */}
//                       <div className="p-6">
//                         <h3 className="text-xl font-bold text-[#1C1C47] mb-3 line-clamp-2 leading-tight">
//                           {getLocalizedField(n, "title")}
//                         </h3>
//                         <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
//                           {getLocalizedField(n, "content")}
//                         </p>
//                         <div className="flex items-center text-sm text-gray-500 pt-4 border-t border-gray-100">
//                           <Clock size={14} className="mr-2" />
//                           <span>{formatDate(n.created_at)}</span>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="col-span-full text-center py-20">
//                     <p className="text-gray-500 text-lg">{t("Aucune actualité disponible pour le moment.")}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </>
//         )}
//       </main>

//       {/* Modal pour lire l'article complet */}
//       {selectedNews && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 overflow-y-auto">
//           <div className="bg-white rounded-2xl max-w-4xl w-full my-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
//             {/* Bouton fermer */}
//             <button
//               onClick={closeNewsModal}
//               className="sticky top-4 right-4 float-right bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
//             >
//               <X size={24} className="text-gray-600" />
//             </button>

//             {/* Image */}
//             {selectedNews.image && (
//               <div className="w-full h-96 overflow-hidden">
//                 <img
//                   src={getImageUrl(selectedNews.image)}
//                   alt={getLocalizedField(selectedNews, "title")}
//                   className="w-full h-full object-cover object-center"
//                 />
//               </div>
//             )}

//             {/* Contenu */}
//             <div className="p-8 md:p-12">
//               <div className="flex items-center text-gray-500 mb-4">
//                 <Clock size={16} className="mr-2" />
//                 <span className="text-sm">{formatDate(selectedNews.created_at)}</span>
//               </div>
              
//               <h2 className="text-4xl font-bold text-[#1C1C47] mb-6 leading-tight">
//                 {getLocalizedField(selectedNews, "title")}
//               </h2>
              
//               <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
//                 {getLocalizedField(selectedNews, "content")}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ChatBot */}
//       <div className="fixed bottom-6 right-6 z-40">
//         <ChatBotNew />
//       </div>
//     </div>
//   );
// };

// export default Actualites;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, X, Zap, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import ChatBotNew from "../ChatBot/ChatbotNew";
import CONFIG from "../../config/config.js";

const Actualites = () => {
  const { t, i18n } = useTranslation();
  const [newsList, setNewsList] = useState([]);
  const [latestNews, setLatestNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNews, setSelectedNews] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});
  const navigate = useNavigate();

  const currentLang = i18n.language || "fr";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        console.log("📡 Requête envoyée à :", CONFIG.API_NEWS_LIST);
        const response = await fetch(CONFIG.API_NEWS_LIST);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        console.log("✅ Données reçues :", data);

        const sorted = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setNewsList(sorted);
        setLatestNews(sorted[0] || null);
      } catch (err) {
        console.error("❌ Erreur :", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [navigate]);

  const getLocalizedField = (item, base) => {
    const key = `${base}_${currentLang}`;
    return item[key] || item[`${base}_fr`] || "";
  };

  const filteredNews = newsList.filter((n) => {
    const title = getLocalizedField(n, "title").toLowerCase();
    const content = getLocalizedField(n, "content").toLowerCase();
    const q = searchQuery.toLowerCase();
    return title.includes(q) || content.includes(q);
  });

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const toggleCardContent = (id) =>
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));

  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `${CONFIG.BASE_URL}${path}`;
  };

  const openNewsModal = (news) => {
    setSelectedNews(news);
    document.body.style.overflow = 'hidden';
  };

  const closeNewsModal = () => {
    setSelectedNews(null);
    document.body.style.overflow = 'unset';
  };

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

      {/* Header Section */}
      <section className="relative text-center py-16 px-4">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-orange-500/30 blur-2xl rounded-full animate-pulse"></div>
          <div className="relative">
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-400 to-white mb-2 tracking-tight">
              ACTUALITÉS
            </h2>
            <div className="flex items-center justify-center gap-2 text-orange-400 font-bold text-sm">
              <Zap className="w-4 h-4" />
              <span>EN DIRECT DU TERRAIN</span>
              <Zap className="w-4 h-4" />
            </div>
          </div>
        </div>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-semibold">
          Retrouvez les dernières nouvelles du Jorfof Basket Club, les matchs récents et les moments forts !
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mt-6 rounded-full"></div>
      </section>

      {/* Contenu principal */}
      <main className="relative w-full px-4 py-12">
        {/* États */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500/30 blur-2xl rounded-full animate-pulse"></div>
              <div className="relative w-16 h-16 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
            </div>
            <span className="mt-6 text-gray-400 text-lg font-semibold">{t("Chargement des actualités...")}</span>
          </div>
        ) : error ? (
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-2xl"></div>
            <div className="relative bg-red-500/20 border-2 border-red-500/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-red-400" />
                <div>
                  <p className="font-black text-red-300 text-lg">{t("Erreur")}</p>
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Dernière actualité en vedette */}
            {latestNews && (
              <div className="max-w-7xl mx-auto mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-orange-500/50 blur-xl rounded-full animate-pulse"></div>
                    <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-black text-sm shadow-2xl shadow-orange-500/50 border-2 border-orange-400/50 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      {t("À LA UNE")}
                    </div>
                  </div>
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-orange-500/50 to-transparent rounded-full"></div>
                </div>

                <div className="relative group/featured">
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-blue-500 to-orange-500 rounded-3xl blur opacity-30 group-hover/featured:opacity-50 transition-opacity animate-pulse"></div>
                  
                  <div className="relative bg-[#0f1729]/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border-2 border-orange-500/30 group-hover/featured:border-orange-500/50 transition-all">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Image */}
                      <div className="relative h-96 md:h-auto overflow-hidden">
                        {latestNews.image ? (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1729] via-transparent to-transparent z-10"></div>
                            <img
                              src={getImageUrl(latestNews.image)}
                              alt={getLocalizedField(latestNews, "title")}
                              className="w-full h-full object-cover object-center group-hover/featured:scale-110 transition-transform duration-700"
                            />
                          </>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-orange-500/20 to-blue-500/20 flex items-center justify-center">
                            <p className="text-gray-500 text-lg font-semibold">{t("Pas d'image disponible")}</p>
                          </div>
                        )}
                      </div>

                      {/* Contenu */}
                      <div className="p-8 md:p-10 flex flex-col justify-between">
                        <div>
                          <h3 className="text-3xl md:text-4xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-400 to-white leading-tight">
                            {getLocalizedField(latestNews, "title")}
                          </h3>
                          <p className="text-gray-400 text-lg leading-relaxed line-clamp-6 mb-6">
                            {getLocalizedField(latestNews, "content")}
                          </p>
                        </div>

                        <div className="flex justify-between items-center pt-6 border-t-2 border-orange-500/20">
                          <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-orange-500/30">
                            <Clock className="w-4 h-4 mr-2 text-orange-400" />
                            <span className="text-sm text-gray-300 font-semibold">{formatDate(latestNews.created_at)}</span>
                          </div>
                          <button
                            className="relative group/btn overflow-hidden"
                            onClick={() => openNewsModal(latestNews)}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 blur-lg opacity-50 group-hover/btn:opacity-75 transition-opacity"></div>
                            <div className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-black shadow-2xl shadow-orange-500/50 border-2 border-orange-400/50 group-hover/btn:scale-105 transition-all duration-300">
                              {t("Lire plus")}
                              <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Grille des autres actualités */}
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/50 blur-xl rounded-full"></div>
                  <h2 className="relative text-3xl font-black text-white">{t("Autres actualités")}</h2>
                </div>
                <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent rounded-full"></div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredNews.length > 1 ? (
                  filteredNews.slice(1).map((n) => (
                    <div
                      key={n.id}
                      className="relative group/card cursor-pointer"
                      onClick={() => openNewsModal(n)}
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-blue-500 rounded-2xl blur opacity-0 group-hover/card:opacity-40 transition-opacity"></div>
                      
                      <div className="relative bg-[#0f1729]/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border-2 border-white/10 group-hover/card:border-orange-500/50 transition-all">
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          {n.image ? (
                            <>
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1729] to-transparent z-10"></div>
                              <img
                                src={getImageUrl(n.image)}
                                alt={getLocalizedField(n, "title")}
                                className="w-full h-full object-cover object-center group-hover/card:scale-110 transition-transform duration-700"
                              />
                            </>
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-orange-500/20 to-blue-500/20 flex items-center justify-center">
                              <p className="text-gray-500 text-sm font-semibold">{t("Pas d'image disponible")}</p>
                            </div>
                          )}
                        </div>

                        {/* Contenu */}
                        <div className="p-6">
                          <h3 className="text-xl font-black text-white mb-3 line-clamp-2 leading-tight group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-gradient-to-r group-hover/card:from-orange-400 group-hover/card:to-blue-400 transition-all duration-300">
                            {getLocalizedField(n, "title")}
                          </h3>
                          <p className="text-gray-400 line-clamp-3 mb-4 leading-relaxed text-sm">
                            {getLocalizedField(n, "content")}
                          </p>
                          <div className="flex items-center justify-between pt-4 border-t-2 border-orange-500/20">
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-2 text-orange-400" />
                              <span className="font-semibold">{formatDate(n.created_at)}</span>
                            </div>
                            <span className="text-orange-400 text-sm font-black group-hover/card:translate-x-1 transition-transform duration-300">
                              →
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-20">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full"></div>
                      <p className="relative text-gray-400 text-lg font-semibold">{t("Aucune actualité disponible pour le moment.")}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Modal pour lire l'article complet */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative my-8 w-full max-w-4xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-blue-500 to-orange-500 rounded-3xl blur opacity-50 animate-pulse"></div>
            
            <div className="relative bg-[#0f1729]/98 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-orange-500/30 max-h-[90vh] overflow-y-auto">
              {/* Bouton fermer */}
              <button
                onClick={closeNewsModal}
                className="sticky top-4 right-4 float-right z-10 group/close"
              >
                <div className="absolute inset-0 bg-red-500/30 blur-lg opacity-0 group-hover/close:opacity-100 transition-opacity rounded-full"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-red-500/20 transition-all border-2 border-white/20 hover:border-red-500/50">
                  <X className="w-6 h-6 text-white" />
                </div>
              </button>

              {/* Image */}
              {selectedNews.image && (
                <div className="relative w-full h-96 overflow-hidden rounded-t-3xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1729] via-transparent to-transparent z-10"></div>
                  <img
                    src={getImageUrl(selectedNews.image)}
                    alt={getLocalizedField(selectedNews, "title")}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              )}

              {/* Contenu */}
              <div className="p-8 md:p-12">
                <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-orange-500/30 mb-6 inline-flex">
                  <Clock className="w-4 h-4 mr-2 text-orange-400" />
                  <span className="text-sm text-gray-300 font-semibold">{formatDate(selectedNews.created_at)}</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-400 to-white mb-8 leading-tight">
                  {getLocalizedField(selectedNews, "title")}
                </h2>
                
                <div className="prose prose-lg max-w-none text-gray-300 leading-relaxed whitespace-pre-line">
                  {getLocalizedField(selectedNews, "content")}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ChatBot */}
      <div className="fixed bottom-6 right-6 z-40">
        <ChatBotNew />
      </div>

      {/* Particules décoratives */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 right-10 w-3 h-3 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
    </div>
  );
};

export default Actualites;
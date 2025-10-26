// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Clock, ChevronDown, ChevronUp } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import ChatBotNew from "../ChatBot/ChatbotNew";
// import CONFIG from "../../config/config.js"; // import centralisé

// const Actualites = () => {
//   const { t, i18n } = useTranslation();
//   const [blogs, setBlogs] = useState([]);
//   const [latestPost, setLatestPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showFullContent, setShowFullContent] = useState(false);
//   const [expandedCards, setExpandedCards] = useState({});
//   const navigate = useNavigate();

//   const currentLang = i18n.language || "fr";

//   // 🌀 Charger les blogs depuis le backend Django
//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         console.log("📡 Requête envoyée à :", CONFIG.API_BLOG);
//         const response = await fetch(CONFIG.API_BLOG);

//         if (!response.ok) throw new Error(`HTTP ${response.status}`);

//         const data = await response.json();
//         console.log("✅ Données reçues :", data);

//         const sorted = data.sort(
//           (a, b) => new Date(b.created_at) - new Date(a.created_at)
//         );

//         setBlogs(sorted);
//         setLatestPost(sorted[0] || null);
//       } catch (err) {
//         console.error("❌ Erreur :", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogs();
//   }, [navigate]);

//   // 🌍 Récupération des champs selon la langue
//   const getLocalizedField = (item, base) => {
//     const key = `${base}_${currentLang}`;
//     return item[key] || item[`${base}_fr`] || "";
//   };

//   // 🔎 Filtrage de la recherche
//   const filteredBlogs = blogs.filter((b) => {
//     const title = getLocalizedField(b, "title").toLowerCase();
//     const content = getLocalizedField(b, "content").toLowerCase();
//     const q = searchQuery.toLowerCase();
//     return title.includes(q) || content.includes(q);
//   });

//   // 🗓️ Formatage de la date
//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString("fr-FR", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//   const toggleFullContent = () => setShowFullContent(!showFullContent);
//   const toggleCardContent = (id) =>
//     setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));

//   // 🖼️ Fonction pour l’URL complète de l’image
//   const getImageUrl = (path) => {
//     if (!path) return null;
//     if (path.startsWith("http")) return path;
//     return `${CONFIG.BASE_URL}${path}`;
//   };

//   return (
//     <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
//       {/* 🌐 En-tête */}
//       <header className="bg-gradient-to-r from-[#1C1C47] to-[#12138B] text-white text-center py-8 px-4 shadow-md">
//         <div className="pt-10">
//           <h1 className="text-4xl font-bold mb-4">{t("Actualités")}</h1>
//           <p className="max-w-2xl mx-auto text-lg opacity-90">
//             {t("Découvrez les dernières nouvelles et mises à jour de la Fondation Tamkine")}
//           </p>
//         </div>
//       </header>

//       {/* 📄 Contenu principal */}
//       <main className="container mx-auto px-4 py-12 max-w-6xl">
//         {/* 🔍 Recherche */}
//         <div className="max-w-md mx-auto mb-10">
//           <input
//             type="text"
//             placeholder={t("Rechercher une actualité...")}
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1C1C47]"
//           />
//           {searchQuery && (
//             <button
//               onClick={() => setSearchQuery("")}
//               className="mt-2 text-[#1C1C47] hover:text-[#3b3b82]"
//             >
//               {t("Effacer la recherche")}
//             </button>
//           )}
//         </div>

//         {/* ⚙️ États : Chargement / Erreur / Données */}
//         {loading ? (
//           <div className="flex justify-center items-center py-10">
//             <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1C1C47]"></div>
//             <span className="ml-3 text-gray-600">
//               {t("Chargement des actualités...")}
//             </span>
//           </div>
//         ) : error ? (
//           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
//             <p className="font-bold">{t("Erreur")}</p>
//             <p>{error}</p>
//           </div>
//         ) : (
//           <>
//             {/* 📰 Dernière actualité */}
//             {latestPost && (
//               <div className="mb-12">
//                 <h2 className="text-2xl font-bold mb-6 flex items-center justify-center md:justify-start">
//                   <span className="bg-red-600 text-white px-3 py-1 mr-3 rounded">
//                     {t("À LA UNE")}
//                   </span>
//                   {t("Dernière nouvelle")}
//                 </h2>

//                 <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
//                   <div className="flex flex-col md:flex-row">
//                     <div className="w-full md:w-1/2">
//                       {latestPost.image ? (
//                         <img
//                           src={getImageUrl(latestPost.image)}
//                           alt={getLocalizedField(latestPost, "title")}
//                           className="w-full h-64 object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
//                           <p className="text-gray-500">{t("Pas d'image disponible")}</p>
//                         </div>
//                       )}
//                     </div>

//                     <div className="p-6 flex flex-col justify-between w-full md:w-1/2">
//                       <h3 className="text-2xl font-bold mb-4 text-[#1C1C47]">
//                         {getLocalizedField(latestPost, "title")}
//                       </h3>
//                       <p
//                         className={`text-gray-600 ${
//                           showFullContent ? "" : "line-clamp-6"
//                         }`}
//                       >
//                         {getLocalizedField(latestPost, "content")}
//                       </p>

//                       <div className="mt-6 flex justify-between items-center">
//                         <div className="flex items-center text-sm text-gray-500">
//                           <Clock size={16} className="mr-1" />
//                           <span>{formatDate(latestPost.created_at)}</span>
//                         </div>
//                         <button
//                           className="bg-[#12138B] hover:bg-[#1e1fab] text-white px-5 py-2 rounded-lg flex items-center"
//                           onClick={toggleFullContent}
//                         >
//                           {showFullContent ? (
//                             <>
//                               {t("Réduire")}
//                               <ChevronUp size={16} className="ml-2" />
//                             </>
//                           ) : (
//                             <>
//                               {t("Lire plus")}
//                               <ChevronDown size={16} className="ml-2" />
//                             </>
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* 📚 Autres actualités */}
//             <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//               {filteredBlogs.length > 1 ? (
//                 filteredBlogs.slice(1).map((b) => (
//                   <div
//                     key={b.id}
//                     className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
//                   >
//                     {b.image ? (
//                       <img
//                         src={getImageUrl(b.image)}
//                         alt={getLocalizedField(b, "title")}
//                         className="w-full h-40 object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
//                         <p className="text-gray-500">{t("Pas d'image disponible")}</p>
//                       </div>
//                     )}
//                     <div className="p-4">
//                       <h3 className="text-xl font-semibold text-[#1C1C47] mb-2">
//                         {getLocalizedField(b, "title")}
//                       </h3>
//                       <p
//                         className={`text-gray-600 ${
//                           expandedCards[b.id] ? "" : "line-clamp-4"
//                         }`}
//                       >
//                         {getLocalizedField(b, "content")}
//                       </p>
//                       <button
//                         onClick={() => toggleCardContent(b.id)}
//                         className="mt-3 bg-[#1C1C47] text-white px-4 py-2 rounded-lg w-full hover:bg-[#12138B]"
//                       >
//                         {expandedCards[b.id] ? t("Lire moins") : t("Lire plus")}
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-center text-gray-600 py-10">
//                   {t("Aucune actualité disponible pour le moment.")}
//                 </p>
//               )}
//             </div>
//           </>
//         )}
//       </main>

//       {/* 🤖 ChatBot */}
//       <div className="fixed bottom-6 right-6 z-50">
//         <ChatBotNew />
//       </div>
//     </div>
//   );
// };

// export default Actualites;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import ChatBotNew from "../ChatBot/ChatbotNew";
import CONFIG from "../../config/config.js"; // import centralisé

const Actualites = () => {
  const { t, i18n } = useTranslation();
  const [newsList, setNewsList] = useState([]);
  const [latestNews, setLatestNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFullContent, setShowFullContent] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});
  const navigate = useNavigate();

  const currentLang = i18n.language || "fr";

  // 🌀 Charger les actualités depuis le backend Django
  useEffect(() => {
    const fetchNews = async () => {
      try {
        console.log("📡 Requête envoyée à :", CONFIG.API_NEWS_LIST);
        const response = await fetch(CONFIG.API_NEWS_LIST);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        console.log("✅ Données reçues :", data);

        // Trier par date décroissante
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

  // 🌍 Récupération du champ selon la langue
  const getLocalizedField = (item, base) => {
    const key = `${base}_${currentLang}`;
    return item[key] || item[`${base}_fr`] || "";
  };

  // 🔎 Filtrage par recherche
  const filteredNews = newsList.filter((n) => {
    const title = getLocalizedField(n, "title").toLowerCase();
    const content = getLocalizedField(n, "content").toLowerCase();
    const q = searchQuery.toLowerCase();
    return title.includes(q) || content.includes(q);
  });

  // 🗓️ Formatage de la date
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const toggleFullContent = () => setShowFullContent(!showFullContent);
  const toggleCardContent = (id) =>
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));

  // 🖼️ Fonction pour afficher l’image Cloudinary
  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `${CONFIG.BASE_URL}${path}`;
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* 🌐 En-tête */}
      <header className="bg-gradient-to-r from-[#1C1C47] to-[#12138B] text-white text-center py-8 px-4 shadow-md">
        <div className="pt-10">
          <h1 className="text-4xl font-bold mb-4">{t("Actualités")}</h1>
          <p className="max-w-2xl mx-auto text-lg opacity-90">
            {t("Découvrez les dernières nouvelles et mises à jour de la Fondation Tamkine")}
          </p>
        </div>
      </header>

      {/* 📄 Contenu principal */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* 🔍 Recherche */}
        <div className="max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder={t("Rechercher une actualité...")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1C1C47]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="mt-2 text-[#1C1C47] hover:text-[#3b3b82]"
            >
              {t("Effacer la recherche")}
            </button>
          )}
        </div>

        {/* ⚙️ États */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1C1C47]"></div>
            <span className="ml-3 text-gray-600">{t("Chargement des actualités...")}</span>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
            <p className="font-bold">{t("Erreur")}</p>
            <p>{error}</p>
          </div>
        ) : (
          <>
            {/* 📰 Dernière actualité */}
            {latestNews && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center justify-center md:justify-start">
                  <span className="bg-red-600 text-white px-3 py-1 mr-3 rounded">
                    {t("À LA UNE")}
                  </span>
                  {t("Dernière nouvelle")}
                </h2>

                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2">
                      {latestNews.image ? (
                        <img
                          src={getImageUrl(latestNews.image)}
                          alt={getLocalizedField(latestNews, "title")}
                          className="w-full h-64 object-cover"
                        />
                      ) : (
                        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                          <p className="text-gray-500">{t("Pas d'image disponible")}</p>
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col justify-between w-full md:w-1/2">
                      <h3 className="text-2xl font-bold mb-4 text-[#1C1C47]">
                        {getLocalizedField(latestNews, "title")}
                      </h3>
                      <p
                        className={`text-gray-600 ${
                          showFullContent ? "" : "line-clamp-6"
                        }`}
                      >
                        {getLocalizedField(latestNews, "content")}
                      </p>

                      <div className="mt-6 flex justify-between items-center">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock size={16} className="mr-1" />
                          <span>{formatDate(latestNews.created_at)}</span>
                        </div>
                        <button
                          className="bg-[#12138B] hover:bg-[#1e1fab] text-white px-5 py-2 rounded-lg flex items-center"
                          onClick={toggleFullContent}
                        >
                          {showFullContent ? (
                            <>
                              {t("Réduire")}
                              <ChevronUp size={16} className="ml-2" />
                            </>
                          ) : (
                            <>
                              {t("Lire plus")}
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

            {/* 📚 Autres actualités */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredNews.length > 1 ? (
                filteredNews.slice(1).map((n) => (
                  <div
                    key={n.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    {n.image ? (
                      <img
                        src={getImageUrl(n.image)}
                        alt={getLocalizedField(n, "title")}
                        className="w-full h-40 object-cover"
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                        <p className="text-gray-500">{t("Pas d'image disponible")}</p>
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-[#1C1C47] mb-2">
                        {getLocalizedField(n, "title")}
                      </h3>
                      <p
                        className={`text-gray-600 ${
                          expandedCards[n.id] ? "" : "line-clamp-4"
                        }`}
                      >
                        {getLocalizedField(n, "content")}
                      </p>
                      <button
                        onClick={() => toggleCardContent(n.id)}
                        className="mt-3 bg-[#1C1C47] text-white px-4 py-2 rounded-lg w-full hover:bg-[#12138B]"
                      >
                        {expandedCards[n.id] ? t("Lire moins") : t("Lire plus")}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 py-10">
                  {t("Aucune actualité disponible pour le moment.")}
                </p>
              )}
            </div>
          </>
        )}
      </main>

      {/* 🤖 ChatBot */}
      <div className="fixed bottom-6 right-6 z-50">
        <ChatBotNew />
      </div>
    </div>
  );
};

export default Actualites;

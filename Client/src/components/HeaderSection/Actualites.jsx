import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, ChevronDown, ChevronUp, X } from "lucide-react";
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
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <section className="text-center py-12">
      <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent mb-4">
        Actualités
      </h2>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        Retrouvez les dernières nouvelles du Jorfof Basket Club, les matchs récents et les moments forts !
      </p>
      </section>
      {/* Contenu principal */}
      <main className="w-full px-4 py-12">
        {/* Recherche */}
        {/* <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder={t("Rechercher une actualité...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-[#1C1C47] focus:border-transparent shadow-sm text-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            )}
          </div>
        </div> */}

        {/* États */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1C1C47]"></div>
            <span className="ml-4 text-gray-600 text-lg">{t("Chargement des actualités...")}</span>
          </div>
        ) : error ? (
          <div className="max-w-4xl mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded shadow-md">
            <p className="font-bold">{t("Erreur")}</p>
            <p>{error}</p>
          </div>
        ) : (
          <>
            {/* Dernière actualité en vedette */}
            {latestNews && (
              <div className="max-w-7xl mx-auto mb-16">
                <h2 className="text-3xl font-bold mb-8 flex items-center">
                  <span className="bg-red-600 text-white px-4 py-2 mr-4 rounded-lg text-base">
                    {t("À LA UNE")}
                  </span>
                  {t("Dernière nouvelle")}
                </h2>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="relative h-96 md:h-auto overflow-hidden">
                      {latestNews.image ? (
                        <img
                          src={getImageUrl(latestNews.image)}
                          alt={getLocalizedField(latestNews, "title")}
                          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <p className="text-gray-500 text-lg">{t("Pas d'image disponible")}</p>
                        </div>
                      )}
                    </div>

                    {/* Contenu */}
                    <div className="p-8 md:p-10 flex flex-col justify-between">
                      <div>
                        <h3 className="text-3xl font-bold mb-6 text-[#1C1C47] leading-tight">
                          {getLocalizedField(latestNews, "title")}
                        </h3>
                        <p className="text-gray-700 text-lg leading-relaxed line-clamp-6 mb-6">
                          {getLocalizedField(latestNews, "content")}
                        </p>
                      </div>

                      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                        <div className="flex items-center text-gray-500">
                          <Clock size={18} className="mr-2" />
                          <span className="text-sm">{formatDate(latestNews.created_at)}</span>
                        </div>
                        <button
                          className="bg-[#12138B] hover:bg-[#1e1fab] text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
                          onClick={() => openNewsModal(latestNews)}
                        >
                          {t("Lire plus")}
                          <ChevronDown size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Grille des autres actualités */}
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">{t("Autres actualités")}</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredNews.length > 1 ? (
                  filteredNews.slice(1).map((n) => (
                    <div
                      key={n.id}
                      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
                      onClick={() => openNewsModal(n)}
                    >
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden">
                        {n.image ? (
                          <img
                            src={getImageUrl(n.image)}
                            alt={getLocalizedField(n, "title")}
                            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                            <p className="text-gray-500">{t("Pas d'image disponible")}</p>
                          </div>
                        )}
                      </div>

                      {/* Contenu */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-[#1C1C47] mb-3 line-clamp-2 leading-tight">
                          {getLocalizedField(n, "title")}
                        </h3>
                        <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                          {getLocalizedField(n, "content")}
                        </p>
                        <div className="flex items-center text-sm text-gray-500 pt-4 border-t border-gray-100">
                          <Clock size={14} className="mr-2" />
                          <span>{formatDate(n.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-20">
                    <p className="text-gray-500 text-lg">{t("Aucune actualité disponible pour le moment.")}</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Modal pour lire l'article complet */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full my-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Bouton fermer */}
            <button
              onClick={closeNewsModal}
              className="sticky top-4 right-4 float-right bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
            >
              <X size={24} className="text-gray-600" />
            </button>

            {/* Image */}
            {selectedNews.image && (
              <div className="w-full h-96 overflow-hidden">
                <img
                  src={getImageUrl(selectedNews.image)}
                  alt={getLocalizedField(selectedNews, "title")}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            )}

            {/* Contenu */}
            <div className="p-8 md:p-12">
              <div className="flex items-center text-gray-500 mb-4">
                <Clock size={16} className="mr-2" />
                <span className="text-sm">{formatDate(selectedNews.created_at)}</span>
              </div>
              
              <h2 className="text-4xl font-bold text-[#1C1C47] mb-6 leading-tight">
                {getLocalizedField(selectedNews, "title")}
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                {getLocalizedField(selectedNews, "content")}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ChatBot */}
      <div className="fixed bottom-6 right-6 z-40">
        <ChatBotNew />
      </div>
    </div>
  );
};

export default Actualites;

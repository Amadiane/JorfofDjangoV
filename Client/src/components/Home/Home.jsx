import React, { useEffect, useState } from "react";
import CONFIG from "../../config/config.js";
import { useTranslation } from "react-i18next";
import { Loader, AlertCircle } from "lucide-react";

const Home = () => {
  const { i18n, t } = useTranslation();
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Scroll vers le haut au chargement de la page
useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, []); 

  // Fetch Home data
  useEffect(() => {
    const fetchHome = async () => {
      try {
        const response = await fetch(CONFIG.API_HOME_LIST);
        if (!response.ok) throw new Error(t("Erreur API Home"));
        const data = await response.json();
        setHomes(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("Erreur Home API:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHome();
  }, [t]);

  // Localisation
  const getLocalized = (obj, field) => {
    const lang = i18n.language || "fr";
    return (
      obj?.[`${field}_${lang}`] ||
      obj?.[`${field}_fr`] ||
      obj?.[`${field}_en`] ||
      ""
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center">
        <Loader className="w-12 h-12 text-orange-500 animate-spin" />
        <p className="text-white ml-4">{t("Chargement...")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center px-4">
        <div className="bg-red-500/10 border-2 border-red-500/50 text-white p-6 rounded-2xl shadow-2xl backdrop-blur-xl max-w-md">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <p className="font-bold text-xl">{t("Erreur")}</p>
          </div>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  if (!homes.length) {
    return (
      <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center px-4">
        <div className="text-center py-20 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-orange-500/30 px-8 max-w-2xl">
          <p className="text-white text-2xl font-bold mb-2">{t("Aucun contenu trouvé")}</p>
          <p className="text-gray-400 text-lg">{t("Revenez plus tard pour découvrir notre contenu.")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] w-full relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        <div className="h-20 md:h-24"></div>

        <div className="py-12 md:py-20 px-4">
          <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">
            {homes.map((home, index) => (
              <div key={home.id || index} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-blue-500 to-purple-500 rounded-2xl md:rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition duration-700"></div>

                <div className="relative bg-[#0f1729]/90 backdrop-blur-xl rounded-2xl md:rounded-3xl overflow-hidden border-2 border-orange-500/30 shadow-2xl">
                  {/* Image Section */}
                  {home.image_url ? (
                    <div className="relative h-64 md:h-96 lg:h-[500px] overflow-hidden">
                      <img
                        src={home.image_url}
                        alt={getLocalized(home, "title")}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentElement.innerHTML =
                            '<div class="flex items-center justify-center h-full text-gray-500 italic">Image non disponible</div>';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1729]/50 to-transparent pointer-events-none"></div>
                    </div>
                  ) : (
                    <div className="h-64 md:h-96 flex items-center justify-center">
                      <p className="text-gray-500 italic text-lg">{t("Aucune image")}</p>
                    </div>
                  )}

                  {/* Text Section */}
                  <div className="p-8 md:p-12 lg:p-16">
                    <div className="max-w-4xl mx-auto text-center">
                      <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-400 to-white mb-6 md:mb-8 leading-tight tracking-tight">
                        {getLocalized(home, "title")}
                      </h1>
                      <div className="w-24 md:w-32 h-1 md:h-1.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full mb-8 md:mb-12 mx-auto"></div>
                      <p className="text-base md:text-xl lg:text-2xl text-gray-300 leading-relaxed md:leading-loose md:pl-8">
                        {getLocalized(home, "description")}
                      </p>

                      <div className="mt-12 inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-blue-500/20 backdrop-blur-sm border border-orange-500/30 px-6 py-3 rounded-full">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                        <span className="text-orange-300 text-sm font-bold uppercase tracking-wide">
                          {t("Jorfof Basketball Club")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

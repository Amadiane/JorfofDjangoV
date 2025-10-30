import React, { useEffect, useState } from "react";
import { Handshake, Zap, Sparkles, Award } from "lucide-react";
import CONFIG from "../../config/config.js"; // ✅ ajoute ton fichier config

const Partner = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les partenaires depuis l'API Django
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch(CONFIG.API_PARTNER_LIST);
        if (!response.ok) throw new Error("Erreur API");
        const data = await response.json();

        // 🔽 Si Django renvoie un objet {results: [...]}
        const partnerData = Array.isArray(data) ? data : data.results || [];
        setPartners(partnerData);
      } catch (error) {
        console.error("Erreur API partenaires:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0e27] relative overflow-hidden w-full">
      {/* Effets de fond lumineux - couvrent toute la largeur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grille de fond - couvre toute la largeur */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

      {/* Header avec halo lumineux */}
      <div className="relative pt-32 pb-16 text-center px-6 lg:px-20">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-orange-500/30 to-blue-500/30 blur-3xl scale-150 animate-pulse"></div>
          
          <div className="relative">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-full mb-6 shadow-2xl shadow-orange-500/50 animate-pulse">
              <Handshake className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-400 to-white mb-4 tracking-tight">
              NOS PARTENAIRES
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-medium mb-6">
              Découvrez les partenaires qui soutiennent le <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400">Jorfof Club</span> dans son aventure !
            </p>
            
            <div className="relative w-32 h-1 mx-auto mt-6 overflow-hidden rounded-full">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-orange-500 to-blue-500 animate-pulse" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="relative container mx-auto px-6 lg:px-20 pb-16 w-full">
        {/* Titre section */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full"></div>
            <h2 className="relative text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-400 to-white mb-3">
              Partenaires Officiels
            </h2>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Sparkles className="w-5 h-5 text-orange-400" />
            <span className="text-sm font-semibold">Ils croient en notre vision</span>
            <Sparkles className="w-5 h-5 text-orange-400" />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-orange-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-0 border-4 border-t-orange-500 rounded-full animate-spin"></div>
            </div>
            <span className="text-white text-lg mt-6 font-semibold">Chargement des partenaires...</span>
          </div>
        ) : partners.length === 0 ? (
          <div className="max-w-4xl mx-auto text-center py-20 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-orange-500/30 px-4">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Handshake className="w-12 h-12 text-orange-400" />
            </div>
            <p className="text-white text-2xl font-bold mb-2">Aucun partenaire disponible</p>
            <p className="text-gray-400 text-lg">Revenez bientôt pour découvrir nos partenaires</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="relative group cursor-pointer"
                onClick={() => window.open(partner.website_url || "#", "_blank")}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-blue-500 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500 animate-pulse"></div>
                
                <div className="relative bg-[#0f1729]/80 backdrop-blur-xl rounded-2xl overflow-hidden border-2 border-orange-500/20 group-hover:border-orange-500/60 transition-all duration-500 shadow-2xl group-hover:shadow-orange-500/20 hover:scale-105 p-6">
                  <div className="relative w-full h-32 mb-4 flex items-center justify-center bg-white/5 rounded-xl">
                    <img
                      src={partner.cover_image_url || "/placeholder.png"}
                      alt={partner.name_en || partner.name_fr}
                      className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  <h3 className="text-center text-white font-bold text-sm truncate group-hover:text-orange-400 transition-colors">
                    {partner.name_en || partner.name_fr}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section CTA - Devenir partenaire */}
      <div className="relative py-12 w-full">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="bg-gradient-to-r from-orange-500/10 via-blue-500/10 to-orange-500/10 backdrop-blur-xl border-2 border-orange-500/30 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30 rounded-3xl"></div>
            
            <div className="relative text-center">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-orange-500/30 blur-2xl rounded-full"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/50">
                  <Award className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-400 to-white">
                REJOIGNEZ NOS PARTENAIRES
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-medium">
                Soutenez le <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400">Jorfof Club</span> et participez à notre passion commune : le basket-ball.
              </p>
              
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="relative group/cta overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 blur-xl opacity-50 group-hover/cta:opacity-75 transition-opacity"></div>
                <div className="relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-bold text-lg shadow-2xl border-2 border-orange-400/50 group-hover/cta:scale-105 transition-transform flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  DEVENIR PARTENAIRE
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partner;
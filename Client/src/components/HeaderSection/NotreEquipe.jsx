import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Users, Trophy, Target, Shield, Star, Zap, X, Info } from "lucide-react";
import ChatBotNew from "../ChatBot/ChatbotNew";
import CONFIG from "../../config/config.js";

const NotreEquipe = () => {
  const { t, i18n } = useTranslation();
  const [membres, setMembres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedMembre, setSelectedMembre] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const fetchEquipe = async () => {
    try {
      setLoading(true);
      let allResults = [];
      let url = CONFIG.API_EQUIPE_LIST;

      while (url) {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Erreur lors du chargement de l'équipe");

        const data = await res.json();
        allResults = [...allResults, ...(data.results || [])];
        url = data.next;
      }

      const normalizeUrl = (url) => {
        if (!url) return null;
        if (url.startsWith("http")) return url;
        if (url.startsWith("/")) return `${CONFIG.BASE_URL}${url}`;
        return `${CONFIG.BASE_URL}/${url}`;
      };

      const normalized = allResults.map((m) => ({
        ...m,
        photo_url: normalizeUrl(m.photo_url || m.photo)
      }));

      setMembres(normalized);
      setError("");
    } catch (err) {
      console.error("Erreur:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipe();
  }, []);

  // 🔤 Normaliser la langue (fr-FR → fr)
  const getLang = () => i18n.language.split("-")[0];

  // 📖 Obtenir la bio dans la bonne langue avec fallback
  const getBio = (membre) => {
    const lang = getLang();
    return membre[`bio_${lang}`] || membre.bio_fr || membre.bio_en || membre.bio_ar || "";
  };

  const filteredMembres =
    roleFilter === "all"
      ? membres
      : membres.filter((membre) => membre.role === roleFilter);

  const getRoleText = (role) => {
    const roles = {
      player: t("team.player", "Joueur"),
      coach: t("team.coach", "Entraîneur"),
      assistant: t("team.assistant", "Assistant"),
      staff: t("team.staff", "Staff technique"),
      manager: t("team.manager", "Manager"),
    };
    return roles[role] || role;
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "player":
        return Trophy;
      case "coach":
        return Target;
      case "staff":
        return Shield;
      default:
        return Users;
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "player":
        return "from-blue-500 to-blue-600";
      case "coach":
        return "from-green-500 to-green-600";
      case "staff":
        return "from-purple-500 to-purple-600";
      default:
        return "from-orange-500 to-orange-600";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-orange-500/30 rounded-full animate-ping absolute"></div>
            <div className="w-20 h-20 border-4 border-t-orange-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-white text-lg font-semibold">
            {t("team.loading", "Chargement...")}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center px-4">
        <div className="bg-red-500/10 border-2 border-red-500/50 text-white p-6 rounded-2xl shadow-2xl backdrop-blur-xl max-w-md">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-6 h-6 text-red-500" />
            <p className="font-bold text-xl">{t("team.error", "Erreur")}</p>
          </div>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] pt-40 relative">
      {/* Effets de fond */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Titre */}
      <div className="relative text-center pb-16">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 via-blue-500/30 to-orange-500/30 blur-3xl scale-150 animate-pulse"></div>
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-orange-500/50 animate-pulse">
              <Users className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-400 to-white mb-4">
              {t("team.title", "Notre Équipe")}
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              {t("team.subtitle", "Découvrez les membres qui font battre le cœur du club.")}
            </p>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex justify-center mb-10 flex-wrap gap-4 px-4">
        {[
          { value: "all", label: t("team.all", "Tous"), icon: Users },
          { value: "player", label: t("team.players", "Joueurs"), icon: Trophy },
          { value: "coach", label: t("team.coaches", "Entraîneurs"), icon: Target },
          { value: "staff", label: t("team.staffs", "Staffs"), icon: Shield },
        ].map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setRoleFilter(value)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all border ${
              roleFilter === value
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-500 shadow-xl shadow-orange-500/50"
                : "bg-white/10 border-orange-500/20 text-gray-300 hover:border-orange-500/40 hover:bg-white/20"
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>

      {/* Grille membres */}
      <div className="w-[90%] mx-auto pb-20">
        {filteredMembres.length === 0 ? (
          <div className="text-center py-16 bg-white/5 rounded-3xl border border-orange-500/20">
            <Users className="w-12 h-12 text-orange-400 mx-auto mb-4" />
            <p className="text-white font-bold text-xl">
              {t("team.no_members", "Aucun membre trouvé")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembres.map((membre) => {
              const RoleIcon = getRoleIcon(membre.role);
              const bio = getBio(membre);
              const hasBio = bio && bio.trim().length > 0;

              return (
                <div
                  key={membre.id}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedMembre(membre)}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-blue-500 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                  <div className="relative bg-[#10142c]/90 backdrop-blur-xl border-2 border-orange-500/30 rounded-3xl shadow-xl overflow-hidden group-hover:border-orange-500/60 transition-all duration-300">
                    <div className="relative h-80">
                      <img
                        src={
                          membre.photo_url ||
                          "https://placehold.co/400x500/1a1a2e/ffffff?text=Photo"
                        }
                        alt={`${membre.first_name} ${membre.last_name}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) =>
                          (e.target.src =
                            "https://placehold.co/400x500/1a1a2e/ffffff?text=Indisponible")
                        }
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                      {/* Badge rôle */}
                      <div className={`absolute top-4 right-4 bg-gradient-to-r ${getRoleBadgeColor(membre.role)} text-white px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1 shadow-lg`}>
                        <RoleIcon size={14} />
                        {getRoleText(membre.role)}
                      </div>

                      {/* Badge numéro */}
                      {membre.number && (
                        <div className="absolute top-4 left-4 bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg border-2 border-white/30">
                          #{membre.number}
                        </div>
                      )}

                      {/* Badge info si bio disponible */}
                      {hasBio && (
                        <div className="absolute bottom-4 right-4 bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                          <Info size={20} />
                        </div>
                      )}
                    </div>

                    <div className="p-5 text-center">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">
                        {membre.first_name} {membre.last_name}
                      </h3>
                      <p className="text-orange-400 font-semibold text-sm mb-3">
                        {membre.position || getRoleText(membre.role)}
                      </p>
                      
                      {/* Aperçu bio */}
                      {hasBio && (
                        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                          {bio}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL DÉTAILS */}
      {selectedMembre && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedMembre(null)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-blue-500 to-purple-500 rounded-3xl blur-xl opacity-50"></div>
            <div className="relative bg-[#0a0e27] rounded-3xl shadow-2xl border-2 border-orange-500/30 overflow-hidden">
              {/* Photo grande taille */}
              <div className="relative h-96 bg-gradient-to-br from-orange-500/20 to-purple-500/20">
                <img
                  src={selectedMembre.photo_url || "https://placehold.co/800x800/1a1a2e/ffffff?text=Photo"}
                  alt={`${selectedMembre.first_name} ${selectedMembre.last_name}`}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.src = "https://placehold.co/800x800/1a1a2e/ffffff?text=Indisponible")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] via-[#0a0e27]/70 to-transparent"></div>
                
                {selectedMembre.number && (
                  <div className="absolute top-4 right-4 bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black shadow-2xl border-4 border-white/30">
                    #{selectedMembre.number}
                  </div>
                )}
              </div>

              {/* Contenu */}
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start gap-4 mb-6">
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                      {selectedMembre.first_name} {selectedMembre.last_name}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      <span className={`text-sm font-semibold px-4 py-2 rounded-lg bg-gradient-to-r ${getRoleBadgeColor(selectedMembre.role)} text-white flex items-center gap-2`}>
                        {React.createElement(getRoleIcon(selectedMembre.role), { size: 16 })}
                        {getRoleText(selectedMembre.role)}
                      </span>
                      {selectedMembre.position && (
                        <span className="text-sm font-semibold px-4 py-2 rounded-lg bg-white/10 text-orange-400 border border-orange-500/30">
                          {selectedMembre.position}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMembre(null)}
                    className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Biographies complètes */}
                <div className="space-y-4">
                  {selectedMembre.bio_fr && (
                    <div className="bg-white/5 p-4 rounded-xl border border-blue-500/30">
                      <p className="text-xs font-bold text-blue-400 mb-2">🇫🇷 BIOGRAPHIE</p>
                      <p className="text-gray-300 leading-relaxed">{selectedMembre.bio_fr}</p>
                    </div>
                  )}
                  {selectedMembre.bio_en && (
                    <div className="bg-white/5 p-4 rounded-xl border border-green-500/30">
                      <p className="text-xs font-bold text-green-400 mb-2">🇬🇧 BIOGRAPHY</p>
                      <p className="text-gray-300 leading-relaxed">{selectedMembre.bio_en}</p>
                    </div>
                  )}
                  {selectedMembre.bio_ar && (
                    <div className="bg-white/5 p-4 rounded-xl border border-purple-500/30" dir="rtl">
                      <p className="text-xs font-bold text-purple-400 mb-2">🇸🇦 السيرة الذاتية</p>
                      <p className="text-gray-300 leading-relaxed">{selectedMembre.bio_ar}</p>
                    </div>
                  )}
                  {!selectedMembre.bio_fr && !selectedMembre.bio_en && !selectedMembre.bio_ar && (
                    <div className="bg-white/5 p-4 rounded-xl border border-gray-500/30 text-center">
                      <p className="text-gray-400">Aucune biographie disponible</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chatbot */}
      <div className="fixed bottom-6 right-6 z-40">
        <ChatBotNew />
      </div>
    </div>
  );
};

export default NotreEquipe;
// import React, { useEffect, useState } from "react";
// import CONFIG from "../../config/config.js";
// import { useTranslation } from "react-i18next";
// import { motion } from "framer-motion";

// const NotreEquipe = () => {
//   const { t, i18n } = useTranslation();
//   const [membres, setMembres] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [roleFilter, setRoleFilter] = useState("all");

//   useEffect(() => {
//     const fetchEquipe = async () => {
//       try {
//         const response = await fetch(`${CONFIG.BASE_URL}/api/equipe/`);
//         if (!response.ok) throw new Error("Erreur lors du chargement des membres");
//         const data = await response.json();
//         setMembres(data.results || data); // support pagination DRF
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEquipe();
//   }, []);

//   const filteredMembres =
//     roleFilter === "all"
//       ? membres
//       : membres.filter((membre) => membre.role === roleFilter);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <p className="text-lg text-gray-600">{t("Chargement...")}</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <p className="text-lg text-red-500">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-16 px-6 sm:px-12">
//       <div className="max-w-7xl mx-auto text-center">
//         <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-10">
//           {t("Notre Équipe")}
//         </h1>

//         {/* ✅ Filtres */}
//         <div className="flex justify-center mb-10 flex-wrap gap-4">
//           <button
//             onClick={() => setRoleFilter("all")}
//             className={`px-4 py-2 rounded-full border ${
//               roleFilter === "all"
//                 ? "bg-blue-600 text-white"
//                 : "bg-white text-gray-700 border-gray-300"
//             }`}
//           >
//             {t("Tous")}
//           </button>
//           <button
//             onClick={() => setRoleFilter("player")}
//             className={`px-4 py-2 rounded-full border ${
//               roleFilter === "player"
//                 ? "bg-blue-600 text-white"
//                 : "bg-white text-gray-700 border-gray-300"
//             }`}
//           >
//             {t("Joueurs")}
//           </button>
//           <button
//             onClick={() => setRoleFilter("coach")}
//             className={`px-4 py-2 rounded-full border ${
//               roleFilter === "coach"
//                 ? "bg-blue-600 text-white"
//                 : "bg-white text-gray-700 border-gray-300"
//             }`}
//           >
//             {t("Entraîneurs")}
//           </button>
//           <button
//             onClick={() => setRoleFilter("staff")}
//             className={`px-4 py-2 rounded-full border ${
//               roleFilter === "staff"
//                 ? "bg-blue-600 text-white"
//                 : "bg-white text-gray-700 border-gray-300"
//             }`}
//           >
//             {t("Staff")}
//           </button>
//         </div>

//         {/* ✅ Grille des membres */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//           {filteredMembres.length === 0 ? (
//             <p className="text-gray-600 text-lg">{t("Aucun membre trouvé")}</p>
//           ) : (
//             filteredMembres.map((membre) => (
//               <motion.div
//                 key={membre.id}
//                 whileHover={{ scale: 1.05 }}
//                 className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
//               >
//                 <img
//                   src={membre.photo_url || "/placeholder.jpg"}
//                   alt={`${membre.first_name} ${membre.last_name}`}
//                   className="w-full h-72 object-cover"
//                 />
//                 <div className="p-6 text-center">
//                   <h2 className="text-xl font-semibold text-gray-800">
//                     {membre.first_name} {membre.last_name}
//                   </h2>
//                   <p className="text-sm text-gray-500 uppercase">
//                     {t(membre.role)}
//                   </p>
//                   {membre.position && (
//                     <p className="text-sm text-gray-600 mt-1">
//                       {t("Poste")}: {membre.position}
//                     </p>
//                   )}
//                   {membre.number && (
//                     <p className="text-sm text-gray-600 mt-1">
//                       {t("Numéro")}: {membre.number}
//                     </p>
//                   )}
//                   <p className="text-gray-700 mt-3 text-sm">
//                     {membre[`bio_${i18n.language}`] || t("Pas de description.")}
//                   </p>
//                 </div>
//               </motion.div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotreEquipe;



import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Users, Trophy, Star, Target, Shield, Zap } from "lucide-react";

// Configuration - Adaptez selon votre backend
const CONFIG = {
  BASE_URL: 'http://localhost:8000'
};

const NotreEquipe = () => {
  const { t, i18n } = useTranslation();
  const [membres, setMembres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    const fetchEquipe = async () => {
      try {
        const response = await fetch(`${CONFIG.BASE_URL}/api/equipe/`);
        if (!response.ok) throw new Error("Erreur lors du chargement des membres");
        const data = await response.json();
        setMembres(data.results || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEquipe();
  }, []);

  const filteredMembres =
    roleFilter === "all"
      ? membres
      : membres.filter((membre) => membre.role === roleFilter);

  // Traduire les rôles
  const getRoleText = (role) => {
    const roles = {
      player: t("team.player"),
      coach: t("team.coach"),
      staff: t("team.staff")
    };
    return roles[role] || role;
  };

  // Icône selon le rôle
  const getRoleIcon = (role) => {
    switch(role) {
      case 'player': return Trophy;
      case 'coach': return Target;
      case 'staff': return Shield;
      default: return Users;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-orange-500/30 rounded-full animate-ping absolute"></div>
          <div className="w-20 h-20 border-4 border-t-orange-500 rounded-full animate-spin"></div>
        </div>
        <p className="text-white text-lg ml-6 font-semibold">{t("team.loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center px-4">
        <div className="bg-red-500/10 border-2 border-red-500/50 text-white p-6 rounded-2xl shadow-2xl backdrop-blur-xl max-w-md">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-6 h-6 text-red-500" />
            <p className="font-bold text-xl">{t("team.error")}</p>
          </div>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] w-full">
      {/* Effets de fond lumineux */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative pt-40 pb-16 text-center w-full">
        <div className="relative inline-block">
          {/* Halo lumineux */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-orange-500/30 to-blue-500/30 blur-3xl scale-150 animate-pulse"></div>
          
          <div className="relative">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-full mb-6 shadow-2xl shadow-orange-500/50 animate-pulse">
              <Users className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-400 to-white mb-4 tracking-tight">
              {t("team.title")}
            </h1>
            
            {/* Ligne animée */}
            <div className="relative w-32 h-1 mx-auto mt-6 overflow-hidden rounded-full">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-orange-500 to-blue-500 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="relative w-full flex items-center justify-center mb-12">
        <div className="w-[95%] lg:w-[90%] xl:w-[85%]">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {[
              { value: "all", label: t("team.all"), icon: Users },
              { value: "player", label: t("team.players"), icon: Trophy },
              { value: "coach", label: t("team.coaches"), icon: Target },
              { value: "staff", label: t("team.staffs"), icon: Shield }
            ].map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setRoleFilter(value)}
                className={`relative group overflow-hidden ${
                  roleFilter === value ? '' : ''
                }`}
              >
                <div className={`absolute inset-0 ${
                  roleFilter === value 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 blur-lg opacity-50' 
                    : 'bg-white/5 blur-lg opacity-0 group-hover:opacity-30'
                } transition-opacity`}></div>
                <div className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all border-2 ${
                  roleFilter === value
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-400/50 shadow-2xl scale-105"
                    : "bg-white/5 text-gray-300 border-orange-500/30 hover:border-orange-500/60 hover:bg-white/10"
                }`}>
                  <Icon size={18} />
                  <span>{label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grille des membres */}
      <div className="relative w-full flex items-center justify-center pb-16">
        <div className="w-[95%] lg:w-[90%] xl:w-[85%]">
          {filteredMembres.length === 0 ? (
            <div className="text-center py-20 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-orange-500/30 px-4">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Users className="w-12 h-12 text-orange-400" />
              </div>
              <p className="text-white text-2xl font-bold mb-2">{t("team.no_members")}</p>
              <p className="text-gray-400 text-lg">{t("team.no_members_desc")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMembres.map((membre) => {
                const RoleIcon = getRoleIcon(membre.role);
                return (
                  <div
                    key={membre.id}
                    className="relative group"
                  >
                    {/* Glow effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-blue-500 to-orange-500 rounded-3xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
                    
                    {/* Card */}
                    <div className="relative bg-[#0f1729]/80 backdrop-blur-xl rounded-3xl overflow-hidden border-2 border-orange-500/20 group-hover:border-orange-500/60 transition-all duration-500 shadow-2xl group-hover:shadow-orange-500/20 hover:scale-[1.02]">
                      {/* Photo */}
                      <div className="relative h-80 overflow-hidden">
                        <img
                          src={membre.photo_url || "https://placehold.co/400x500/1a1a2e/ffffff?text=Photo"}
                          alt={`${membre.first_name} ${membre.last_name}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                          onError={(e) =>
                            (e.target.src = "https://placehold.co/400x500/1a1a2e/ffffff?text=Photo+indisponible")
                          }
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1729] via-[#0f1729]/60 to-transparent"></div>
                        
                        {/* Badge rôle */}
                        <div className="absolute top-4 right-4">
                          <div className="relative">
                            <div className="absolute inset-0 bg-orange-500/50 blur-lg rounded-xl"></div>
                            <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 px-3 py-2 rounded-xl shadow-2xl border border-orange-400/50 flex items-center gap-2">
                              <RoleIcon className="w-4 h-4 text-white" />
                              <span className="text-white text-xs font-bold uppercase">{getRoleText(membre.role)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Badge numéro (pour joueurs) */}
                        {membre.number && (
                          <div className="absolute top-4 left-4">
                            <div className="relative">
                              <div className="absolute inset-0 bg-blue-500/50 blur-lg rounded-full"></div>
                              <div className="relative w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl border-2 border-blue-400/50">
                                <span className="text-white text-xl font-black">#{membre.number}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Badge position (pour joueurs) */}
                        {membre.position && (
                          <div className="absolute bottom-4 left-4">
                            <div className="relative">
                              <div className="absolute inset-0 bg-purple-500/50 blur-lg rounded-lg"></div>
                              <div className="relative bg-gradient-to-br from-purple-500 to-purple-600 px-3 py-1.5 rounded-lg shadow-xl border border-purple-400/50">
                                <span className="text-white text-xs font-bold">{membre.position}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Infos */}
                      <div className="p-6">
                        {/* Nom */}
                        <div className="mb-4 text-center">
                          <h3 className="text-xl font-black text-white mb-1">
                            {membre.first_name} {membre.last_name}
                          </h3>
                          <div className="flex items-center justify-center gap-2 text-orange-400">
                            <Star size={14} fill="currentColor" />
                            <span className="text-sm font-semibold uppercase">{getRoleText(membre.role)}</span>
                            <Star size={14} fill="currentColor" />
                          </div>
                        </div>

                        {/* Bio */}
                        {membre[`bio_${i18n.language}`] && (
                          <div className="bg-white/5 border border-orange-500/20 rounded-xl p-4">
                            <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                              {membre[`bio_${i18n.language}`]}
                            </p>
                          </div>
                        )}

                        {/* Stats pour joueurs */}
                        {membre.role === 'player' && (
                          <div className="grid grid-cols-2 gap-3 mt-4">
                            {membre.number && (
                              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-lg p-3 text-center">
                                <p className="text-blue-400 text-xs font-bold uppercase mb-1">{t("team.number")}</p>
                                <p className="text-white text-2xl font-black">#{membre.number}</p>
                              </div>
                            )}
                            {membre.position && (
                              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-lg p-3 text-center">
                                <p className="text-purple-400 text-xs font-bold uppercase mb-1">{t("team.position")}</p>
                                <p className="text-white text-sm font-bold">{membre.position}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="relative w-full bg-gradient-to-r from-orange-500/10 via-blue-500/10 to-orange-500/10 backdrop-blur-xl border-t-2 border-orange-500/30 py-16 text-white text-center overflow-hidden">
        {/* Effets de fond */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="relative w-full flex items-center justify-center">
          <div className="w-[95%] lg:w-[90%] xl:w-[85%]">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-orange-500/30 blur-2xl rounded-full"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/50 mx-auto">
                <Trophy className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-400 to-white">
              {t("team.join_title")}
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-medium">
              {t("team.join_text")}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contacter-tamkine"
                className="relative group/cta overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 blur-xl opacity-50 group-hover/cta:opacity-75 transition-opacity"></div>
                <div className="relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-bold text-lg shadow-2xl border-2 border-orange-400/50 group-hover/cta:scale-105 transition-transform">
                  {t("team.contact_us")}
                </div>
              </a>
              <a
                href="/nousRejoindreHeader"
                className="relative group/cta overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 blur-xl opacity-50 group-hover/cta:opacity-75 transition-opacity"></div>
                <div className="relative px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-orange-500/50 rounded-xl font-bold text-lg hover:bg-white/20 group-hover/cta:scale-105 transition-all">
                  {t("team.join_club")}
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotreEquipe;
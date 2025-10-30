import { NavLink, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";
import Loginbtn from "./Loginbtn";
import { useState, useEffect } from "react";
import { 
  Home, FileText, Calendar, Video, Image, Users, 
  Newspaper, LogOut, Menu, X, ChevronLeft, ChevronRight,
  Shield, Zap, TrendingUp
} from "lucide-react";

const NavAdmin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getIcon = (path) => {
    const icons = {
      "/dashboardAdmin": <Home className="w-5 h-5" />,
      "/createpost": <Newspaper className="w-5 h-5" />,
      "/programPost": <Calendar className="w-5 h-5" />,
      "/videoPost": <Video className="w-5 h-5" />,
      "/photoPost": <Image className="w-5 h-5" />,
      "/partnerPost": <Users className="w-5 h-5" />,
      "/mediaPartenairePost": <TrendingUp className="w-5 h-5" />,
      "default": <FileText className="w-5 h-5" />
    };
    return icons[path] || icons["default"];
  };

  const navCategories = [
    {
      title: "Principal",
      items: [
        { path: "/dashboardAdmin", label: "Tableau de bord" },
      ]
    },
    {
      title: "Contenu",
      items: [
        { path: "/createpost", label: "Actualités" },
        { path: "/programPost", label: "Calendrier" },
        { path: "/videoPost", label: "Videothèque" },
        { path: "/photoPost", label: "Photothèque" },
      ]
    },
    {
      title: "Équipe & Partenaires",
      items: [
        { path: "/partnerPost", label: "Partenaires" },
        { path: "/mediaPartenairePost", label: "Partenaires Médias" },
      ]
    },
  ];

  const handleMobileMenuClose = () => {
    if (windowWidth < 768) {
      setSidebarCollapsed(true);
    }
  };

  return (
    <>
      <aside 
        className={`${
          isSidebarCollapsed ? 'w-20' : 'w-72'
        } transition-all duration-300 ease-in-out h-screen bg-[#0a0e27] shadow-2xl fixed left-0 top-0 z-50 flex flex-col border-r-2 border-orange-500/30 relative overflow-hidden`}
      >
        {/* Effets de fond lumineux */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 left-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 left-1/2 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Grille de fond */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

        {/* En-tête avec logo et bouton de réduction */}
        <div className={`relative py-6 px-4 border-b-2 border-orange-500/30 flex ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} items-center`}>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10 backdrop-blur-sm"></div>
          
          {!isSidebarCollapsed && (
            <div className="relative flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500/30 blur-xl rounded-full animate-pulse"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-2xl shadow-2xl shadow-orange-500/50">
                  🏀
                </div>
              </div>
              <div>
                <h3 className="text-base font-black text-white tracking-tight">JORFOF ADMIN</h3>
                <p className="text-xs text-orange-400 font-semibold">Dashboard</p>
              </div>
            </div>
          )}
          
          <button 
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            className="relative group/toggle z-10"
            aria-label={isSidebarCollapsed ? "Étendre le menu" : "Réduire le menu"}
          >
            <div className="absolute inset-0 bg-orange-500/30 blur-lg opacity-0 group-hover/toggle:opacity-100 transition-opacity rounded-lg"></div>
            <div className="relative p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-orange-500/30 hover:border-orange-500/50 transition-all">
              {isSidebarCollapsed ? (
                <ChevronRight className="w-5 h-5 text-orange-400" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-orange-400" />
              )}
            </div>
          </button>
        </div>

        {/* Navigation links avec un scroll */}
        <nav className="relative flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
          {navCategories.map((category, index) => (
            <div key={index} className={`mb-6 ${isSidebarCollapsed ? 'text-center' : ''}`}>
              {!isSidebarCollapsed && (
                <div className="relative inline-block mb-3">
                  <div className="absolute inset-0 bg-orange-500/20 blur-md rounded"></div>
                  <h3 className="relative text-xs font-black text-gray-400 uppercase tracking-wider px-3 flex items-center gap-2">
                    <Zap className="w-3 h-3 text-orange-400" />
                    {t(category.title)}
                  </h3>
                </div>
              )}
              <div className="space-y-2">
                {category.items.map(({ path, label }) => (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={handleMobileMenuClose}
                    className={({ isActive }) => `
                      relative block group/link overflow-hidden
                      ${isSidebarCollapsed ? 'px-0' : 'px-4'} 
                      py-3 rounded-xl transition-all duration-300
                    `}
                  >
                    {({ isActive }) => (
                      <>
                        {/* Effet de fond pour l'élément actif */}
                        {isActive && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-orange-600/30 blur-lg"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 opacity-90"></div>
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
                          </>
                        )}
                        
                        {/* Effet de fond pour le hover */}
                        {!isActive && (
                          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm opacity-0 group-hover/link:opacity-100 transition-opacity border border-orange-500/0 group-hover/link:border-orange-500/30 rounded-xl"></div>
                        )}

                        <div className={`relative flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-start'}`}>
                          <div className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover/link:text-orange-400'} transition-colors`}>
                            {getIcon(path)}
                          </div>
                          {!isSidebarCollapsed && (
                            <span className={`ml-3 font-bold text-sm whitespace-nowrap overflow-hidden text-ellipsis ${
                              isActive ? 'text-white' : 'text-gray-400 group-hover/link:text-white'
                            } transition-colors`}>
                              {t(label)}
                            </span>
                          )}
                          {isActive && !isSidebarCollapsed && (
                            <Shield className="w-4 h-4 text-white ml-auto" />
                          )}
                        </div>
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Section pour la déconnexion */}
        <div className={`relative mt-auto p-4 border-t-2 border-orange-500/30 ${isSidebarCollapsed ? 'flex justify-center' : ''}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          
          {!isSidebarCollapsed ? (
            <div className="relative flex items-center justify-between w-full bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-orange-500/30">
              <div className="flex items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-500/30 blur-lg rounded-full"></div>
                  <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center shadow-lg">
                    <span className="font-black text-lg">A</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-bold text-white">Admin</p>
                  <p className="text-xs text-gray-400 font-semibold">admin@jorfof.org</p>
                </div>
              </div>
              <button className="relative group/logout">
                <div className="absolute inset-0 bg-red-500/30 blur-lg opacity-0 group-hover/logout:opacity-100 transition-opacity rounded-lg"></div>
                <div className="relative p-2 bg-white/5 backdrop-blur-sm rounded-lg border border-red-500/30 hover:border-red-500/50 hover:bg-red-500/20 transition-all">
                  <LogOut className="w-5 h-5 text-red-400" />
                </div>
              </button>
            </div>
          ) : (
            <button className="relative group/logout">
              <div className="absolute inset-0 bg-red-500/30 blur-lg opacity-0 group-hover/logout:opacity-100 transition-opacity rounded-lg"></div>
              <div className="relative p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-red-500/30 hover:border-red-500/50 hover:bg-red-500/20 transition-all">
                <LogOut className="w-6 h-6 text-red-400" />
              </div>
            </button>
          )}
        </div>

        {/* Particules décoratives */}
        <div className="absolute top-20 left-4 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-4 w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-40 left-4 w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </aside>

      {/* Bouton pour mobile pour ouvrir/fermer le menu */}
      <button
        className={`lg:hidden fixed bottom-6 right-6 z-50 group/mobile ${
          isSidebarCollapsed ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } transition-opacity duration-300`}
        onClick={() => setSidebarCollapsed(false)}
        aria-label="Ouvrir le menu"
      >
        <div className="absolute inset-0 bg-orange-500/50 blur-xl opacity-75 animate-pulse rounded-full"></div>
        <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-full shadow-2xl shadow-orange-500/50 border-2 border-orange-400/50 group-hover/mobile:scale-110 transition-transform">
          <Menu className="w-6 h-6" />
        </div>
      </button>

      {/* Overlay pour fermer le menu sur mobile */}
      {!isSidebarCollapsed && windowWidth < 1024 && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden" 
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #f97316 0%, #ea580c 100%);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #ea580c 0%, #c2410c 100%);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #f97316 rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </>
  );
};

// Composant pour le layout principal de l'admin
const AdminLayout = () => {
  const location = useLocation();
  
  return (
    <div className="flex bg-[#0a0e27] min-h-screen">
      <NavAdmin />
      <main className="ml-20 lg:ml-72 flex-1 transition-all duration-300 ease-in-out w-full">
        <Routes>
          <Route path="/home" element={<div className="p-6"><h1 className="text-2xl font-bold mb-4 text-white">Tableau de bord</h1></div>} />
          <Route path="/platformPost" element={<div className="p-6"><h1 className="text-2xl font-bold mb-4 text-white">Gestion des plateformes</h1></div>} />
          <Route path="*" element={<div className="p-6"><h1 className="text-2xl font-bold mb-4 text-white">Page non trouvée</h1></div>} />
        </Routes>
      </main>
    </div>
  );
};

export { AdminLayout };
export default NavAdmin;
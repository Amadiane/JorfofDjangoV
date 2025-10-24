import { NavLink, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";
import Loginbtn from "./Loginbtn";
import { useState, useEffect } from "react";

// Importez ici vos composants de page
//import PhotoPost from "./PhotoPost";
// import PlatformPost from "./PlatformPost";
// import CreatePost from "./CreatePost";
// Ajoutez d'autres imports selon vos besoins

const NavAdmin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Gestion responsive du sidebar
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

  // Fonction pour obtenir les icônes actualisées
  const getIcon = (path) => {
    const icons = {
      "/home": (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
      "/createpost": (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
      ),
      "/platformPost": (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      "/photoPost": (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      ),
      "/videoPost": (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          <path fillRule="evenodd" d="M12 5a1 1 0 011 1v8a1 1 0 11-2 0V6a1 1 0 011-1z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M15 5a1 1 0 011 1v8a1 1 0 11-2 0V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      ),
      "/programPost": (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      ),
      "/teamMessage": (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      ),
      "/documentPost": (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>
      ),
      "/listPartners": (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
      ),
      "/mediaPartenairePost": (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5 3a1 1 0 011-1h8a1 1 0 011 1v2a1 1 0 01-1 1H6a1 1 0 01-1-1V3zm1 6a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H7a1 1 0 01-1-1V9z" clipRule="evenodd" />
          <path d="M4 11H2a2 2 0 00-2 2v1a2 2 0 002 2h2v-5z" />
          <path d="M18 11h-2v5h2a2 2 0 002-2v-1a2 2 0 00-2-2z" />
        </svg>
      ),
      "/listeContacts": (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
      "/motPresidentPost": (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
        </svg>
      ),
      "/missionPost": (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5z" />
          <path d="M8 8a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V8z" />
        </svg>
      ),
      "/valeurPost": (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      "/fondationPost": (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
        </svg>
      ),
      "/listeAbonnement": (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
      ),
      "/listePostulantsCommunity": (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      ),
      "/listeRejoindre": (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
        </svg>
      ),
      "default": (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
          <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
        </svg>
      )
    };

    return icons[path] || icons["default"];
  };

  // Liste des liens de navigation organisés par catégories
  const navCategories = [
    {
      title: "Principal",
      items: [
        { path: "/home", label: "Tableau de bord" },
      ]
    },
    {
      title: "Contenu",
      items: [
        // { path: "/platformPost", label: "Plateformes" },
        // { path: "/createpost", label: "Actualités" },
        // { path: "/programPost", label: "Programmes" },
        // { path: "/videoPost", label: "Vidéos" },
        { path: "/photoPost", label: "Photothèque" },
        // { path: "/documentPost", label: "Téléchargements" },
        // { path: "/activitiesPost", label: "Activities" },
      ]
    },
    {
      title: "Équipe & Partenaires",
      items: [
        // { path: "/teamMessage", label: "Notre Équipe" },
        // // { path: "/listPartners", label: "Partenaires" },
        // // { path: "/mediaPartenairePost", label: "Partenaires Médias" },
        // { path: "/mediaPartenairePost", label: "Partenaires" },
      ]
    },
    {
      title: "À propos",
      items: [
        // { path: "/motPresidentPost", label: "Mot du Président" },
        // // { path: "/missionPost", label: "Nos Missions" },
        // { path: "/valeurPost", label: "Nos Valeurs" },
        // { path: "/fondationPost", label: "Fondation Tamkine" },
      ]
    },
    {
      title: "Gestion des utilisateurs",
      items: [
        // { path: "/listeContacts", label: "Contacts" },
        // { path: "/listePostulantsCommunity", label: "Membres" },
        // { path: "/listeRejoindre", label: "Candidatures" },
        // { path: "/listeAbonnement", label: "Abonnés" },
      ]
    },
  ];

  // Pour fermer le menu sur mobile après un clic
  const handleMobileMenuClose = () => {
    if (windowWidth < 768) {
      setSidebarCollapsed(true);
    }
  };

  return (
    <aside 
      className={`${
        isSidebarCollapsed ? 'w-20' : 'w-72'
      } transition-all duration-300 ease-in-out h-screen bg-white shadow-xl fixed left-0 top-0 z-40 flex flex-col`}
    >
      {/* En-tête avec logo et bouton de réduction */}
      <div className={`py-5 px-4 border-b border-gray-200 flex ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} items-center bg-[#12138B] text-white`}>
        {!isSidebarCollapsed && <Logo />}
        <button 
          onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
          className="p-1.5 rounded-md hover:bg-[#2526A9] text-white transition-colors"
          aria-label={isSidebarCollapsed ? "Étendre le menu" : "Réduire le menu"}
        >
          {isSidebarCollapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>

      {/* Navigation links avec un scroll */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 bg-gray-50">
        {navCategories.map((category, index) => (
          <div key={index} className={`mb-6 ${isSidebarCollapsed ? 'text-center' : ''}`}>
            {!isSidebarCollapsed && (
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
                {t(category.title)}
              </h3>
            )}
            <div className="space-y-1">
              {category.items.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={handleMobileMenuClose}
                  className={({ isActive }) => `
                    block ${isSidebarCollapsed ? 'text-center px-2' : 'px-4'} 
                    py-2.5 rounded-lg transition-all duration-200 
                    ${isActive 
                      ? "bg-[#12138B] text-white font-medium shadow-md" 
                      : "text-gray-700 hover:bg-blue-50 hover:text-[#12138B]"
                    }
                  `}
                >
                  <div className="flex items-center">
                    <span className="flex-shrink-0">{getIcon(path)}</span>
                    {!isSidebarCollapsed && (
                      <span className="ml-3 font-medium text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                        {t(label)}
                      </span>
                    )}
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Section pour la déconnexion */}
      <div className={`mt-auto p-4 border-t border-gray-200 bg-white ${isSidebarCollapsed ? 'flex justify-center' : ''}`}>
        {!isSidebarCollapsed && (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-[#12138B] text-white flex items-center justify-center">
                <span className="font-semibold">A</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Admin</p>
                <p className="text-xs text-gray-500">admin@tamkine.org</p>
              </div>
            </div>
            <Loginbtn className="text-red-600 hover:text-red-800 transition-colors" />
          </div>
        )}
        {isSidebarCollapsed && (
          <Loginbtn className="text-red-600 hover:text-red-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </Loginbtn>
        )}
      </div>

      {/* Bouton pour mobile pour ouvrir/fermer le menu */}
      <button
        className={`lg:hidden fixed bottom-4 right-4 z-50 bg-[#12138B] text-white p-3 rounded-full shadow-lg ${
          isSidebarCollapsed ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } transition-opacity duration-300`}
        onClick={() => setSidebarCollapsed(false)}
        aria-label="Ouvrir le menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Overlay pour fermer le menu sur mobile */}
      {!isSidebarCollapsed && windowWidth < 1024 && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" 
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      <style jsx>{`
        nav::-webkit-scrollbar {
          width: 5px;
        }
        nav::-webkit-scrollbar-track {
          background: transparent;
        }
        nav::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 10px;
        }
        nav {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
        }
      `}</style>
    </aside>
  );
};

// Composant pour le layout principal de l'admin
const AdminLayout = () => {
  const location = useLocation();
  
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <NavAdmin />
      <main className="ml-20 lg:ml-72 flex-1 transition-all duration-300 ease-in-out">
        <Routes>
          <Route path="/home" element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Tableau de bord</h1></div>} />
          <Route path="/platformPost" element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Gestion des plateformes</h1></div>} />
          <Route path="/photoPost" element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Photothèque</h1><PhotoPost /></div>} />
          {/* Ajoutez ici les autres routes pour chaque élément du menu */}
          <Route path="*" element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Page non trouvée</h1></div>} />
        </Routes>
      </main>
    </div>
  );
};

export { AdminLayout };
export default NavAdmin;
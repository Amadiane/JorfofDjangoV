import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "./Logo"; // Import du logo
import Loginbtn from "./Loginbtn"; // Import du bouton de connexion
import { useState } from "react";

const NavAdmin = () => {
  const { t } = useTranslation(); // Hook pour traductions
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Fonction pour obtenir l'icône selon le nom du menu
  const getIcon = (path) => {
    const icons = {
      "/home": (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
      "/createpost": (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
          <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
        </svg>
      ),
      "/categories": (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>
      ),
      "/platformPost": (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      "/programs": (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      ),
      "/stats": (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      ),
      "/listeContacts": (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
      // Icône par défaut pour les autres chemins
      "default": (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>
      )
    };

    return icons[path] || icons["default"];
  };

  // Liste des liens de navigation
  const navItems = [
    { path: "/home", label: "À LA UNE" },
    { path: "/createpost", label: "Actualités" },
    { path: "/categories", label: "Catégories" },
    { path: "/platformPost", label: "Plateformes" },
    { path: "/programPost", label: "Programmes" },
    { path: "/stats", label: "Chiffres" },
    { path: "/clients", label: "Clients" },
    { path: "/videos", label: "Vidéos" },
    { path: "/photos", label: "Photo library" },
    { path: "/articles", label: "Articles" },
    { path: "/chatbot", label: "Chatbot Question" },
    { path: "/teamMessage", label: "Team" },
    { path: "/downloads", label: "Downloads" },
    { path: "/listPartners", label: "Partners" },
    { path: "/motPresidentpost", label: "Mot du President" },
    { path: "/missionPost", label: "Nos Missions" },
    { path: "/listeContacts", label: "Contactes" },
    { path: "/listePostulantsCommunity", label: "Membre de la communauté" },
    { path: "/listeRejoindre", label: "Nous rejoindre" },
    { path: "/listeRejoindre", label: "Partenaires Medias" },
    { path: "/listeAbonnement", label: "Mes Abonnés" },
    { path: "/valeurPost", label: "Nos Valeurs" },
  ];

  return (
    <section 
      className={`${isSidebarCollapsed ? 'w-20' : 'w-80'} transition-width duration-300 ease-in-out h-full bg-white shadow-lg rounded-lg flex flex-col border-0`}
    >
      {/* En-tête avec logo et bouton de réduction */}
      <div className={`p-4 border-b border-gray-200 flex ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} items-center`}>
        {!isSidebarCollapsed && <Logo />}
        <button 
          onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600 transition-colors"
          aria-label={isSidebarCollapsed ? "Étendre le menu" : "Réduire le menu"}
        >
          {isSidebarCollapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>

      {/* Navigation links avec un scroll */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <div className="space-y-1">
          {navItems.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center ${isSidebarCollapsed ? 'justify-center' : 'px-4'} py-2.5 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? "bg-[#12138B] text-white font-medium shadow-md" 
                    : "text-gray-700 hover:bg-blue-50 hover:text-[#12138B]"
                }`
              }
            >
              <span className="flex-shrink-0">{getIcon(path)}</span>
              {!isSidebarCollapsed && <span className="ml-3 font-medium">{t(label)}</span>}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Section pour la langue et connexion */}
      <div className={`mt-auto p-4 border-t border-gray-200 ${isSidebarCollapsed ? 'flex justify-center' : 'flex justify-between items-center'}`}>
        {!isSidebarCollapsed && <div className="text-xs text-gray-500">Administration</div>}
        <Loginbtn className="text-red-600 font-medium hover:text-red-800 transition-colors" />
      </div>

      {/* Styles pour la scrollbar personnalisée */}
      <style jsx>{`
        /* Custom scrollbar styles */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(203, 213, 224, 0.8);
          border-radius: 20px;
        }

        /* Transition pour la réduction/extension du menu */
        .transition-width {
          transition-property: width;
        }
      `}</style>
    </section>
  );
};

export default NavAdmin;
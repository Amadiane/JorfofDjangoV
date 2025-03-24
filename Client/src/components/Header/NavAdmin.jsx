import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "./Logo"; // Import du logo
import Loginbtn from "./Loginbtn"; // Import du bouton de connexion

const NavAdmin = () => {
  const { t } = useTranslation(); // Hook pour traductions

  return (
    <section className="w-80 h-full border border-black rounded-lg p-5 flex flex-col justify-between bg-white shadow-lg">
      {/* Section pour le logo */}
      <div className="mb-4 flex justify-center">
        <Logo />
      </div>

      {/* Navigation links avec un scroll */}
      <nav className="flex flex-col items-start text-lg space-y-4 overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {[
          { path: "/home", label: "À LA UNE" },
          { path: "/createpost", label: "Actualités" },
          { path: "/categories", label: "Catégories" },
          { path: "/platforms", label: "Plateformes" },
          { path: "/programs", label: "Programmes" },
          { path: "/stats", label: "Chiffres" },
          { path: "/clients", label: "Clients" },
          { path: "/videos", label: "Vidéos" },
          { path: "/photos", label: "Photo library" },
          { path: "/articles", label: "Articles" },
          { path: "/chatbot", label: "Chatbot Question" },
          { path: "/team", label: "Team" },
          { path: "/downloads", label: "Downloads" },
          { path: "/community", label: "Community members" },
          { path: "/partners", label: "Partners" },
        ].map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `py-2 px-4 rounded-md transition-all duration-200 w-full ${
                isActive ? "bg-[#12138B] text-white font-bold" : "text-black font-bold"
              } hover:text-[#12138B]`
            }
          >
            {t(label)}
          </NavLink>
        ))}
      </nav>

      {/* Section pour la langue et connexion, bien positionnée */}
      <div className="mt-5 flex justify-between items-center border-t pt-4 text-black">
  {/* <LanguageSwitcher /> */}
  <div className="flex items-center space-x-4 text-red-600 font-semibold hover:text-red-800 transition-colors">
    <Loginbtn className="text-red-600 font-semibold hover:text-red-800 transition-colors" />
  </div>
</div>

    </section>
  );
};

export default NavAdmin;

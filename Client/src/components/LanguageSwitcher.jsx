import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
      console.log("Langue actuelle :", i18n.language); // Vérification dans la console
    setIsOpen(false); // Ferme le menu après sélection
  };

  return (
    <div className="relative">
      {/* Bouton principal avec flèche */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-10 py-2 ">{(i18n.language || "fr").toUpperCase()} <span className="ml-2">˅</span></button>

      {/* Liste déroulante */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-20 bg-white border rounded shadow-md">
          <button  onClick={() => changeLanguage("fr")} className="block w-full px-3 py-2 text-left hover:bg-gray-100">Français</button>
          <button  onClick={() => changeLanguage("en")} className="block w-full px-3 py-2 text-left hover:bg-gray-100">English</button>
          <button  onClick={() => changeLanguage("ar")} className="block w-full px-3 py-2 text-left hover:bg-gray-100">عربي</button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;

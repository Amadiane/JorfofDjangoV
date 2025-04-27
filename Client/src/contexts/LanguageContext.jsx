import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr');

  const changeLanguage = (lang) => {
    setLanguage(lang);
    // Ici, vous pouvez aussi mettre à jour un système de traduction si nécessaire, par exemple avec i18next.
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

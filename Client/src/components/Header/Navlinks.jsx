import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { Search, Bell, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import logo from "../../assets/logo.jpg";
import { useTranslation } from 'react-i18next';

const Navlinks = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'fr');
  const navigate = useNavigate();
  
  // Refs pour les éléments de recherche et le menu déroulant
  const dropdownRefs = useRef({});
  const timeoutRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    const handleClickOutside = (event) => {
      // Fermer la recherche si on clique en dehors
      if (searchOpen && searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    // Focus sur l'input de recherche quand searchOpen devient true
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [scrolled, searchOpen]);

  const handleHover = (section) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveSection(section);
  };

  const handleLeave = (section) => {
    timeoutRef.current = setTimeout(() => {
      setActiveSection(null);
    }, 800); // Temps augmenté à 800ms pour donner plus de temps à l'utilisateur
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleDropdownMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveSection(null);
    }, 800);
  };

  const toggleSearch = () => {
    setSearchOpen(prev => !prev);
    // Si le menu mobile est ouvert et qu'on ouvre la recherche, fermer le menu mobile
    if (mobileMenuOpen && !searchOpen) {
      setMobileMenuOpen(false);
    }
    // Réinitialiser le terme de recherche lorsqu'on ferme la recherche
    if (searchOpen) {
      setSearchTerm('');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Implémentez ici la logique de recherche
      console.log('Recherche de:', searchTerm);
      // Naviguer vers la page de résultats de recherche avec le terme de recherche en paramètre
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      // Fermer la barre de recherche après soumission
      setSearchOpen(false);
      setSearchTerm('');
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };
  
  const navItems = [
    {
      title: t("home"),
      path: "/home",
      isDropdown: false
    },
    // {
    //   title: t("tamkine"),
    //   id: "tamkine",
    //   isDropdown: true,
    //   dropdownItems: [
    //     { title: t("president_word"), path: "/motPresident" },
    //     { title: t("foundation"), path: "/fondation" },
    //     { title: t("values"), path: "/nosValeurs" },
    //     { title: t("missions"), path: "/nosMissions" },
    //     { title: t("team"), path: "/notreEquipe" }
    //   ]
    // },
    {
      title: t("Le club"),
      id: "tamkine",
      isDropdown: true,
      dropdownItems: [
        { title: t("president_word"), path: "/motPresident" },
        // { title: t("foundation"), path: "/Jorfof Club" },
        // { title: t("values"), path: "/nosValeurs" },
        { title: t("missions"), path: "/nosMissions" },
        { title: t("team"), path: "/notreEquipe" }
      ]
    },
    // {
    //   title: t("programms"),
    //   path: "/programs",
    //   isDropdown: false
    // },
    {
      title: t("programms"),
      path: "/programs",
      isDropdown: false
    },
    {
      title: t("news"),
      path: "/actualites",
      isDropdown: false
    },
    // {
    //   title: t("platformss"),
    //   path: "/Plateforms",
    //   isDropdown: false
    // },
    // {
    //   title: t("partner_activities"),
    //   path: "/activities",
    //   isDropdown: false
    // },
    {
      title: t("media"),
      // title: t("media"),
      id: "media",
      isDropdown: true,
      dropdownItems: [
        { title: t("videotheque"), path: "/videotheque" },
        { title: t("phototheque"), path: "/phototheque" },
        // { title: t("downloads"), path: "/document" }
      ]
    },
    {
      title: t("join_us"),
      id: "join",
      isDropdown: true,
      dropdownItems: [
        { title: t("contact_us"), path: "/contacter-tamkine" },
        { title: t("community"), path: "/community" },
        { title: t("become_partner"), path: "/partner" }
      ]
    },
    {
      title: t("Partenaire"),
      path: "/mediaPartenaire",
      isDropdown: false
    }
    // {
    //   title: t("media_partnerss"),
    //   path: "/mediaPartenaire",
    //   isDropdown: false
    // }
  ];
  
  const renderDropdown = (item) => {
    if (activeSection === item.id) {
      return (
        <div 
          ref={el => dropdownRefs.current[item.id] = el}
          className="absolute bg-white shadow-xl rounded-lg mt-2 py-3 px-4 border border-gray-200 transition-all duration-300 ease-in-out opacity-100 w-64 transform -translate-x-1/2 left-1/2 z-50 text-base font-normal"
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
        >
          {item.dropdownItems.map((dropItem, index) => (
            <NavLink 
              key={index}
              to={dropItem.path} 
              className="block py-3 text-base text-black hover:text-[#12138B] hover:bg-gray-50 hover:pl-2 rounded transition-all duration-200 flex items-center group font-medium"
            >
              <ChevronRight size={14} className="mr-1 text-[#12138B] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              {dropItem.title}
            </NavLink>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleNotificationClick = () => {
    navigate('/home');
  };

  return (
    <header className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
      scrolled ? 'shadow-md py-2' : 'py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <NavLink to="/home" className="flex items-center">
              <img src={logo} alt="Fondation Tamkine" className="h-12 mr-3" />
              {/* <div>
                <h1 className="text-[#12138B] font-bold text-xl">{t("TAMKINE FONDATION")}</h1>
                <p className="text-gray-600 text-xs">Actualités et informations</p>
              </div> */}
              <div>
                <h1 className="text-[#12138B] font-bold text-xl">{t("JORFOF CLUB")}</h1>
                <p className="text-gray-600 text-xs">Toujours Prêt à Briller !</p>
              </div>
            </NavLink>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleSearch}
              className="p-2 mr-2 rounded-full hover:bg-gray-100"
            >
              <Search size={20} className="text-gray-700" />
            </button>
            <button 
              onClick={toggleMobileMenu}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-gray-700" />
              ) : (
                <Menu size={24} className="text-gray-700" />
              )}
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="relative" ref={searchRef}>
              <button 
                onClick={toggleSearch}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Search size={20} className="text-gray-700" />
              </button>
              {searchOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg p-3 border border-gray-200 z-50">
                  <form className="flex" onSubmit={handleSearch}>
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Rechercher..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#12138B]"
                    />
                    <button type="submit" className="bg-[#12138B] text-white px-4 rounded-r-lg hover:bg-[#0a0b5e]">
                      <Search size={18} />
                    </button>
                  </form>
                </div>
              )}
            </div>

            <button 
              className="p-2 rounded-full hover:bg-gray-100 relative"
              onClick={handleNotificationClick}
            >
              <Bell size={20} className="text-gray-700" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex space-x-2 items-center border-l pl-4 border-gray-300">
              <button onClick={() => changeLanguage('fr')} className={`text-sm font-medium ${language === 'fr' ? 'text-[#12138B]' : ''} hover:text-[#12138B]`}>FR</button>
              <span className="text-gray-400">|</span>
              <button onClick={() => changeLanguage('en')} className={`text-sm font-medium ${language === 'en' ? 'text-[#12138B]' : ''} hover:text-[#12138B]`}>EN</button>
              <span className="text-gray-400">|</span>
              <button onClick={() => changeLanguage('ar')} className={`text-sm font-medium ${language === 'ar' ? 'text-[#12138B]' : ''} hover:text-[#12138B]`}>AR</button>
            </div>
          </div>
        </div>

        {searchOpen && (
          <div className="block md:hidden absolute left-0 right-0 top-16 z-50 bg-white p-3 shadow-lg rounded-md">
            <form className="flex" onSubmit={handleSearch}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#12138B]"
                placeholder="Rechercher..."
              />
              <button type="submit" className="bg-[#12138B] text-white px-4 rounded-r-lg hover:bg-[#0a0b5e]">
                <Search size={18} />
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="hidden md:flex justify-center space-x-8 mt-4 bg-white pb-2">
        {navItems.map((item, index) => (
          <div 
            key={index} 
            className="relative"
            onMouseEnter={() => handleHover(item.id)}
            onMouseLeave={() => handleLeave(item.id)}
            onClick={() => handleHover(item.id)} // Ajout d'un gestionnaire de clic pour les appareils tactiles
          >
            <NavLink 
              to={item.path}
              className="text-gray-700 hover:text-[#12138B] font-semibold py-3"
            >
              {item.title}
            </NavLink>
            {item.isDropdown && renderDropdown(item)}
          </div>
        ))}
      </div>
      
      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute left-0 right-0 top-16 z-40 border-t border-gray-200">
          <div className="py-3 px-4">
            {navItems.map((item, index) => (
              <div key={index} className="border-b border-gray-100 last:border-b-0">
                {item.isDropdown ? (
                  <div className="py-3">
                    <div 
                      className="flex justify-between items-center text-gray-700 font-medium" 
                      onClick={() => setActiveSection(activeSection === item.id ? null : item.id)}
                    >
                      <span>{item.title}</span>
                      <ChevronDown size={16} className={`transform transition-transform ${activeSection === item.id ? 'rotate-180' : ''}`} />
                    </div>
                    
                    {activeSection === item.id && (
                      <div className="mt-2 pl-4 space-y-2">
                        {item.dropdownItems.map((dropItem, idx) => (
                          <NavLink 
                            key={idx} 
                            to={dropItem.path}
                            className="block py-2 text-sm text-gray-600 hover:text-[#12138B]"
                          >
                            {dropItem.title}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink 
                    to={item.path}
                    className="block py-3 text-gray-700 font-medium hover:text-[#12138B]"
                  >
                    {item.title}
                  </NavLink>
                )}
              </div>
            ))}
            
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="flex justify-center space-x-4">
                <button onClick={() => changeLanguage('fr')} className={`px-3 py-1 rounded ${language === 'fr' ? 'bg-[#12138B] text-white' : 'bg-gray-100'}`}>FR</button>
                <button onClick={() => changeLanguage('en')} className={`px-3 py-1 rounded ${language === 'en' ? 'bg-[#12138B] text-white' : 'bg-gray-100'}`}>EN</button>
                <button onClick={() => changeLanguage('ar')} className={`px-3 py-1 rounded ${language === 'ar' ? 'bg-[#12138B] text-white' : 'bg-gray-100'}`}>AR</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navlinks;
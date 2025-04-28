import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { Search, Bell, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import logo from "../../assets/logo.png";
import { useTranslation } from 'react-i18next'; // Importation de useTranslation


const Navlinks = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [language, setLanguage] = useState('fr'); // Ajout de la langue sélectionnée
   const { t, i18n } = useTranslation(); // Utilisation du hook useTranslation
  const navigate = useNavigate();
  
  // Refs for dropdown menus
  const dropdownRefs = useRef({});
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

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
    }, 300);
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
    }, 300);
  };

  const toggleSearch = () => {
    setSearchOpen(prev => !prev);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };


  const changeLanguage = (lang) => {
    setLanguage(lang);
    // Ici tu pourras ajouter l'intégration réelle avec un système de traduction
    // comme i18next pour vraiment changer les textes
  };

  const navItems = [
    {
      title: language === 'fr' ? "À LA UNE" : language === 'en' ? "HIGHLIGHTS" : "الأخبار",
      path: "/home",
      isDropdown: false
    },
    {
      title: "Tamkine",
      id: "tamkine",
      isDropdown: true,
      dropdownItems: [
        { title: language === 'fr' ? "MOT DU PRÉSIDENT" : language === 'en' ? "PRESIDENT'S WORD" : "كلمة الرئيس", path: "/motPresident" },
        { title: language === 'fr' ? "FONDATION TAMKINE" : language === 'en' ? "TAMKINE FOUNDATION" : "مؤسسة تمكين", path: "/fondation" },
        { title: language === 'fr' ? "NOS VALEURS" : language === 'en' ? "OUR VALUES" : "قيمنا", path: "/nosValeurs" },
        { title: language === 'fr' ? "NOS MISSIONS" : language === 'en' ? "OUR MISSIONS" : "مهامنا", path: "/nosMissions" },
        { title: language === 'fr' ? "NOTRE ÉQUIPE" : language === 'en' ? "OUR TEAM" : "فريقنا", path: "/notreEquipe" }
      ]
    },
    {
      title: language === 'fr' ? "Programmes" : language === 'en' ? "Programs" : "البرامج",
      path: "/programs",
      isDropdown: false
    },
    {
      title: language === 'fr' ? "Actualités" : language === 'en' ? "News" : "الأخبار",
      path: "/actualites",
      isDropdown: false
    },
    {
      title: language === 'fr' ? "Plateformes" : language === 'en' ? "Platforms" : "المنصات",
      path: "/Plateforms",
      isDropdown: false
    },
    {
      title: language === 'fr' ? "Activités Partenaires" : language === 'en' ? "Partner Activities" : "أنشطة الشركاء",
      path: "/partners-activities",
      isDropdown: false
    },
    {
      title: language === 'fr' ? "Communication & Médias" : language === 'en' ? "Communication & Media" : "الإعلام والاتصال",
      id: "media",
      isDropdown: true,
      dropdownItems: [
        { title: language === 'fr' ? "Videotheque" : language === 'en' ? "Video Library" : "مكتبة الفيديو", path: "/videotheque" },
        { title: language === 'fr' ? "Phototèque" : language === 'en' ? "Photo Library" : "مكتبة الصور", path: "/phototheque" },
        { title: language === 'fr' ? "Téléchargement" : language === 'en' ? "Downloads" : "التنزيلات", path: "/document" }
      ]
    },
    {
      title: language === 'fr' ? "Nous rejoindre" : language === 'en' ? "Join Us" : "انضم إلينا",
      id: "join",
      isDropdown: true,
      dropdownItems: [
        { title: language === 'fr' ? "Contactez-nous" : language === 'en' ? "Contact Us" : "اتصل بنا", path: "/contacter-tamkine" },
        { title: language === 'fr' ? "Communauté" : language === 'en' ? "Community" : "مجتمع", path: "/community" },
        { title: language === 'fr' ? "Devenir Partenaire" : language === 'en' ? "Become a Partner" : "كن شريكًا" , path: "/partner" }
      ]
    },
    {
      title: language === 'fr' ? "Partenaires Medias" : language === 'en' ? "Media Partners" : "شركاء الإعلام",
      path: "/mediaPartenaire",
      isDropdown: false
    }
  ];

  const renderDropdown = (item) => {
    if (activeSection === item.id) {
      return (
        <div 
          ref={el => dropdownRefs.current[item.id] = el}
          className="absolute bg-white shadow-xl rounded-lg mt-2 py-3 px-4 border border-gray-200 transition-all duration-300 ease-in-out opacity-100 w-64 left-0 z-1000"
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
        >
          {item.dropdownItems.map((dropItem, index) => (
            <NavLink 
              key={index}
              to={dropItem.path} 
              className="block py-3 text-sm text-black hover:text-[#12138B] hover:bg-gray-50 hover:pl-2 rounded transition-all duration-200 flex items-center group"
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
    <header className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <NavLink to="/home" className="flex items-center">
              <img src={logo} alt="Fondation Tamkine" className="h-12 mr-3" />
              <div>
                <h1 className="text-[#12138B] font-bold text-xl">FONDATION TAMKINE</h1>
                <p className="text-gray-600 text-xs">Actualités et informations</p>
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
            <div className="relative">
              <button 
                onClick={toggleSearch}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Search size={20} className="text-gray-700" />
              </button>
              {searchOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
                  <form className="flex">
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#12138B]"
                    />
                    <button className="bg-[#12138B] text-white px-4 rounded-r-lg hover:bg-[#0a0b5e]">
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

        {searchOpen && mobileMenuOpen && (
          <div className="block md:hidden absolute left-0 right-0 top-16 z-50 bg-white p-3 shadow-lg rounded-md">
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12138B]"
              placeholder="Rechercher..."
            />
          </div>
        )}
      </div>

      <div className="hidden md:flex justify-center space-x-8 mt-4">
        {navItems.map((item, index) => (
          <div 
            key={index} 
            className="relative"
            onMouseEnter={() => handleHover(item.id)}
            onMouseLeave={() => handleLeave(item.id)}
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
    </header>
  );
};

export default Navlinks;

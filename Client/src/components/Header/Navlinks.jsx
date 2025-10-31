import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Search, Menu, X, Globe, ChevronDown, Users, Image, Video, Handshake, Newspaper, Phone, Calendar, Info } from "lucide-react";
import logo from "../../assets/logo.jpg";
import { useTranslation } from "react-i18next";

const Navlinks = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "fr");
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);

  // Détection du scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
        setSearchResults([]);
        setSearchTerm("");
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, [searchOpen]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  // 🔍 Toutes les pages du site pour la recherche intelligente
  const allPages = [
    // Actualités
    { title: "Actualités", path: "/actualites", keywords: ["news", "actualités", "infos", "nouvelles", "actualite"], icon: Newspaper },
    
    // Club
    { title: "Mot du Président", path: "/motPresident", keywords: ["président", "mot", "message", "club", "president"], icon: Users },
    { title: "Nos Missions", path: "/nosMissions", keywords: ["missions", "objectifs", "club", "valeurs", "mission"], icon: Info },
    { title: "Notre Équipe", path: "/notreEquipe", keywords: ["équipe", "team", "joueurs", "staff", "equipe"], icon: Users },
    
    // Calendrier
    { title: "Calendrier", path: "/programs", keywords: ["calendrier", "matchs", "programmes", "rencontres", "matches", "programme"], icon: Calendar },
    
    // Médias
    { title: "Photothèque", path: "/phototheque", keywords: ["photos", "images", "galerie", "photothèque", "phototheque", "photo"], icon: Image },
    { title: "Vidéothèque", path: "/videotheque", keywords: ["vidéos", "videos", "films", "vidéothèque", "videotheque", "video"], icon: Video },
    
    // Partenaires
    { title: "Partenaires", path: "/partner", keywords: ["partenaires", "sponsors", "partners", "partenaire", "sponsor"], icon: Handshake },
    { title: "Médias Partenaires", path: "/mediaPartenaire", keywords: ["médias", "presse", "partenaires médias", "media", "medias"], icon: Newspaper },
    
    // Contact
    { title: "Contact", path: "/contacter-tamkine", keywords: ["contact", "contacter", "nous joindre", "email", "téléphone", "telephone"], icon: Phone },
    { title: "Communauté", path: "/community", keywords: ["communauté", "community", "rejoindre", "communaute", "membre"], icon: Users },
  ];

  // Recherche intelligente
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    
    if (value.trim().length > 1) {
      const results = allPages.filter(page => 
        page.title.toLowerCase().includes(value.toLowerCase()) ||
        page.keywords.some(keyword => keyword.toLowerCase().includes(value.toLowerCase()))
      ).slice(0, 5);
      
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Chercher d'abord dans les pages connues
      const exactMatch = allPages.find(page => 
        page.title.toLowerCase() === searchTerm.toLowerCase() ||
        page.keywords.some(k => k.toLowerCase() === searchTerm.toLowerCase())
      );
      
      if (exactMatch) {
        navigate(exactMatch.path);
      } else {
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      }
      
      setSearchTerm("");
      setSearchOpen(false);
      setSearchResults([]);
    }
  };

  // Gestion des menus avec délai
  const handleMouseEnter = (index) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300); // Délai de 300ms avant fermeture
  };

  const handleResultClick = (path) => {
    navigate(path);
    setSearchTerm("");
    setSearchOpen(false);
    setSearchResults([]);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { 
      title: t("news"), 
      path: "/actualites",
      icon: Newspaper
    },
    {
      title: t("club"),
      isDropdown: true,
      icon: Users,
      items: [
        { title: t("president_word"), path: "/motPresident" },
        { title: t("missions"), path: "/nosMissions" },
        { title: t("team"), path: "/notreEquipe" },
      ]
    },
    { 
      title: t("calendrier"), 
      path: "/programs",
      icon: Calendar
    },
    {
      title: t("medias"),
      isDropdown: true,
      icon: Video,
      items: [
        { title: t("photos"), path: "/phototheque" },
        { title: t("videos"), path: "/videotheque" },
      ]
    },
    { 
      title: t("partenaires"), 
      path: "/partner",
      icon: Handshake
    },
    {
      title: t("join_us"),
      isDropdown: true,
      icon: Users,
      items: [
        { title: t("contact"), path: "/contacter-tamkine" },
        { title: t("community"), path: "/community" },
      ]
    },
    { 
      title: t("medias_partners"), 
      path: "/mediaPartenaire",
      icon: Newspaper
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0e27]/95 backdrop-blur-lg shadow-2xl shadow-orange-500/10"
          : "bg-[#0a0e27]"
      }`}
    >
      {/* 🔥 BARRE SUPÉRIEURE - Style NBA */}
      <div className="border-b border-orange-500/20">
        <div className="w-full flex items-center justify-center">
          <div className="flex items-center justify-between w-[95%] lg:w-[90%] xl:w-[85%] py-2">
            {/* Logo + Titre */}
            <NavLink to="/actualites" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500/30 blur-lg rounded-full group-hover:bg-orange-500/50 transition-all"></div>
                <img
                  src={logo}
                  alt="Jorfof Basket Club"
                  className="relative h-12 w-12 rounded-full border-2 border-orange-500 shadow-lg object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-blue-500 font-black text-xl tracking-tight">
                  JORFOF BASKET CLUB
                </h1>
                <p className="text-gray-400 text-xs font-medium">Toujours prêt à briller</p>
              </div>
            </NavLink>

            {/* Actions Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Bouton Présentation avec icône */}
              <button
                onClick={() => navigate("/motPresident")}
                className="relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-blue-600 opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
                <div className="relative px-5 py-2 bg-gradient-to-r from-orange-500/90 to-blue-600/90 hover:from-orange-500 hover:to-blue-600 rounded-lg text-white text-sm font-bold tracking-wide transition-all flex items-center gap-2">
                  <Info size={16} />
                  PRÉSENTATION DU CLUB
                </div>
              </button>

              {/* Recherche Intelligente - Overlay moderne */}
              <div className="relative">
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-orange-500/30 hover:border-orange-500/60 transition-all group"
                >
                  <Search size={20} className="text-orange-400 group-hover:scale-110 transition-transform" />
                </button>
              </div>

              {/* Langues */}
              <div className="flex items-center space-x-1 bg-white/5 rounded-lg p-1 border border-orange-500/20">
                <Globe size={16} className="text-orange-400 ml-2" />
                {["fr", "en"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold tracking-wide transition-all ${
                      language === lang
                        ? "bg-gradient-to-r from-orange-500 to-blue-500 text-white shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 transition-all"
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-orange-400" />
              ) : (
                <Menu size={24} className="text-orange-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 🔥 NAVIGATION PRINCIPALE - Style NBA */}
      <div className="border-b border-orange-500/10" ref={dropdownRef}>
        <div className="w-full flex items-center justify-center">
          <div className="w-[95%] lg:w-[90%] xl:w-[85%]">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center space-x-1 py-3">
              {navItems.map((item, index) => (
                item.isDropdown ? (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className="relative px-4 py-2 text-sm font-bold tracking-wide uppercase transition-all group text-gray-300 hover:text-white flex items-center gap-1"
                    >
                      <span className="relative z-10">{item.title}</span>
                      <ChevronDown size={14} className={`transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`} />
                      <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 rounded-lg transition-all"></div>
                    </button>
                    
                    {activeDropdown === index && (
                      <div 
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#101636] border-2 border-orange-500/30 rounded-xl shadow-2xl shadow-orange-500/20 min-w-[220px] overflow-hidden z-50"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {item.items.map((subItem, subIndex) => (
                          <NavLink
                            key={subIndex}
                            to={subItem.path}
                            className="block px-4 py-3 text-sm text-gray-300 hover:text-orange-400 hover:bg-orange-500/10 transition-all border-b border-orange-500/10 last:border-b-0"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {subItem.title}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    key={index}
                    to={item.path}
                    className={({ isActive }) =>
                      `relative px-4 py-2 text-sm font-bold tracking-wide uppercase transition-all group ${
                        isActive
                          ? "text-orange-400"
                          : "text-gray-300 hover:text-white"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="relative z-10">{item.title}</span>
                        {isActive && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500"></div>
                        )}
                        <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 rounded-lg transition-all"></div>
                      </>
                    )}
                  </NavLink>
                )
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* 📱 MENU MOBILE - Design amélioré */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#101636] border-b border-orange-500/20">
          <div className="w-full flex items-center justify-center">
            <div className="w-[95%] py-4 space-y-1">
              {/* Bouton Recherche Mobile */}
              <button
                onClick={() => {
                  setSearchOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full mb-4 flex items-center justify-center gap-2 bg-white/10 border border-orange-500/30 rounded-lg px-4 py-3 text-white hover:bg-white/15 transition-all"
              >
                <Search size={18} className="text-orange-400" />
                <span className="text-sm font-medium">Rechercher dans le site...</span>
              </button>

              {/* Navigation Links Mobile */}
              {navItems.map((item, index) => (
                item.isDropdown ? (
                  <div key={index} className="border-b border-orange-500/10">
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                      className="w-full px-4 py-3 rounded-lg text-sm font-bold tracking-wide uppercase transition-all text-gray-300 hover:bg-white/5 hover:text-white flex items-center justify-between"
                    >
                      <span>{item.title}</span>
                      <ChevronDown size={16} className={`transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {activeDropdown === index && (
                      <div className="pl-4 pb-2 space-y-1">
                        {item.items.map((subItem, subIndex) => (
                          <NavLink
                            key={subIndex}
                            to={subItem.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-3 py-2 text-xs text-gray-400 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-all"
                          >
                            → {subItem.title}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    key={index}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg text-sm font-bold tracking-wide uppercase transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-orange-500/20 to-blue-500/20 text-orange-400 border border-orange-500/30"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`
                    }
                  >
                    {item.title}
                  </NavLink>
                )
              ))}

              {/* Actions Mobile */}
              <div className="pt-4 border-t border-orange-500/20 space-y-3">
                {/* Présentation avec icône */}
                <button
                  onClick={() => {
                    navigate("/motPresident");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-blue-600 rounded-lg text-white text-sm font-bold tracking-wide hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                >
                  <Info size={16} />
                  PRÉSENTATION DU CLUB
                </button>

                {/* Langues Mobile */}
                <div className="flex items-center justify-center space-x-2 bg-white/5 rounded-lg p-3 border border-orange-500/20">
                  <Globe size={16} className="text-orange-400" />
                  <span className="text-gray-400 text-xs font-medium mr-2">Langue :</span>
                  {["fr", "en"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => changeLanguage(lang)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold tracking-wide transition-all ${
                        language === lang
                          ? "bg-gradient-to-r from-orange-500 to-blue-500 text-white"
                          : "text-gray-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔥 OVERLAY DE RECHERCHE MODERNE - Style Premium */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] animate-fadeIn">
          {/* Background blur */}
          <div 
            className="absolute inset-0 bg-[#0a0e27]/95 backdrop-blur-xl"
            onClick={() => {
              setSearchOpen(false);
              setSearchResults([]);
              setSearchTerm("");
            }}
          ></div>
          
          {/* Contenu de recherche */}
          <div className="relative h-full flex items-start justify-center pt-32 px-4">
            <div className="w-full max-w-3xl" ref={searchRef}>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-blue-600 rounded-full mb-4 shadow-2xl shadow-orange-500/50">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-500 mb-2">
                  Rechercher
                </h2>
                <p className="text-gray-400 text-sm">Trouvez ce que vous cherchez sur notre site</p>
              </div>

              {/* Barre de recherche */}
              <form onSubmit={handleSearchSubmit} className="mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
                  <div className="relative flex items-center bg-white/10 border-2 border-orange-500/30 rounded-2xl px-6 py-4 focus-within:border-orange-500 transition-all">
                    <Search size={24} className="text-orange-400 mr-4 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Tapez votre recherche..."
                      value={searchTerm}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="bg-transparent outline-none text-lg text-white placeholder-gray-400 w-full"
                      autoFocus
                    />
                    {searchTerm && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchTerm("");
                          setSearchResults([]);
                        }}
                        className="ml-4 p-2 hover:bg-white/10 rounded-full transition-all"
                      >
                        <X size={20} className="text-gray-400" />
                      </button>
                    )}
                  </div>
                </div>
              </form>

              {/* Résultats de recherche */}
              {searchResults.length > 0 ? (
                <div className="space-y-2 animate-fadeIn">
                  <p className="text-gray-400 text-sm mb-4 px-2">
                    {searchResults.length} résultat{searchResults.length > 1 ? 's' : ''} trouvé{searchResults.length > 1 ? 's' : ''}
                  </p>
                  {searchResults.map((result, index) => {
                    const Icon = result.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => handleResultClick(result.path)}
                        className="w-full group"
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="relative flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-orange-500/20 hover:border-orange-500/40 rounded-xl p-4 transition-all">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Icon size={20} className="text-orange-400" />
                            </div>
                            <div className="flex-1 text-left">
                              <h3 className="text-white font-bold text-lg mb-1">{result.title}</h3>
                              <p className="text-gray-400 text-sm">{result.keywords.slice(0, 3).join(', ')}</p>
                            </div>
                            <ChevronDown size={20} className="text-orange-400 -rotate-90 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : searchTerm.length > 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search size={32} className="text-gray-500" />
                  </div>
                  <p className="text-gray-400">Aucun résultat pour "{searchTerm}"</p>
                  <p className="text-gray-500 text-sm mt-2">Essayez avec d'autres mots-clés</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-400 text-sm px-2">Pages populaires</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {allPages.slice(0, 6).map((page, index) => {
                      const Icon = page.icon;
                      return (
                        <button
                          key={index}
                          onClick={() => handleResultClick(page.path)}
                          className="group"
                        >
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-orange-500/20 hover:border-orange-500/40 rounded-xl p-3 transition-all">
                              <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Icon size={18} className="text-orange-400" />
                              </div>
                              <span className="text-white font-semibold text-sm">{page.title}</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bouton fermer */}
              <div className="text-center mt-8">
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchResults([]);
                    setSearchTerm("");
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-orange-500/30 hover:border-orange-500/60 rounded-xl text-white font-semibold transition-all"
                >
                  <X size={18} />
                  Fermer
                </button>
                <p className="text-gray-500 text-xs mt-4">
                  Appuyez sur <kbd className="px-2 py-1 bg-white/10 rounded text-xs">ESC</kbd> pour fermer
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navlinks;
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { Search, Bell, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import logo from "../../assets/logo.png";

const Navlinks = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  
  // Refs for dropdown menus
  const dropdownRefs = useRef({});
  const timeoutRef = useRef(null);

  // Handle scroll to change header appearance
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
    // Use timeout to prevent immediate closing
    timeoutRef.current = setTimeout(() => {
      setActiveSection(null);
    }, 300); // Add a slight delay before closing
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  // Navigation menu items with their dropdowns
  const navItems = [
    {
      title: "À LA UNE",
      path: "/home",
      isDropdown: false
    },
    {
      title: "Tamkine",
      id: "tamkine",
      isDropdown: true,
      dropdownItems: [
        { title: "MOT DU PRÉSIDENT", path: "/motPresident" },
        { title: "FONDATION TAMKINE", path: "/fondation" },
        { title: "NOS VALEURS", path: "/nosValeurs" },
        { title: "NOS MISSIONS", path: "/nosMissions" },
        { title: "NOTRE ÉQUIPE", path: "/notreEquipe" }
      ]
    },
    {
      title: "Programmes",
      path: "/programs",
      isDropdown: false
    },
    {
      title: "Actualités",
      path: "/actualites",
      isDropdown: false
    },
    {
      title: "Plateformes",
      path: "/Plateforms",
      isDropdown: false
    },
    {
      title: "Activités Partenaires",
      path: "/partners-activities",
      isDropdown: false
    },
    {
      title: "Communication & Médias",
      id: "media",
      isDropdown: true,
      dropdownItems: [
        { title: "Videotheque", path: "/videotheque" },
        { title: "Phototèque", path: "/phototheque" },
        { title: "Téléchargement", path: "/document" }
      ]
    },
    {
      title: "Nous rejoindre",
      id: "join",
      isDropdown: true,
      dropdownItems: [
        { title: "Contactez-nous", path: "/contacter-tamkine" },
        { title: "Communauté", path: "/community" },
        { title: "Devenir Partenaire", path: "/partner" }
      ]
    },
    {
      title: "Partenaires Medias",
      path: "/mediaPartenaire",
      isDropdown: false
    }
  ];

  // Render dropdown menu
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

  // Function to handle navigation on click of the bell icon
  const handleNotificationClick = () => {
    navigate('/home'); // Redirect to the home page
  };

  return (
    <header className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-4'
    }`}>
      <div className="container mx-auto px-4">
        {/* Top Bar - Logo, Search, Lang Switcher */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            {/* Logo */}
            <NavLink to="/home" className="flex items-center">
              <img src={logo} alt="Fondation Tamkine" className="h-12 mr-3" />
              <div>
                <h1 className="text-[#12138B] font-bold text-xl">FONDATION TAMKINE</h1>
                <p className="text-gray-600 text-xs">Actualités et informations</p>
              </div>
            </NavLink>
          </div>

          {/* Mobile Toggle */}
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

          {/* Desktop Right Side Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search */}
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

            {/* Notifications */}
            <button 
              className="p-2 rounded-full hover:bg-gray-100 relative"
              onClick={handleNotificationClick} // Add the click handler here
            >
              <Bell size={20} className="text-gray-700" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Language Switcher */}
            <div className="flex space-x-2 items-center border-l pl-4 border-gray-300">
              <button className="text-sm font-medium hover:text-[#12138B]">FR</button>
              <span className="text-gray-400">|</span>
              <button className="text-sm font-medium hover:text-[#12138B]">EN</button>
              <span className="text-gray-400">|</span>
              <button className="text-sm font-medium hover:text-[#12138B]">AR</button>
            </div>
          </div>
        </div>

        {/* Search bar on mobile when opened */}
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

      {/* Navigation Links */}
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

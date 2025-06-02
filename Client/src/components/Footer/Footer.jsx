import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footerlastpart from './Footerlastpart';
import logo from '../../assets/logoblanc.png';
import { useTranslation } from 'react-i18next';  // Import de useTranslation

const Footer = () => {
  const { i18n, t } = useTranslation();
  const [showMapModal, setShowMapModal] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BACKEND;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch(apiUrl + "/api/newsletter/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('✅ ' + t('Merci pour votre abonnement !'));
        setEmail('');
      } else {
        setMessage(data.error || data.message || '❌ ' + t('Une erreur est survenue.'));
      }
    } catch (err) {
      setMessage('❌ ' + t('Erreur serveur, veuillez réessayer plus tard.'));
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openGoogleMaps = () => {
    window.open('https://www.google.com/maps/place/Fondation+Tamkine/@33.987616,-6.870142,13z/data=!4m6!3m5!1s0xda76b87cf228b79:0x10fae9b6f53ca782!8m2!3d33.9876158!4d-6.8701418!16s%2Fg%2F11g726s4z7?hl=fr&entry=ttu', '_blank');
  };

  return (
    <footer className="bg-gradient-to-b from-[#1C1C47] to-[#15152E] text-white relative">
      <div className="container mx-auto px-4 lg:px-16 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

          <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
            <div 
              onClick={() => handleNavigation('/home')} 
              className="mb-4 transition-transform hover:scale-105 duration-300 cursor-pointer"
            >
              <img src={logo} alt="Tamkine Logo" className="w-48 h-48 object-contain drop-shadow-lg" />
            </div>
            <p className="text-gray-300 text-sm mt-2 max-w-xs text-center lg:text-left">
              {t("Fondation dédiée à l'éducation et au développement des compétences")}
            </p>
          </div>

          <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
            <h4 className="font-bold text-lg mb-5 pb-2 border-b-2 border-blue-400 inline-block">
              {t("Nos Plateformes")}
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 w-full">
              {[
                { name: t("Tutoring"), url: "https://tutoring.tamkine.org/" },
                { name: t("Tamtech Connect"), url: "https://connect.tamtechsolution.com/" },
                { name: t("Orientation"), url: "https://orientation.tamkine.org/" },
                { name: t("JPOV"), url: "https://complexe.tamkine.org/" },
                { name: t("Séminaires"), url: "https://seminars.tamtechsolution.com/" },
                { name: t("Bourses"), url: "https://scholarship.tamkine.org/" }
              ].map((platform, idx) => (
                <li key={idx}>
                  <a 
                    href={platform.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300"
                  >
                    <span className="text-blue-400 mr-2">›</span> {platform.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
            <h4 className="font-bold text-lg mb-5 pb-2 border-b-2 border-blue-400 inline-block">
              {t("À Propos")}
            </h4>
            <ul className="space-y-4">
              {[
                { name: t("Qui sommes-nous ?"), path: "/qui-sommes-nous-" },
                { name: t("Contacter Tamkine"), path: "/contacter-tamkine" },
                { name: t("Nous rejoindre"), path: "/nous-rejoindre" }
              ].map((item, idx) => (
                <li key={idx}>
                  <div 
                    onClick={() => handleNavigation(item.path)}
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center cursor-pointer"
                  >
                    <span className="text-blue-400 mr-2">›</span> {item.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center lg:items-start">
            <h4 className="font-bold text-lg mb-5 pb-2 border-b-2 border-blue-400 inline-block">
              {t("Notre Localisation")}
            </h4>
            <div 
              className="w-full rounded-lg overflow-hidden shadow-xl border border-gray-700 relative group cursor-pointer"
              onClick={openGoogleMaps}
            >
              <iframe
                title="Tamkine Location"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13232.765817930867!2d-6.8701418!3d33.9876158!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76b87cf228b79%3A0x10fae9b6f53ca782!2sFondation%20Tamkine!5e0!3m2!1sfr!2sma!4v1709055800360!5m2!1sfr!2sma&markers=color:red%7C33.9876158,-6.8701418"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="filter grayscale hover:grayscale-0 transition-all duration-500"
              ></iframe>
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <span className="text-white font-medium text-sm bg-blue-600 px-3 py-1 rounded-md shadow-lg">
                  {t("Voir sur Google Maps")}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMapModal(true);
                }}
                className="absolute bottom-3 right-3 bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-md 
                hover:bg-blue-500 transition duration-300 opacity-90 hover:opacity-100 shadow-md transform hover:scale-105"
              >
                {t("Agrandir")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
        <div className="bg-gradient-to-r from-[#2E2E60] to-[#3B3B7A] py-8 px-5 sm:px-8 rounded-xl shadow-2xl transform hover:shadow-blue-900/20 hover:-translate-y-1 transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold mb-3">{t("Restez informé")}</h3>
              <p className="text-gray-300 text-sm mb-4 md:mb-0">
                {t("Recevez les dernières actualités de la Fondation Tamkine")}
              </p>
            </div>
            <div className="flex-1">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder={t("Votre email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="px-4 py-3 rounded-md bg-white/10 border border-white/20 backdrop-blur-sm text-white placeholder-gray-300 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-md transition-all duration-300 shadow-lg hover:shadow-blue-900/50"
                >
                  {t("S'abonner")}
                </button>
              </form>
              {message && (
                <div className={`mt-3 text-sm ${message.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footerlastpart />

      {/* MODALE Agrandir la carte */}
      {showMapModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4 backdrop-blur-sm transition-all"
          onClick={() => setShowMapModal(false)}
        >
          <div 
            className="bg-[#1C1C47] text-white p-6 rounded-xl shadow-2xl w-full sm:w-4/5 md:w-3/4 lg:w-2/3 max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{t("Fondation Tamkine")}</h3>
              <button 
                onClick={() => setShowMapModal(false)}
                className="text-gray-300 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="relative rounded-lg overflow-hidden">
              <iframe
                title="Tamkine Location"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13232.765817930867!2d-6.8701418!3d33.9876158!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76b87cf228b79%3A0x10fae9b6f53ca782!2sFondation%20Tamkine!5e0!3m2!1sfr!2sma!4v1709055800360!5m2!1sfr!2sma&markers=color:red%7C33.9876158,-6.8701418"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="transition-all duration-500"
              ></iframe>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <p className="text-gray-300 text-sm">
                  <strong>{t("Adresse")}:</strong> Rabat, Maroc
                </p>
              </div>
              <button
                onClick={openGoogleMaps}
                className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-md transition-all duration-300"
              >
                {t("Ouvrir dans Google Maps")}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
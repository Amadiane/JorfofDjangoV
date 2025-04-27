import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footerlastpart from './Footerlastpart';
import logo from '../../assets/logoblanc.png';

const Footer = () => {
  const [showMapModal, setShowMapModal] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Réinitialise le message à chaque soumission
    try {
      const res = await fetch("http://localhost:8000/api/newsletter/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
  
      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Merci pour votre abonnement !');
        setEmail('');
      } else {
        setMessage(data.error || data.message || '❌ Une erreur est survenue.');
      }
    } catch (err) {
      setMessage('❌ Erreur serveur, veuillez réessayer plus tard.');
    }
  };

  // Fonction pour naviguer et défiler vers le haut
  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-[#1C1C47] to-[#15152E] text-white relative">
      {/* Section principale du footer */}
      <div className="container mx-auto px-4 lg:px-16 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Logo et slogan - mieux aligné */}
          <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
            <div 
              onClick={() => handleNavigation('/home')} 
              className="mb-4 transition-transform hover:scale-105 duration-300 cursor-pointer"
            >
              <img 
                src={logo} 
                alt="Tamkine Logo" 
                className="w-48 h-48 object-contain drop-shadow-lg" 
              />
            </div>
            <p className="text-gray-300 text-sm mt-2 max-w-xs text-center lg:text-left">
              Fondation dédiée à l'éducation et au développement des compétences
            </p>
          </div>

          {/* Accès aux plateformes - meilleur espacement */}
          <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
            <h4 className="font-bold text-lg mb-5 pb-2 border-b-2 border-blue-400 inline-block">
              Nos Plateformes
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 w-full">
              {[
                { name: "Tutoring", url: "https://tutoring.tamkine.org/" },
                { name: "Workplace", url: "https://connect.tamtechsolution.com/" },
                { name: "Orientation", url: "https://orientation.tamkine.org/" },
                { name: "JPOV", url: "https://complexe.tamkine.org/" },
                { name: "Séminaires", url: "https://seminars.tamtechsolution.com/" },
                { name: "Bourses", url: "https://scholarship.tamkine.org/" }
              ].map((platform, idx) => (
                <li key={idx} className="transition-all">
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

          {/* À propos - alignement et espacement améliorés */}
          <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
            <h4 className="font-bold text-lg mb-5 pb-2 border-b-2 border-blue-400 inline-block">
              À Propos
            </h4>
            <ul className="space-y-4">
              {[
                { name: "Qui sommes-nous ?", path: "/qui-sommes-nous-" },
                { name: "Contacter Tamkine", path: "/contacter-tamkine" },
                { name: "Nous rejoindre", path: "/nous-rejoindre" }
              ].map((item, idx) => (
                <li key={idx} className="transition-all">
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

          {/* Carte et localisation - ajustements pour alignement */}
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="font-bold text-lg mb-5 pb-2 border-b-2 border-blue-400 inline-block">
              Notre Localisation
            </h4>
            <div className="w-full rounded-lg overflow-hidden shadow-xl border border-gray-700 relative group">
              <iframe
                title="Tamkine Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.102556349996!2d-7.620292684799703!3d33.59222784904713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d28f3467c6b9%3A0xa1bc20ec633387f6!2sTamkine%20Foundation!5e0!3m2!1sfr!2sma!4v1616782002584!5m2!1sfr!2sma"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="filter grayscale hover:grayscale-0 transition-all duration-500"
              ></iframe>
              <button
                onClick={() => setShowMapModal(true)}
                className="absolute bottom-3 right-3 bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-md 
                hover:bg-blue-500 transition duration-300 opacity-90 hover:opacity-100 shadow-md transform hover:scale-105"
              >
                Agrandir
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section Newsletter - design plus unifié */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
        <div className="bg-gradient-to-r from-[#2E2E60] to-[#3B3B7A] py-8 px-5 sm:px-8 rounded-xl shadow-2xl transform hover:shadow-blue-900/20 hover:-translate-y-1 transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold mb-3">Restez informé</h3>
              <p className="text-gray-300 text-sm mb-4 md:mb-0">
                Recevez les dernières actualités de la Fondation Tamkine
              </p>
            </div>
            <div className="flex-1">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="px-4 py-3 rounded-md bg-white/10 border border-white/20 backdrop-blur-sm text-white placeholder-gray-300 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-md transition-all duration-300 shadow-lg hover:shadow-blue-900/50"
                >
                  S'abonner
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

      {/* Footer bas */}
      <Footerlastpart />

      {/* MODALE Agrandir la carte */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4 backdrop-blur-sm transition-all">
          <div className="bg-[#1C1C47] text-white rounded-xl p-5 max-w-5xl w-full h-[80vh] flex flex-col border border-blue-500/30 shadow-2xl animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Fondation Tamkine
              </h2>
              <button
                onClick={() => setShowMapModal(false)}
                className="text-white bg-red-500/80 hover:bg-red-600 rounded-full p-1 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <iframe
              title="Localisation Tamkine Grande"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.102556349996!2d-7.620292684799703!3d33.59222784904713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d28f3467c6b9%3A0xa1bc20ec633387f6!2sTamkine%20Foundation!5e0!3m2!1sfr!2sma!4v1616782002584!5m2!1sfr!2sma"
              width="100%"
              height="100%"
              style={{ border: 0, flexGrow: 1 }}
              className="rounded-lg"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="mt-4 text-gray-300 text-sm">
              <p>26 Avenue Mers Sultan, Casablanca, Maroc</p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
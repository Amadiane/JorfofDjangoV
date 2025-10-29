// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Footerlastpart from './Footerlastpart';
// import logo from '../../assets/logo.jpg';
// import { useTranslation } from 'react-i18next';  // Import de useTranslation

// const Footer = () => {
//   const { i18n, t } = useTranslation();
//   const [showMapModal, setShowMapModal] = useState(false);
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_API_BACKEND;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     try {
//       const res = await fetch(apiUrl + "/api/newsletter/", {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setMessage('✅ ' + t('Merci pour votre abonnement !'));
//         setEmail('');
//       } else {
//         setMessage(data.error || data.message || '❌ ' + t('Une erreur est survenue.'));
//       }
//     } catch (err) {
//       setMessage('❌ ' + t('Erreur serveur, veuillez réessayer plus tard.'));
//     }
//   };

//   const handleNavigation = (path) => {
//     navigate(path);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const openGoogleMaps = () => {
//     window.open('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2447.3216835031913!2d-13.674842055287208!3d9.546610528762722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xf1cd77e22e1968d%3A0x4f7681cb4f7a0189!2sStadium%20Basketball%20Courts!5e0!3m2!1sfr!2sma!4v1761613903391!5m2!1sfr!2sma', '_blank');
//   };

//   return (
//     <footer className="bg-gradient-to-b from-[#1C1C47] to-[#15152E] text-white relative">
//       <div className="container mx-auto px-4 lg:px-16 pt-12 pb-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

//           <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
//             <div 
//               onClick={() => handleNavigation('/home')} 
//               className="mb-4 transition-transform hover:scale-105 duration-300 cursor-pointer"
//             >
//               {/* <img src={logo} alt="Tamkine Logo" className="w-48 h-48 object-contain drop-shadow-lg" /> */}
//               <img src={logo} alt="logo" className="w-48 h-48 object-contain drop-shadow-lg" />
//             </div>
//             <p className="text-gray-300 text-sm mt-2 max-w-xs text-center lg:text-left">
//               {/* {t("Fondation dédiée à l'éducation et au développement des compétences")} */}
//               {t("Jorfof Club — Toujours Prêt à Gagner !")}
//             </p>
//           </div>

//           {/* <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
//             <h4 className="font-bold text-lg mb-5 pb-2 border-b-2 border-blue-400 inline-block">
//               {t("Nos Plateformes")}
//             </h4>
//             <ul className="grid grid-cols-2 gap-x-4 gap-y-3 w-full">
//               {[
//                 { name: t("Tutoring"), url: "https://tutoring.tamkine.org/" },
//                 { name: t("Tamtech Connect"), url: "https://connect.tamtechsolution.com/" },
//                 { name: t("Orientation"), url: "https://orientation.tamkine.org/" },
//                 { name: t("JPOV"), url: "https://complexe.tamkine.org/" },
//                 { name: t("Séminaires"), url: "https://seminars.tamtechsolution.com/" },
//                 { name: t("Bourses"), url: "https://scholarship.tamkine.org/" }
//               ].map((platform, idx) => (
//                 <li key={idx}>
//                   <a 
//                     href={platform.url} 
//                     target="_blank" 
//                     rel="noopener noreferrer" 
//                     className="flex items-center text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300"
//                   >
//                     <span className="text-blue-400 mr-2">›</span> {platform.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div> */}

//           <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
//             <h4 className="font-bold text-lg mb-5 pb-2 border-b-2 border-blue-400 inline-block">
//               {t("Nos Partenaires")}
//             </h4>
//             <ul className="grid grid-cols-2 gap-x-4 gap-y-3 w-full">
//               {[
//                 { name: t("Tekacom"), url: "https://tutoring.tamkine.org/" },
//                 { name: t("Rahi travels"), url: "https://connect.tamtechsolution.com/" },
//                 { name: t("Federation GUINEENNE de basketball"), url: "https://orientation.tamkine.org/" },
//                 // { name: t("JPOV"), url: "https://complexe.tamkine.org/" },
//                 // { name: t("Séminaires"), url: "https://seminars.tamtechsolution.com/" },
//                 // { name: t("Bourses"), url: "https://scholarship.tamkine.org/" }
//               ].map((platform, idx) => (
//                 <li key={idx}>
//                   <a 
//                     href={platform.url} 
//                     target="_blank" 
//                     rel="noopener noreferrer" 
//                     className="flex items-center text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300"
//                   >
//                     <span className="text-blue-400 mr-2">›</span> {platform.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
//             <h4 className="font-bold text-lg mb-5 pb-2 border-b-2 border-blue-400 inline-block">
//               {t("À Propos")}
//             </h4>
//             <ul className="space-y-4">
//               {[
//                 { name: t("Qui sommes-nous ?"), path: "/qui-sommes-nous-" },
//                 // { name: t("Contacter Tamkine"), path: "/contacter-tamkine" },
//                 { name: t("Contacter Jorfof"), path: "/contacter-tamkine" },
//                 { name: t("Nous rejoindre"), path: "/nous-rejoindre" }
//               ].map((item, idx) => (
//                 <li key={idx}>
//                   <div 
//                     onClick={() => handleNavigation(item.path)}
//                     className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center cursor-pointer"
//                   >
//                     <span className="text-blue-400 mr-2">›</span> {item.name}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="flex flex-col items-center lg:items-start">
//             <h4 className="font-bold text-lg mb-5 pb-2 border-b-2 border-blue-400 inline-block">
//               {t("Notre Localisation")}
//             </h4>
//             <div 
//               className="w-full rounded-lg overflow-hidden shadow-xl border border-gray-700 relative group cursor-pointer"
//               onClick={openGoogleMaps}
//             >
//               <iframe
//                 // title="Tamkine Location"
//                 title="Location du club"
//                 // src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13232.765817930867!2d-6.8701418!3d33.9876158!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76b87cf228b79%3A0x10fae9b6f53ca782!2sFondation%20Tamkine!5e0!3m2!1sfr!2sma!4v1709055800360!5m2!1sfr!2sma&markers=color:red%7C33.9876158,-6.8701418"
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2447.3216835031913!2d-13.674842055287208!3d9.546610528762722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xf1cd77e22e1968d%3A0x4f7681cb4f7a0189!2sStadium%20Basketball%20Courts!5e0!3m2!1sfr!2sma!4v1761613903391!5m2!1sfr!2sma" 
//                 width="100%"
//                 height="200"
//                 style={{ border: 0 }}
//                 allowFullScreen=""
//                 loading="lazy"
//                 // className="filter grayscale hover:grayscale-0 transition-all duration-500"
//                 className="transition-transform duration-500 hover:scale-[1.02]"
//               ></iframe>
//               <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
//                 <span className="text-white font-medium text-sm bg-blue-600 px-3 py-1 rounded-md shadow-lg">
//                   {t("Voir sur Google Maps")}
//                 </span>
//               </div>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setShowMapModal(true);
//                 }}
//                 className="absolute bottom-3 right-3 bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-md 
//                 hover:bg-blue-500 transition duration-300 opacity-90 hover:opacity-100 shadow-md transform hover:scale-105"
//               >
//                 {t("Agrandir")}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
//         <div className="bg-gradient-to-r from-[#2E2E60] to-[#3B3B7A] py-8 px-5 sm:px-8 rounded-xl shadow-2xl transform hover:shadow-blue-900/20 hover:-translate-y-1 transition-all duration-300">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
//             <div className="flex-1">
//               <h3 className="text-xl md:text-2xl font-bold mb-3">{t("Restez informé")}</h3>
//               <p className="text-gray-300 text-sm mb-4 md:mb-0">
//                 {/* {t("Recevez les dernières actualités de la Fondation Tamkine")} */}
//                 {t("Recevez les dernières actualités de Jorfof")}
//               </p>
//             </div>
//             <div className="flex-1">
//               <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
//                 <input
//                   type="email"
//                   placeholder={t("Votre email")}
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="px-4 py-3 rounded-md bg-white/10 border border-white/20 backdrop-blur-sm text-white placeholder-gray-300 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
//                 />
//                 <button
//                   type="submit"
//                   className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-md transition-all duration-300 shadow-lg hover:shadow-blue-900/50"
//                 >
//                   {t("S'abonner")}
//                 </button>
//               </form>
//               {message && (
//                 <div className={`mt-3 text-sm ${message.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
//                   {message}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footerlastpart />

//       {/* MODALE Agrandir la carte */}
//       {showMapModal && (
//         <div 
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4 backdrop-blur-sm transition-all"
//           onClick={() => setShowMapModal(false)}
//         >
//           <div 
//             className="bg-[#1C1C47] text-white p-6 rounded-xl shadow-2xl w-full sm:w-4/5 md:w-3/4 lg:w-2/3 max-w-4xl"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold">{t("Jorfof")}</h3>
//               {/* <h3 className="text-xl font-bold">{t("Fondation Tamkine")}</h3> */}
//               <button 
//                 onClick={() => setShowMapModal(false)}
//                 className="text-gray-300 hover:text-white"
//               >
//                 ✕
//               </button>
//             </div>
//             <div className="relative rounded-lg overflow-hidden">
//               <iframe
//                 // title="Tamkine Location"
//                 title="Jorfof Location"
//                 src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13232.765817930867!2d-6.8701418!3d33.9876158!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76b87cf228b79%3A0x10fae9b6f53ca782!2sFondation%20Tamkine!5e0!3m2!1sfr!2sma!4v1709055800360!5m2!1sfr!2sma&markers=color:red%7C33.9876158,-6.8701418"
//                 width="100%"
//                 height="500"
//                 style={{ border: 0 }}
//                 allowFullScreen=""
//                 loading="lazy"
//                 className="transition-all duration-500"
//               ></iframe>
//             </div>
//             <div className="mt-4 flex justify-between">
//               <div>
//                 <p className="text-gray-300 text-sm">
//                   {/* <strong>{t("Adresse")}:</strong> Rabat, Maroc */}
//                   <strong>{t("Adresse")}:</strong> Conakry, Guinée
//                 </p>
//               </div>
//               <button
//                 onClick={openGoogleMaps}
//                 className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-md transition-all duration-300"
//               >
//                 {t("Ouvrir dans Google Maps")}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </footer>
//   );
// };

// export default Footer;

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Youtube, Twitter } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("https://jorfofdjangov.onrender.com/api/newsletter/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setMessage("✓ Merci pour votre inscription !");
        setEmail("");
        setTimeout(() => setMessage(""), 5000);
      } else {
        setMessage("⚠ Une erreur est survenue. Réessayez.");
        setTimeout(() => setMessage(""), 5000);
      }
    } catch (err) {
      console.error("Erreur d'inscription :", err);
      setMessage("⚠ Erreur de connexion. Réessayez.");
      setTimeout(() => setMessage(""), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const partners = [
    { name: "Tekacom", icon: "💼", url: "https://www.facebook.com/profile.php?id=61553931658632" },
    { name: "Rahi Travels", icon: "✈️", url: "#" },
    { name: "Ville de Conakry", icon: "🏛️", url: "#" },
    { name: "Fédération Guinéenne de Basketball", icon: "🏀", url: "#" },
    { name: "Ministère de la Jeunesse et Sports", icon: "🏅", url: "#" }
  ];

  const quickLinks = [
    { label: "Accueil", href: "/" },
    { label: "Le Club", href: "/club" },
    { label: "Équipes", href: "/equipes" },
    { label: "Actualités", href: "/actualites" },
    { label: "Galerie", href: "/phototheque" },
    { label: "Contact", href: "/contacter-tamkine" }
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/profile.php?id=61558931259809", color: "hover:text-blue-500" },
    { name: "Instagram", icon: Instagram, url: "https://instagram.com", color: "hover:text-pink-500" },
    { name: "YouTube", icon: Youtube, url: "https://youtube.com", color: "hover:text-red-500" }
  ];

  return (
    <footer className="bg-gradient-to-br from-[#0a2540] via-[#0f3460] to-[#0a2540] text-white">
      {/* Section principale */}
      <div className="container mx-auto px-6 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* À propos */}
          <div className="space-y-5">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-orange-400 rounded-full flex items-center justify-center text-3xl shadow-lg">
                🏀
              </div>
              <div>
                <h3 className="text-xl font-bold">JORFOF BASKET</h3>
                <p className="text-xs text-blue-300">Excellence & Passion</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Club professionnel de basketball basé à Conakry, Guinée. Nous formons les champions de demain avec passion et détermination.
            </p>
            
            {/* Informations de contact */}
            <div className="space-y-3 pt-4">
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Conakry, Guinée</span>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <Phone className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">+224 626 74 14 78</span>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <Mail className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">contact@jorfofbasket.com</span>
              </div>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="text-lg font-bold mb-6 pb-2 border-b-2 border-orange-400 inline-block">
              Liens Rapides
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Partenaires */}
          <div>
            <h4 className="text-lg font-bold mb-6 pb-2 border-b-2 border-orange-400 inline-block">
              Nos Partenaires
            </h4>
            <ul className="space-y-4">
              {partners.map((partner, idx) => (
                <li key={idx}>
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start space-x-3 text-sm group cursor-pointer"
                  >
                    <span className="text-xl group-hover:scale-125 transition-transform duration-300">{partner.icon}</span>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300 leading-tight">
                      {partner.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Bouton devenir partenaire */}
            <a 
              href="/partner"
              className="mt-6 inline-block px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Devenir partenaire
            </a>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6 pb-2 border-b-2 border-orange-400 inline-block">
              Newsletter
            </h4>
            <p className="text-gray-300 text-sm mb-5 leading-relaxed">
              Restez informé de nos actualités, matchs et événements exclusifs.
            </p>
            
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubscribe(e)}
                  className="w-full px-4 py-3 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:bg-white/15 transition-all duration-300 text-sm"
                  required
                />
                <button
                  onClick={handleSubscribe}
                  disabled={isSubmitting}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              {message && (
                <p className={`text-xs ${message.includes('✓') ? 'text-green-400' : 'text-red-400'} animate-pulse`}>
                  {message}
                </p>
              )}
            </div>

            {/* Stats rapides */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 text-center border border-white/10">
                <p className="text-2xl font-bold text-orange-400">3+</p>
                <p className="text-xs text-gray-400 mt-1">Années</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 text-center border border-white/10">
                <p className="text-2xl font-bold text-orange-400">100+</p>
                <p className="text-xs text-gray-400 mt-1">Joueurs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Réseaux sociaux */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-20 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              Suivez-nous sur les réseaux sociaux
            </p>
            <div className="flex space-x-5">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:shadow-lg`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 lg:px-20 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} <span className="font-semibold text-white">Jorfof Basket Club</span>. Tous droits réservés.
            </p>
            <div className="flex space-x-6">
              <a href="/mentions-legales" className="hover:text-orange-400 transition-colors duration-300">
                Mentions légales
              </a>
              <a href="/politique-confidentialite" className="hover:text-orange-400 transition-colors duration-300">
                Confidentialité
              </a>
              <a href="/cgv" className="hover:text-orange-400 transition-colors duration-300">
                CGV
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
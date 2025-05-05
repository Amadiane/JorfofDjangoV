import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';  // Import de useTranslation

const Contacternous = () => {
  const { t } = useTranslation();  // Initialisation du hook de traduction
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const res = await fetch('http://localhost:8000/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setResponseMessage(t('Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.'));
        setFormData({ name: '', email: '', subject: '', category: 'general', message: '' });
      } else {
        setResponseMessage(data.error || t('Une erreur est survenue lors de l\'envoi du message.'));
      }
    } catch (error) {
      setResponseMessage(t('Erreur de connexion au serveur, veuillez réessayer plus tard.'));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Spacer div responsive */}
      <div className="h-16 sm:h-24 md:h-32"></div>
      
      <div className="pt-8 sm:pt-12 md:pt-16 pb-12 sm:pb-16 md:pb-24 px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section with Decorative Element */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16 relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-8 sm:-top-10 w-16 sm:w-20 h-1 bg-blue-600 rounded-full"></div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1C47] mb-4 sm:mb-6">
            {t('Contactez-nous')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            {t(`Nous sommes à votre écoute et vous répondrons dans les meilleurs délais. N'hésitez pas à nous faire part de vos questions ou commentaires.`)}
        
            </p>
          </div>

          {/* Contact Form Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-5 sm:p-8 md:p-10">
            {/* Response Message */}
            {responseMessage && (
              <div className={`mb-6 sm:mb-8 p-4 sm:p-5 ${responseMessage.includes('erreur') ? 'bg-red-500' : 'bg-green-500'} bg-opacity-90 text-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg`}>
                <div className="flex items-center">
                  {responseMessage.includes('erreur') ? (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                  <p className="font-medium text-sm sm:text-base">{responseMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-1 sm:mb-2 text-sm font-medium">
                  {t('Nom complet')}<span className="text-red-600 ml-1">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('Votre nom et prénom')}
                    required
                    className="px-3 sm:px-4 py-2 sm:py-3 w-full rounded-lg sm:rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1C1C47] text-gray-800"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-1 sm:mb-2 text-sm font-medium">
                 {t('Email')}<span className="text-red-600 ml-1">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('votre.email@exemple.com')}
                    required
                    className="px-3 sm:px-4 py-2 sm:py-3 w-full rounded-lg sm:rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1C1C47] text-gray-800"
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-gray-700 mb-1 sm:mb-2 text-sm font-medium">
                {t('Sujet')}<span className="text-red-600 ml-1">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t('Objet de votre message')}
                  required
                  className="px-3 sm:px-4 py-2 sm:py-3 w-full rounded-lg sm:rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1C1C47] text-gray-800"
                />
              </div>

              {/* Category Dropdown */}
              <div>
                <label htmlFor="category" className="block text-gray-700 mb-1 sm:mb-2 text-sm font-medium">
                {t('Catégorie')}
                </label>
                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="appearance-none px-3 sm:px-4 py-2 sm:py-3 w-full rounded-lg sm:rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1C1C47] text-gray-800 bg-white pr-10"
                  >
                    <option value="general">{t('Question générale')}</option>
                    <option value="support">{t('Support technique')}</option>
                    <option value="billing">{t('Facturation')}</option>
                    <option value="partnership">{t('Partenariat')}</option>
                    <option value="feedback">{t('Commentaires et suggestions')}</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 sm:px-4 text-gray-700">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message Textarea */}
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-1 sm:mb-2 text-sm font-medium">
                {t('Message')}<span className="text-red-600 ml-1">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('Détaillez votre demande ici...')}
                  rows={window.innerWidth < 640 ? "4" : "6"}
                  required
                  className="px-3 sm:px-4 py-2 sm:py-3 w-full rounded-lg sm:rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1C1C47] text-gray-800 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
              <button
  type="submit"
  disabled={isSubmitting}
  className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-medium text-base sm:text-lg transition duration-300 text-white ${
    isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-[#1C1C47] hover:bg-[#161638] shadow-md sm:shadow-lg hover:shadow-xl"
  }`}
>
  {isSubmitting ? (
    <span className="flex items-center justify-center">
      <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {t('Envoi en cours...')}
    </span>
  ) : (
    t('Envoyer le message')
  )}
</button>

              </div>
            </form>

            {/* Footer Privacy Note */}
            <div className="mt-6 sm:mt-8 text-center text-gray-500 text-xs sm:text-sm">
              <p>{t('Vos données personnelles ne seront utilisées que pour répondre à votre demande et ne seront pas partagées avec des tiers.')}</p>
            </div>
          </div>

          {/* Additional Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
            <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg text-center">
              <div className="bg-blue-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-[#1C1C47]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#1C1C47] mb-1 sm:mb-2">{t('Email')}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{t('contact@tamkine.org')}</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg text-center">
              <div className="bg-blue-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-[#1C1C47]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#1C1C47] mb-1 sm:mb-2">{t('Téléphone')}</h3>
              <p className="text-gray-600 text-sm sm:text-base"> +212 537 708 391</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg text-center sm:col-span-2 md:col-span-1">
              <div className="bg-blue-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-[#1C1C47]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#1C1C47] mb-1 sm:mb-2">{t('Heures d\'ouverture')}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{t('Lun - Ven: 9h - 18h')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacternous;
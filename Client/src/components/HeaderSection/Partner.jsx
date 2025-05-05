import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';  // Import de useTranslation

const Partner = () => {
  const { t } = useTranslation();  // Initialisation du hook de traduction
  // État initial du formulaire
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    role: '',
    organisation: '',
    website_url: '',
    phone: '',
    message: '',
    accept_terms: false,
  });

  // État pour la validation et les animations
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // Effacer l'erreur quand l'utilisateur corrige le champ
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  // Validation du formulaire
  const validateForm = () => {
    const errors = {};
    if (!form.first_name) errors.first_name = 'Le nom est requis';
    if (!form.last_name) errors.last_name = 'Le prénom est requis';
    if (!form.email) {
      errors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = 'Format d\'email invalide';
    }
    if (!form.role) errors.role = 'Le rôle est requis';
    if (!form.organisation) errors.organisation = 'L\'organisation est requise';
    if (!form.phone) errors.phone = 'Le téléphone est requis';
    if (!form.message) errors.message = 'Le message est requis';
    if (!form.accept_terms) errors.accept_terms = 'Vous devez accepter les conditions';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/partners/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi des données.');
      }

      const result = await response.json();
      console.log('Réponse API:', result);
      
      // Afficher le message de succès
      setShowSuccess(true);
      
      // Réinitialisation du formulaire après soumission réussie
      setForm({
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        organisation: '',
        website_url: '',
        phone: '',
        message: '',
        accept_terms: false,
      });
      
      // Masquer le message de succès après 5 secondes
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);

    } catch (error) {
      console.error('Erreur API:', error);
      alert('Une erreur s\'est produite. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <header className="bg-gradient-to-r from-[#1C1C47] to-[#12138B] text-white text-center py-4 px-4 md:py-8 lg:py-12 shadow-md">
  <div className="pt-16">
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t('Nos Partenaires Médias')}</h1>
    <p className="max-w-2xl mx-auto text-base md:text-lg opacity-90">
      {t('Découvrez les organisations médiatiques qui soutiennent la mission et les initiatives de la Fondation Tamkine.')}
    </p>
  </div>
</header>

      {/* Avantages section */}
      <div className="container mx-auto px-4 md:px-8 max-w-6xl py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#12138B] mb-12">
          {t('Les avantages de notre partenariat')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: t('Formation & Certification'),
              description: t('Formation complète et certification des enseignants assurées dans le cadre du partenariat.'),
              icon: "🎓"
            },
            {
              title: t('Encadrement pédagogique'),
              description: t('Bénéficiez d\'un accompagnement personnalisé par nos experts en éducation numérique.'),
              icon: "👨‍🏫"
            },
            {
              title: t('Outils numériques'),
              description: t('Accès à des outils et ressources numériques innovants pour transformer l\'expérience d\'apprentissage.'),
              icon: "💻"
            },
            {
              title: t('Réseau professionnel'),
              description: t('Intégrez un réseau dynamique de partenaires et participez à des événements exclusifs.'),
              icon: "🤝"
            },
            {
              title: t('Visibilité médiatique'),
              description: t('Opportunités de promotion via nos canaux de communication et médias partenaires.'),
              icon: "📱"
            },
            {
              title: t('Support technique'),
              description: t('Assistance technique et maintenance continue pour tous vos projets numériques.'),
              icon: "🛠️"
            }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-[#12138B] mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Témoignages 
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#12138B] mb-12">
            Témoignages de nos partenaires
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "Notre collaboration avec la Fondation Tamkine a transformé notre approche pédagogique. La formation et les outils fournis ont considérablement amélioré l'engagement de nos élèves.",
                author: "Marie Dupont",
                role: "Directrice d'école"
              },
              {
                quote: "Grâce à ce partenariat, nous avons pu moderniser notre infrastructure numérique et former nos enseignants aux dernières innovations pédagogiques.",
                author: "Ahmed Benali",
                role: "Responsable pédagogique"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md">
                <div className="text-4xl text-blue-200 mb-4">"</div>
                <p className="text-gray-700 mb-6 italic">{item.quote}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-bold mr-4">
                    {item.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.author}</h4>
                    <p className="text-gray-500 text-sm">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>*/}

      {/* Formulaire de contact */}
      <div id="partnerForm" className="container mx-auto px-4 md:px-8 max-w-6xl py-16 md:py-24">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#12138B] text-center mb-10">
          {t('Devenez notre partenaire')}
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-10 max-w-3xl mx-auto">
  {t('Bénéficiez de tous les avantages, outils et accompagnements numériques que nous mettrons à votre disposition.')}
  <br /><br />
  {t('En effet, collaborer avec la Fondation Tamkine, c\'est bénéficier d\'un accompagnement immédiat à tous les niveaux :')}
  <br />
  <span className="block pl-4 border-l-4 border-blue-400 my-4">
    {t('Formation, certification et encadrement des enseignants sont assurés dans le cadre de ce partenariat.')}
  </span>
</p>



          {showSuccess && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                  t('Votre demande a été envoyée avec succès. Nos équipes vous contacteront très prochainement.')
                  </p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sélection du rôle */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="role">
                {t('Rôle')}  <span className="text-red-500">*</span>
                </label>
                <select
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className={`w-full p-3 border ${formErrors.role ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12138B] bg-white`}
                  required
                >
                  <option value=""> -- {t('Sélectionnez votre rôle')} --</option>
                  <option value="enseignant"> {t('Enseignant')}</option>
                  <option value="parent"> {t('Parent d\'élève')}</option>
                  <option value="eleve"> {t('Élève')}</option>
                  <option value="autre"> {t('Autre')}</option>
                </select>
                {formErrors.role && <p className="mt-1 text-sm text-red-500">{formErrors.role}</p>}
              </div>

              {/* Nom */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="first_name">
                {t('Nom')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 border ${formErrors.first_name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12138B]`}
                  placeholder= {t('Votre nom')}
                />
                {formErrors.first_name && <p className="mt-1 text-sm text-red-500">{formErrors.first_name}</p>}
              </div>

              {/* Prénom */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="last_name">
                {t('Prénom')}<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 border ${formErrors.last_name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12138B]`}
                  placeholder= {t('Votre prénom')}
                />
                {formErrors.last_name && <p className="mt-1 text-sm text-red-500">{formErrors.last_name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                {t('Email')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12138B]`}
                  placeholder= {t('votre@email.com')}
                />
                {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
              </div>

              {/* Organisation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="organisation">
                   {t('Organisation')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="organisation"
                  name="organisation"
                  value={form.organisation}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 border ${formErrors.organisation ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12138B]`}
                  placeholder= {t('Nom de votre organisation')}
                />
                {formErrors.organisation && <p className="mt-1 text-sm text-red-500">{formErrors.organisation}</p>}
              </div>

              {/* Site web */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="website_url">
                  {t('Site web')}
                </label>
                <input
                  type="url"
                  id="website_url"
                  name="website_url"
                  value={form.website_url}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12138B]"
                  placeholder= {t('www.votresite.com')}
                />
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="phone">
                  {t('Téléphone')}<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12138B]`}
                  placeholder= {t('Votre numéro de téléphone')}
                />
                {formErrors.phone && <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="message">
                 {t('Message')}<span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="6"
                className={`w-full p-3 border ${formErrors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12138B]`}
                placeholder= {t('Décrivez votre projet ou vos besoins en détail')}
              ></textarea>
              {formErrors.message && <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>}
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="accept_terms"
                  name="accept_terms"
                  checked={form.accept_terms}
                  onChange={handleChange}
                  required
                  className={`w-4 h-4 text-[#12138B] border ${formErrors.accept_terms ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-[#12138B]`}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="accept_terms" className="font-medium text-gray-700">
                {t('J\'accepte les conditions générales CNDP')}<span className="text-red-500">*</span>
                </label>
                {formErrors.accept_terms && <p className="mt-1 text-sm text-red-500">{formErrors.accept_terms}</p>}
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-[#12138B] text-white px-10 py-4 rounded-lg font-medium text-lg hover:bg-[#1e1fab] transition-all transform hover:scale-105 shadow-md ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ?  t('Envoi en cours...') : t('Envoyer ma demande')}
              </button>
              
            </div>
          </form>
          
        </div>
      </div>

      {/* Section partenaires media 
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#12138B] mb-4">
            Nos partenaires média
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Découvrez les médias qui nous font confiance et collaborent avec nous pour promouvoir l'éducation numérique.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition w-full h-32 flex items-center justify-center">
                <img
                  src={`/api/placeholder/150/80`}
                  alt={`Partenaire média ${item}`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>*/}

      {/* Footer CTA */}
      <div className="bg-white py-16 text-black">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
         {t('Prêt à rejoindre notre communauté ?')}
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          {t('Transformez votre approche éducative et bénéficiez d\'un accompagnement personnalisé pour intégrer efficacement les solutions numériques.')}
          </p>
          <button
            onClick={() => document.getElementById('partnerForm').scrollIntoView({behavior: 'smooth'})}
            className="bg-white text-[#12138B] hover:bg-blue-100 transition px-8 py-4 rounded-full font-semibold text-lg"
          >
           {t('Devenir partenaire')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Partner;
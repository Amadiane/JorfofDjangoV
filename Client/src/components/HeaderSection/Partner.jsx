import React, { useState } from 'react';

const Partner = () => {
  // Déclaration de l'état initial du formulaire
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    role: '',
    organisation: '',
    website_url: '',
    phone: '',
    accept_terms: false, // Pour le checkbox de consentement
  });

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification que toutes les informations nécessaires sont remplies
    if (!form.first_name || !form.last_name || !form.email || !form.role || !form.organisation || !form.phone || !form.accept_terms) {
      alert("Tous les champs obligatoires doivent être remplis.");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/partners/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          role: form.role,
          organisation: form.organisation,
          website_url: form.website_url,
          phone: form.phone,
          accept_terms: form.accept_terms,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi des données.');
      }

      const result = await response.json();
      console.log('Réponse API:', result);
      alert('Votre demande a été envoyée avec succès.');
      setForm({ // Réinitialisation du formulaire après soumission réussie
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        organisation: '',
        website_url: '',
        phone: '',
        accept_terms: false,
      });

    } catch (error) {
      console.error('Erreur API:', error);
      alert('Une erreur s\'est produite. Veuillez réessayer.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-48 bg-gray-50">
      <div className="w-full max-w-5xl bg-white p-10 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-[#12138B] text-center mb-8">SOYEZ NOTRE PARTENAIRE</h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-10">
          Bénéficiez de tous les avantages, outils et accompagnements numériques que nous mettrons à votre disposition.<br />
          Remplissez ce formulaire, nos équipes vous contacteront très rapidement.<br />
          En effet, collaborer avec la Fondation Tamkine, c’est bénéficier d’un accompagnement immédiat à tous les niveaux :<br />
          ➤ Formation, certification et encadrement des enseignants sont assurés dans le cadre de ce partenariat.
        </p>

        <h2 className="text-2xl font-semibold text-[#1C1C47] mb-6">Envoyez-nous un message</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sélection du rôle */}
            <div className="form-group">
              <label className="text-sm font-medium text-gray-700 mb-2" htmlFor="role">Rôle *</label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C1C47]"
                required
              >
                <option value="">-- Sélectionnez votre rôle --</option>
                <option value="enseignant">Enseignant</option>
                <option value="parent">Parent d'élève</option>
                <option value="eleve">Élève</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            {/* Autres champs du formulaire */}
            {[
              { id: 'first_name', label: 'Nom', type: 'text' },
              { id: 'last_name', label: 'Prénom', type: 'text' },
              { id: 'email', label: 'Email', type: 'email' },
              { id: 'organisation', label: 'Société', type: 'text' },
              { id: 'website_url', label: 'URL du site web', type: 'url' },
              { id: 'phone', label: 'Contact', type: 'text' },
            ].map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor={field.id}>
                  {field.label} <span className="text-red-500">*</span>
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  value={form[field.id]}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C1C47]"
                  placeholder={`Votre ${field.label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="message">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="6"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C1C47]"
              placeholder="Votre message"
            ></textarea>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="accept_terms"
              name="accept_terms"
              checked={form.accept_terms}
              onChange={handleChange}
              required
              className="w-4 h-4 text-[#1C1C47]"
            />
            <label htmlFor="accept_terms" className="text-sm text-gray-700">
              J’accepte les conditions générales CNDP <span className="text-red-500">*</span>
            </label>
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-[#1C1C47] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#3b3b82]"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Partner;

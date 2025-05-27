import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';  // Import de useTranslation
import ChatBotNew from "../ChatBot/ChatbotNew";

const Community = () => {
  const { t } = useTranslation();  // Initialisation du hook de traduction
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    role: '',
    tel: '',
    email: '',
    conditions: false,
  });
  const apiUrl = import.meta.env.VITE_API_BACKEND;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(apiUrl + "/api/community/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Votre demande d'adhésion a été envoyée avec succès !");
        setForm({
          nom: '',
          prenom: '',
          role: '',
          tel: '',
          email: '',
          conditions: false,
        });
      } else {
        alert("Erreur : " + (data.error || "Vérifiez les champs du formulaire."));
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      alert("Une erreur est survenue lors de l'envoi du formulaire.");
    }
  };

  return (
    <div style={styles.root}>
      <header style={styles.header}>
        <h1 style={styles.h1}>{t('Communauté Tamkine')}</h1>
        <p>{t('Ensemble pour une éducation de qualité pour tous')}</p>
      </header>

      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.h2}>{t('Notre Communauté')}</h2>
          <p style={styles.p}>
           {t('Le nombre des membres de la Communauté Tamkine connait une multiplication continue')} [...]
          </p>

          <h2 style={styles.h2}>{t('La Communauté Tamkine regroupe :')}</h2>
          <ul style={styles.ul}>
            <li style={styles.li}>{t('Les élèves de toutes origines [...]')}</li>
            <li style={styles.li}>{t('Les parents de ces élèves ;')}</li>
            <li style={styles.li}>{t('Les instituteurs, enseignants, inspecteurs [...]')}</li>
            <li style={styles.li}>{t('Les entités de gestion et d\'administration éducative ;')}</li>
            <li style={styles.li}>{t('La Société Civile ;')}</li>
            <li style={styles.li}>{t('Des citoyens du monde entier.')}</li>
          </ul>

          <p style={styles.p}>
           {t('Bénéficier de la carte de membre de la Communauté Tamkine')} [...]
          </p>

          <p style={styles.highlight}>
            {t('Être membre de la Famille Tamkine, c\'est tout d\'abord et avant tout démontrer [...]')}
          </p>
        </div>

        <div className="call-to-action">
          <h2 style={styles.h2}>{t('N\'attendez plus, venez nous rejoindre [...]')}</h2>
          <p style={styles.quote}>
            {t('L\'éducation est la pierre angulaire du développement [...] ')}
          </p>
        </div>

        <div style={styles.formContainer}>
          <h2 style={styles.h2}>{t('Rejoignez la Communauté Tamkine')}</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.responsiveTwoColumns}>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="nom">{t('Nom *')}</label>
                <input style={styles.input} id="nom" name="nom" value={form.nom} onChange={handleChange} required />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="prenom">{t('Prénom *')}</label>
                <input style={styles.input} id="prenom" name="prenom" value={form.prenom} onChange={handleChange} required />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="role">{t('Rôle *')}</label>
              <select style={styles.select} id="role" name="role" value={form.role} onChange={handleChange} required>
                <option value="">{t('-- Sélectionnez votre rôle --')}</option>
                <option value="enseignant">{t('Enseignant')}</option>
                <option value="parent">{t('Parent d\'élève')}</option>
                <option value="eleve">{t('Élève')}</option>
                <option value="autre">{t('Autre')}</option>
              </select>
            </div>

            <div style={styles.responsiveTwoColumns}>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="tel">{t('Téléphone * ')}</label>
                <input style={styles.input} id="tel" name="tel" type="tel" value={form.tel} onChange={handleChange} required />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="email">{t('Email')} *</label>
                <input style={styles.input} id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>
            </div>

            <div style={styles.formGroup}>
              <div style={styles.checkboxGroup}>
                <input type="checkbox" id="conditions" name="conditions" checked={form.conditions} onChange={handleChange} required />
                <label htmlFor="conditions">{t('J\'accepte les conditions générales CNDP')}</label>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button style={styles.button} type="submit">{t('Envoyer')}</button>
            </div>
          </form>
        </div>
      </div>
      <div className="fixed bottom-6 right-6 z-50">
        <ChatBotNew />
      </div>
    </div>
  );
};

const styles = {
  root: {
    '--primary-color': '#1C1C47',
    '--secondary-color': '#1C1C47',
    '--accent-color': '#1C1C47',
    '--text-color': '#333',
    '--light-color': '#f5f5f5',
    '--dark-color': '#262626',
    '--shadow': '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    backgroundColor: '#f5f5f5',
    color: '#333',
    lineHeight: '1.6',
  },
  header: {
    background: 'linear-gradient(135deg, #1C1C47, #1C1C47)',
    color: 'white',
    padding: '3rem 1rem', // Augmentation du padding pour descendre encore le titre
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    paddingTop: '6rem',  // <-- augmenté
    paddingBottom: '3rem', // <-- augmenté
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '2rem',
    marginBottom: '2rem',
    transition: 'transform 0.3s ease',
  },
  cardHover: {
    transform: 'translateY(-5px)',
  },
  h1: {
    fontSize: '2.8rem',
    marginBottom: '1rem',
    marginTop: '1.5rem', // Ajustement du margin top pour pousser encore plus bas
  },
  h2: {
    color: '#1C1C47',
    marginBottom: '1rem',
    fontSize: '1.8rem',
  },
  p: {
    marginBottom: '1.5rem',
  },
  ul: {
    paddingLeft: '2rem',
    marginBottom: '1.5rem',
  },
  li: {
    marginBottom: '0.5rem',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#1C1C47',
  },
  quote: {
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: '1.2rem',
    margin: '2rem 0',
    color: '#1C1C47',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '2rem',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#262626',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  select: {
    width: '100%',
    padding: '0.8rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  checkboxGroup: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '1rem',
  },
  button: {
    backgroundColor: '#1C1C47',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    fontSize: '1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#1C1C47',
  },
  footer: {
    backgroundColor: '#262626',
    color: 'white',
    textAlign: 'center',
    padding: '2rem 1rem',
    marginTop: '2rem',
  },
  responsiveTwoColumns: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    // Adaptation mobile
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
  '@media (max-width: 768px)': {
    h1: {
      fontSize: '2rem',
    },
    h2: {
      fontSize: '1.5rem',
    },
    p: {
      fontSize: '1rem',
    },
  },
};

export default Community;

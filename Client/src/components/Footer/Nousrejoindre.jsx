import React, { useState } from 'react';

const NousRejoindre = () => {
  const [formData, setFormData] = useState({
    organisation: '',
    email: '',
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
      const res = await fetch('http://127.0.0.1:8000/api/rejoindre/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setResponseMessage('Votre demande a été envoyée avec succès. Nous vous contacterons bientôt.');
        setFormData({ organisation: '', email: '', message: '' });
      } else {
        setResponseMessage(data.error || 'Une erreur est survenue lors de l\'envoi de votre demande.');
      }
    } catch (error) {
      setResponseMessage('Erreur de connexion au serveur, veuillez réessayer plus tard.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = {
    pageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f9f9f9',
      padding: '1rem',
    },
    container: {
      maxWidth: '600px',
      width: '100%',
      padding: '2rem',
      border: '1px solid #ddd',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#ffffff',
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
    },
    title: {
      fontSize: '1.8rem',
      color: '#2e4f7b',
      marginBottom: '0.5rem',
    },
    subtitle: {
      fontSize: '1rem',
      color: '#666',
      marginBottom: '1.5rem',
    },
    formGroup: {
      marginBottom: '1.25rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      transition: 'border-color 0.3s',
      boxSizing: 'border-box',
    },
    textarea: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      resize: 'vertical',
      minHeight: '120px',
      boxSizing: 'border-box',
    },
    button: {
      padding: '0.85rem 2rem',
      backgroundColor: '#2e4f7b',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: 'bold',
      transition: 'background-color 0.3s',
      width: '100%',
    },
    message: {
      marginTop: '1.5rem',
      padding: '1rem',
      borderRadius: '8px',
      backgroundColor: '#e6f7e6',
      color: '#2c7c2c',
      fontWeight: '500',
      textAlign: 'center',
    },
    error: {
      backgroundColor: '#ffebee',
      color: '#c62828',
    },
    requiredMark: {
      color: '#c62828',
      marginLeft: '3px',
    },
    footer: {
      marginTop: '2rem',
      fontSize: '0.85rem',
      color: '#777',
      textAlign: 'center',
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Rejoignez-nous</h2>
          <p style={styles.subtitle}>Complétez ce formulaire pour rejoindre notre réseau d'organisations</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Nom de l'organisation<span style={styles.requiredMark}>*</span>
            </label>
            <input
              type="text"
              name="organisation"
              value={formData.organisation}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Nom de votre organisation"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Email<span style={styles.requiredMark}>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Email de contact"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Message<span style={styles.requiredMark}>*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              style={styles.textarea}
              placeholder="Parlez-nous de votre organisation et pourquoi vous souhaitez nous rejoindre..."
              rows="6"
            />
          </div>

          <button
            type="submit"
            style={styles.button}
            disabled={isSubmitting}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1e3a5f'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2e4f7b'}
          >
            {isSubmitting ? 'Soumission en cours...' : 'Soumettre la demande'}
          </button>
        </form>

        {responseMessage && (
          <div style={responseMessage.includes('erreur') ? { ...styles.message, ...styles.error } : styles.message}>
            {responseMessage}
          </div>
        )}

        <div style={styles.footer}>
          <p>En soumettant ce formulaire, vous acceptez d'être contacté concernant votre demande d'adhésion.</p>
        </div>
      </div>
    </div>
  );
};

export default NousRejoindre;

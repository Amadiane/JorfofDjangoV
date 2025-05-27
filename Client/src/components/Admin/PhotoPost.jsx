import React, { useState } from 'react';

const PhotoPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const apiUrl = import.meta.env.VITE_API_BACKEND;

  // Palette de couleurs similaire à "Contacter nous"
  const colors = {
    primary: '#1C1C47', // Bleu principal
    background: '#F3F4F6',
    card: '#FFFFFF',
    text: '#1F2937',
    border: '#E5E7EB',
    success: '#10B981',
    error: '#EF4444',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append('titre', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(apiUrl + "/api/media/", {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessage("✅ Photo ajouté avec succès !");
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (error) {
      setMessage(`❌ Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      margin: '0',
      padding: '20px',
      backgroundColor: colors.background,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100%',
      boxSizing: 'border-box',
    },
    section: {
      width: '100%',
      maxWidth: '900px',
      backgroundColor: colors.card,
      borderRadius: '12px',
      padding: '30px 20px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    },
    title: {
      textAlign: 'center',
      fontSize: '28px',
      marginBottom: '30px',
      fontWeight: 'bold',
      color: colors.primary,
    },
    formGroup: {
      marginBottom: '24px',
    },
    label: {
      fontWeight: '600',
      display: 'block',
      marginBottom: '8px',
      color: colors.text,
    },
    input: {
      width: '100%',
      padding: '12px',
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      fontSize: '16px',
      boxSizing: 'border-box',
    },
    textarea: {
      width: '100%',
      padding: '12px',
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      fontSize: '16px',
      resize: 'vertical',
      minHeight: '150px',
      boxSizing: 'border-box',
    },
    imagePreview: {
      marginTop: '10px',
      textAlign: 'center',
    },
    previewImg: {
      maxWidth: '100%',
      maxHeight: '200px',
      objectFit: 'cover',
      borderRadius: '4px',
    },
    button: {
      padding: '14px',
      backgroundColor: colors.primary,
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      cursor: 'pointer',
      width: '100%',
      boxSizing: 'border-box',
      transition: 'background-color 0.3s ease',
      fontWeight: '600',
    },
    successMessage: {
      textAlign: 'center',
      fontWeight: 'bold',
      marginTop: '20px',
      color: colors.success,
    },
    errorMessage: {
      textAlign: 'center',
      fontWeight: 'bold',
      marginTop: '20px',
      color: colors.error,
    },
    // Styles responsifs pour les petits écrans
    '@media (max-width: 768px)': {
      section: {
        padding: '20px 15px',
      },
      title: {
        fontSize: '24px',
      },
      button: {
        padding: '12px',
      },
    }
  };

  // Appliquer les styles responsifs manuellement
  const getResponsiveStyles = () => {
    const isMobile = window.innerWidth <= 768;
    return {
      section: {
        ...styles.section,
        padding: isMobile ? '20px 15px' : '30px 20px',
      },
      title: {
        ...styles.title,
        fontSize: isMobile ? '24px' : '28px',
      },
    };
  };

  const responsiveStyles = getResponsiveStyles();

  return (
    <div style={styles.container}>
      <section style={responsiveStyles.section}>
        <h1 style={responsiveStyles.title}>Publier un nouvel élément</h1>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label} aria-label="Titre">Titre</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              aria-label="Titre"
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} aria-label="Description">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              aria-label="Description"
              style={styles.textarea}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} aria-label="Image de couverture">Image de couverture</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              aria-label="Image de couverture"
              style={styles.input}
            />
            {image && (
              <div style={styles.imagePreview}>
                <img 
                  src={URL.createObjectURL(image)} 
                  alt="Prévisualisation" 
                  style={styles.previewImg} 
                />
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Envoi en cours...' : 'Ajouter l\'élément'}
          </button>
        </form>

        {message && (
          <p style={message.startsWith('✅') ? styles.successMessage : styles.errorMessage}>
            {message}
          </p>
        )}
      </section>
    </div>
  );
};

export default PhotoPost;
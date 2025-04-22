import React, { useState } from 'react';

const PlatformPost = () => {
  const [title, setTitle] = useState("");          // Nouveau champ : titre de la plateforme
  const [description, setDescription] = useState(""); // Description de la plateforme
  const [link, setLink] = useState("");            // Lien de la plateforme
  const [icon, setIcon] = useState(null);          // Nouveau champ : icône de la plateforme
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");  // Réinitialisation du message

    const formData = new FormData();  // Création de FormData pour inclure l'image
    formData.append('name', title);
    formData.append('description', description);
    formData.append('url', link);
    if (icon) {
      formData.append('icon', icon); // Ajouter l'image à la FormData
    }

    try {
      const response = await fetch('http://localhost:8000/api/platforms/', {
        method: 'POST',
        body: formData, // Envoyer formData, qui contient l'image
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessage("✅ Plateforme ajoutée avec succès !");
      setTitle("");     // Réinitialisation
      setDescription("");
      setLink("");
      setIcon(null);    // Réinitialisation de l'icône
    } catch (error) {
      setMessage(`❌ Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      margin: '20px',
      padding: '40px',
      backgroundColor: '#f4f7f6',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}>
      <section style={{
        width: '100%',
        maxWidth: '800px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        padding: '40px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}>
        <h1 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '20px' }}>Publier une nouvelle plateforme</h1>
        <form onSubmit={handleSubmit}>
          {/* Champ pour le titre de la plateforme */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Titre de la plateforme</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
          </div>

          {/* Champ pour la description */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '16px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '18px',
                resize: 'vertical',
                minHeight: '150px',
              }}
            />
          </div>

          {/* Champ pour le lien de la plateforme */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Lien de la plateforme</label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
          </div>

          {/* Champ pour télécharger l'icône de la plateforme */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Icône de la plateforme (optionnel)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setIcon(e.target.files[0])}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
              }}
            />
          </div>

          <button type="submit" disabled={loading} style={{
            padding: '16px',
            backgroundColor: '#1C1C47',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '20px',
            cursor: 'pointer',
            width: '100%',
          }}>
            {loading ? 'Envoi en cours...' : 'Ajouter la plateforme'}
          </button>
        </form>

        {message && <p style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '20px' }}>{message}</p>}
      </section>
    </div>
  );
};

export default PlatformPost;

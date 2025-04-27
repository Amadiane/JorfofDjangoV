import React, { useState } from 'react';

const MotPresidentPost = () => {
  const [titre, setTitre] = useState("");            // Titre du mot du président
  const [description, setDescription] = useState(""); // Description du mot du président
  const [image, setImage] = useState(null);          // Image du mot du président
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");  // Réinitialisation du message

    const formData = new FormData();  // Création de FormData pour inclure l'image
    formData.append('titre', titre);
    formData.append('description', description);
    if (image) {
      formData.append('image', image); // Ajouter l'image à la FormData
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/mot-president/', {
        method: 'POST',
        body: formData, // Envoyer formData, qui contient l'image
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessage("✅ Mot du président ajouté avec succès !");
      setTitre("");       // Réinitialisation
      setDescription("");
      setImage(null);     // Réinitialisation de l'image
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
        <h1 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '20px' }}>Publier un mot du président</h1>
        <form onSubmit={handleSubmit}>
          {/* Champ pour le titre du mot du président */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Titre du mot</label>
            <input
              type="text"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
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

          {/* Champ pour télécharger l'image du mot du président */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Image du mot (optionnel)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
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
            {loading ? 'Envoi en cours...' : 'Ajouter le mot du président'}
          </button>
        </form>

        {message && <p style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '20px' }}>{message}</p>}
      </section>
    </div>
  );
};

export default MotPresidentPost;

import React, { useState } from 'react';

const MotPresidentpost = () => {
  const [titre, setTitre] = useState("");        // Nouveau champ : titre
  const [auteur, setAuteur] = useState("");      // Champ pour l'auteur
  const [contenu, setContenu] = useState("");    // Contenu du message (remplacé par "texte")
  const [image, setImage] = useState(null);      // Champ pour l'image
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("titre", titre);              // Remplacé "title" par "titre"
    formData.append("auteur", auteur);            // Remplacé "author" par "auteur"
    formData.append("texte", contenu);            // Remplacé "content" par "texte"
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch('http://localhost:8000/api/motpresi/', {
        method: 'POST',
        body: formData,  // Utilisation de FormData pour l'envoi du fichier
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP! statut: ${response.status}`);
      }

      const data = await response.json();
      setMessage("✅ Message publié avec succès !");
      setTitre("");     // Réinitialisation
      setAuteur("");    // Réinitialisation
      setContenu("");   // Réinitialisation
      setImage(null);   // Réinitialisation de l'image
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
        <h1 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '20px' }}>Publier un Message du Président</h1>
        <form onSubmit={handleSubmit}>
          {/* Champ pour le titre */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Titre</label>
            <input
              type="text"
              value={titre}                    // Utilisation de "titre"
              onChange={(e) => setTitre(e.target.value)}  // Mise à jour du "titre"
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

          {/* Champ pour l'auteur */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Auteur</label>
            <input
              type="text"
              value={auteur}                   // Utilisation de "auteur"
              onChange={(e) => setAuteur(e.target.value)}  // Mise à jour de "auteur"
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

          {/* Champ pour le contenu */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Message</label>
            <textarea
              value={contenu}                   // Utilisation de "contenu"
              onChange={(e) => setContenu(e.target.value)}  // Mise à jour de "contenu"
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

          {/* Champ pour l'image */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
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
            {loading ? 'Envoi en cours...' : 'Publier'}
          </button>
        </form>

        {message && <p style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '20px' }}>{message}</p>}
      </section>
    </div>
  );
};

export default MotPresidentpost;

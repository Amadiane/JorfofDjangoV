import React, { useState } from 'react';

const ProgramPost = () => {
  const [title, setTitle] = useState("");           // Nouveau champ : titre
  const [description, setDescription] = useState(""); // Nouveau champ : description
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch('http://127.0.0.1:8000/api/programs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),  // On envoie title + description
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessage("✅ Programme ajouté avec succès !");
      setTitle("");     // Réinitialisation
      setDescription(""); // Réinitialisation
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
        <h1 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '20px' }}>Ajouter un Programme</h1>
        <form onSubmit={handleSubmit}>
          {/* Champ pour le titre */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Titre</label>
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
          <div style={{ marginBottom: '30px' }}>
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
            {loading ? 'Envoi en cours...' : 'Envoyer'}
          </button>
        </form>

        {message && <p style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '20px' }}>{message}</p>}
      </section>
    </div>
  );
};

export default ProgramPost;

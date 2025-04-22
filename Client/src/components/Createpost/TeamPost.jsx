import React, { useState } from 'react';

const TeamMessage = () => {
  const [motPresi, setMotPresi] = useState(null);  // État pour stocker le mot du président
  const [loading, setLoading] = useState(false);    // État pour afficher le chargement
  const [error, setError] = useState(null);        // État pour gérer les erreurs
  const [content, setContent] = useState("");      // État pour le contenu à poster
  const [message, setMessage] = useState("");      // Message de succès ou d'erreur après le POST

  const handleChange = (e) => {
    setContent(e.target.value);  // Mise à jour du contenu à poster
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");  // Réinitialisation du message d'erreur ou de succès

    try {
      const response = await fetch('http://localhost:8000/api/team-message/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),  // Envoi des données sous forme JSON
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessage("✅ Message envoyé avec succès !");
      setContent("");  // Réinitialiser le champ de saisie
      console.log('Réponse après POST:', data);
    } catch (error) {
      setMessage(`❌ Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      margin: '20px',
      padding: '40px',  // Augmenté le padding autour du formulaire
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
        maxWidth: '800px',  // Augmenté la largeur maximale du formulaire
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        padding: '40px',  // Augmenté le padding interne du formulaire
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}>
        {loading ? (
          <div style={{ textAlign: 'center', color: '#777' }}>Chargement...</div>  // Affichage du message de chargement
        ) : error ? (
          <div style={{ textAlign: 'center', color: 'red' }}>Une erreur est survenue: {error}</div>  // Affichage des erreurs en cas de problème
        ) : (
          <div>
            <h1 style={{ textAlign: 'center', color: '#333', fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>Publier un message d'équipe</h1>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '30px' }}>  {/* Augmenté l'espace autour du champ */}
                <label htmlFor="content" style={{
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '12px',
                  display: 'block',
                }}>
                  Message
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '16px',  // Augmenté le padding du champ de texte
                    border: '1px solid #ddd',
                    borderRadius: '8px',  // Rendu des coins un peu plus arrondis
                    fontSize: '18px',     // Augmenté la taille de police
                    color: '#333',
                    resize: 'vertical',
                    minHeight: '150px',   // Augmenté la hauteur minimale
                  }}
                />
              </div>
              <button type="submit" disabled={loading} style={{
                padding: '16px',     // Augmenté le padding du bouton
                backgroundColor: '#1C1C47',
                color: 'white',
                border: 'none',
                borderRadius: '8px', // Rendu des coins du bouton plus arrondis
                fontSize: '20px',    // Augmenté la taille de police du bouton
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                marginTop: '20px',   // Espacement supplémentaire entre le bouton et le champ de texte
                width: '100%',
              }}>
                {loading ? 'Envoi en cours...' : 'Envoyer'}
              </button>
            </form>
            {message && <p style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '20px' }}>{message}</p>}  {/* Affichage du message de retour */}
          </div>
        )}
      </section>
    </div>
  );
};

export default TeamMessage;

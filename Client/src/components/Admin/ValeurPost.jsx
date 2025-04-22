import React, { useState } from 'react';

const ValeurPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
      const response = await fetch('http://localhost:8000/api/valeurs/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessage("✅ Valeur ajoutée avec succès !");
      setTitle("");
      setDescription("");
      setImage(null);
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
        <h1 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '20px' }}>Publier une valeur</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }} aria-label="Titre de la valeur">Titre</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              aria-label="Titre de la valeur"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }} aria-label="Description de la valeur">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              aria-label="Description de la valeur"
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

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }} aria-label="Image de la valeur">Image de la valeur</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              aria-label="Image de la valeur"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
              }}
            />
            {image && (
              <div style={{ marginTop: '10px' }}>
                <img src={URL.createObjectURL(image)} alt="Prévisualisation" style={{ maxWidth: '200px', maxHeight: '200px' }} />
              </div>
            )}
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
            {loading ? 'Envoi en cours...' : 'Ajouter la valeur'}
          </button>
        </form>

        {message && <p style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '20px' }}>{message}</p>}
      </section>
    </div>
  );
};

export default ValeurPost;

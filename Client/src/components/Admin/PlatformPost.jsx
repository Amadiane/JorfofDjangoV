import React, { useEffect, useState } from 'react';

const PlatformPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [icon, setIcon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [platforms, setPlatforms] = useState([]);
  const [expanded, setExpanded] = useState(null);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchPlatforms = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/platforms/');
      const data = await res.json();
      setPlatforms(data);
    } catch (err) {
      console.error("Erreur lors du chargement des plateformes:", err);
    }
  };

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append('name', title);
    formData.append('description', description);
    formData.append('url', link);
    if (icon) formData.append('icon', icon);

    try {
      const response = await fetch('http://localhost:8000/api/platforms/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      setMessage("✅ Plateforme ajoutée avec succès !");
      setTitle("");
      setDescription("");
      setLink("");
      setIcon(null);
      fetchPlatforms(); // Recharge la liste
      setShowForm(false); // Masque le formulaire
    } catch (error) {
      setMessage(`❌ Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlatforms = platforms.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(platforms.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Responsive styles
  const styles = {
    container: {
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginBottom: '20px',
    },
    title: {
      fontSize: '24px',
      margin: '10px 0',
    },
    addButton: {
      padding: '10px 15px',
      backgroundColor: '#1C1C47',
      color: 'white',
      fontSize: '16px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    formContainer: {
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      marginBottom: '30px',
      width: '100%',
    },
    form: {
      display: 'grid',
      gap: '15px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      marginBottom: '5px',
      fontWeight: '500',
    },
    input: {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      fontSize: '16px',
    },
    textarea: {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      minHeight: '100px',
      fontSize: '16px',
      fontFamily: 'inherit',
    },
    submitButton: {
      padding: '12px',
      backgroundColor: '#1C1C47',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    message: {
      marginTop: '15px',
      padding: '10px',
      borderRadius: '5px',
      backgroundColor: props => props.isError ? '#ffebee' : '#e8f5e9',
      color: props => props.isError ? '#c62828' : '#2e7d32',
    },
    platformList: {
      display: 'grid',
      gap: '15px',
    },
    platformCard: {
      border: '1px solid #eaeaea',
      borderRadius: '8px',
      overflow: 'hidden',
      transition: 'box-shadow 0.3s',
      backgroundColor: '#fff',
    },
    platformHeader: {
      padding: '15px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
    platformTitle: {
      margin: 0,
      fontSize: '18px',
      fontWeight: '500',
    },
    platformContent: {
      padding: '15px',
    },
    platformInfo: {
      margin: '8px 0',
    },
    platformActions: {
      display: 'flex',
      gap: '10px',
      marginTop: '15px',
    },
    actionButton: {
      padding: '8px 12px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
    },
    editButton: {
      backgroundColor: '#e0e0e0',
    },
    deleteButton: {
      backgroundColor: '#ffebee',
      color: '#c62828',
    },
    paginationContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '5px',
      marginTop: '20px',
    },
    pageButton: {
      padding: '8px 12px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      backgroundColor: '#fff',
      cursor: 'pointer',
    },
    activePageButton: {
      backgroundColor: '#1C1C47',
      color: 'white',
      border: '1px solid #1C1C47',
    },
    icon: {
      maxWidth: '100%',
      height: 'auto'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Gestion des plateformes</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={styles.addButton}
        >
          {showForm ? 'Fermer le formulaire' : 'Ajouter une plateforme'}
        </button>
      </div>

      {showForm && (
        <section style={styles.formContainer}>
          <h2 style={styles.title}>Publier une nouvelle plateforme</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Titre</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
                style={styles.input} 
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Description</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required 
                style={styles.textarea} 
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Lien</label>
              <input 
                type="url" 
                value={link} 
                onChange={(e) => setLink(e.target.value)} 
                required 
                style={styles.input} 
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Icône (optionnelle)</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setIcon(e.target.files[0])} 
                style={styles.input} 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              style={styles.submitButton}
            >
              {loading ? "Envoi en cours..." : "Ajouter"}
            </button>
          </form>

          {message && (
            <div style={{
              ...styles.message,
              backgroundColor: message.includes('❌') ? '#ffebee' : '#e8f5e9',
              color: message.includes('❌') ? '#c62828' : '#2e7d32',
            }}>
              {message}
            </div>
          )}
        </section>
      )}

      <h2 style={styles.title}>Liste des plateformes</h2>
      
      <div style={styles.platformList}>
        {currentPlatforms.length === 0 ? (
          <p>Aucune plateforme publiée pour le moment.</p>
        ) : (
          currentPlatforms.map((platform) => (
            <div key={platform.id} style={styles.platformCard}>
              <div
                onClick={() => toggleExpand(platform.id)}
                style={styles.platformHeader}
              >
                <h3 style={styles.platformTitle}>{platform.name}</h3>
                <span>{expanded === platform.id ? '−' : '+'}</span>
              </div>

              {expanded === platform.id && (
                <div style={styles.platformContent}>
                  <p style={styles.platformInfo}><strong>Description:</strong> {platform.description}</p>
                  <p style={styles.platformInfo}>
                    <strong>Lien:</strong> <a href={platform.url} target="_blank" rel="noopener noreferrer">{platform.url}</a>
                  </p>
                  {platform.icon && (
                    <div style={styles.platformInfo}>
                      <strong>Icône:</strong><br />
                      <img src={platform.icon} alt="icon" width="50" style={styles.icon} />
                    </div>
                  )}
                  <div style={styles.platformActions}>
                    <button style={{...styles.actionButton, ...styles.editButton}}>✏️ Éditer</button>
                    <button style={{...styles.actionButton, ...styles.deleteButton}}>🗑️ Supprimer</button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {platforms.length > itemsPerPage && (
        <div style={styles.paginationContainer}>
          <button 
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            style={styles.pageButton}
          >
            &laquo;
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              style={{
                ...styles.pageButton,
                ...(currentPage === number ? styles.activePageButton : {})
              }}
            >
              {number}
            </button>
          ))}
          
          <button 
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            style={styles.pageButton}
          >
            &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default PlatformPost;
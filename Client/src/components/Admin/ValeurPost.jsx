import React, { useEffect, useState } from 'react';

const ValeurPost = () => {
  const [valeurs, setValeurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newValeur, setNewValeur] = useState({
    titre_fr: "",
    titre_en: "",
    titre_ar: "",
    description_fr: "",
    description_en: "",
    description_ar: "",
    image: null
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const apiUrl = import.meta.env.VITE_API_BACKEND;
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const API_URL = apiUrl + "/api/valeurs/";

  useEffect(() => {
    fetchValeurs();
  }, []);

  const fetchValeurs = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Erreur lors du chargement des valeurs");
      const data = await response.json();
      setValeurs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewValeur((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewValeur((prev) => ({ ...prev, image: file }));
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}${editingId}/` : API_URL;

    try {
      // Using FormData to handle file uploads
      const formData = new FormData();
      Object.keys(newValeur).forEach(key => {
        if (key === 'image' && newValeur[key]) {
          formData.append(key, newValeur[key]);
        } else if (key !== 'image') {
          formData.append(key, newValeur[key]);
        }
      });

      const response = await fetch(url, {
        method,
        body: formData,
        // Don't set Content-Type header when using FormData
      });

      if (!response.ok) throw new Error("Erreur lors de l'enregistrement");
      
      // Récupérer les données complètes après l'ajout/modification
      await fetchValeurs();
      
      setNotification(editingId ? "Valeur mise à jour avec succès !" : "Nouvelle valeur ajoutée avec succès !");

      setNewValeur({
        titre_fr: "",
        titre_en: "",
        titre_ar: "",
        description_fr: "",
        description_en: "",
        description_ar: "",
        image: null
      });
      setImagePreview(null);
      setEditingId(null);
      setShowForm(false);
      setError(null);
      
      // Auto-dismiss notification after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      
      // Afficher automatiquement la nouvelle valeur
      if (!editingId) {
        setTimeout(() => {
          setCurrentPage(Math.ceil(valeurs.length / itemsPerPage));
        }, 100);
      }
      
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (valeur) => {
    setNewValeur({
      titre_fr: valeur.titre_fr,
      titre_en: valeur.titre_en,
      titre_ar: valeur.titre_ar,
      description_fr: valeur.description_fr,
      description_en: valeur.description_en,
      description_ar: valeur.description_ar,
      image: null // We can't retrieve the file itself, only its URL
    });
    
    // If there's an image URL, set it as preview
    if (valeur.image) {
      setImagePreview(valeur.image);
    } else {
      setImagePreview(null);
    }
    
    setEditingId(valeur.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette valeur ?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}${id}/`, { method: 'DELETE' });
      if (!response.ok) throw new Error("Erreur lors de la suppression");
      setValeurs(valeurs.filter((v) => v.id !== id));
      setNotification("Valeur supprimée avec succès !");
      
      // Auto-dismiss notification after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (err) {
      setError(err.message);
    }
  };
  
  // Fonction pour basculer l'affichage détaillé d'une valeur
  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = valeurs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(valeurs.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Styles for responsive design
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
    valeursList: {
      display: 'grid',
      gap: '15px',
    },
    valeurCard: {
      border: '1px solid #eaeaea',
      borderRadius: '8px',
      overflow: 'hidden',
      transition: 'box-shadow 0.3s',
      backgroundColor: '#fff',
    },
    valeurHeader: {
      padding: '15px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
    valeurTitle: {
      margin: 0,
      fontSize: '18px',
      fontWeight: '500',
    },
    valeurContent: {
      padding: '15px',
    },
    valeurInfo: {
      margin: '8px 0',
    },
    valeurActions: {
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
    errorMessage: {
      padding: '10px',
      borderRadius: '5px',
      backgroundColor: '#ffebee',
      color: '#c62828',
      marginBottom: '15px',
    },
    notificationMessage: {
      padding: '10px',
      borderRadius: '5px',
      backgroundColor: '#e8f5e9',
      color: '#2e7d32',
      marginBottom: '15px',
    },
    languageSection: {
      marginTop: '10px',
      padding: '10px',
      borderTop: '1px solid #eee',
    },
    languageTitle: {
      fontSize: '16px',
      fontWeight: '500',
      marginBottom: '8px',
    },
    imagePreview: {
      marginTop: '10px',
      maxWidth: '200px',
      maxHeight: '200px',
      objectFit: 'contain',
      borderRadius: '5px',
      border: '1px solid #ddd',
    },
    imageContainer: {
      marginTop: '15px',
    },
    fileInput: {
      marginTop: '5px',
    },
    infoItem: {
      marginBottom: '8px'
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div style={{ fontSize: '18px', fontWeight: '500', color: '#666' }}>
          Chargement...
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Gestion des Valeurs</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={styles.addButton}
        >
          {showForm ? 'Fermer le formulaire' : 'Ajouter une valeur'}
        </button>
      </div>

      {error && (
        <div style={styles.errorMessage}>
          Erreur: {error}
        </div>
      )}

      {notification && (
        <div style={styles.notificationMessage}>
          {notification}
        </div>
      )}

      {/* Formulaire d'ajout de valeur */}
      {showForm && (
        <section style={styles.formContainer}>
          <h2 style={styles.title}>{editingId ? 'Modifier la valeur' : 'Nouvelle valeur'}</h2>
          <form onSubmit={handleSubmit} style={styles.form} encType="multipart/form-data">
            {/* Champs titre */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Titre en Français</label>
              <input
                type="text"
                id="titre_fr"
                name="titre_fr"
                style={styles.input}
                value={newValeur.titre_fr}
                onChange={handleInputChange}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Title in English</label>
              <input
                type="text"
                id="titre_en"
                name="titre_en"
                style={styles.input}
                value={newValeur.titre_en}
                onChange={handleInputChange}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>العنوان بالعربية</label>
              <input
                type="text"
                id="titre_ar"
                name="titre_ar"
                style={{...styles.input, textAlign: 'right'}}
                value={newValeur.titre_ar}
                onChange={handleInputChange}
                dir="rtl"
                required
              />
            </div>

            {/* Champs description */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Description en Français</label>
              <textarea
                id="description_fr"
                name="description_fr"
                rows="3"
                style={styles.textarea}
                value={newValeur.description_fr}
                onChange={handleInputChange}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Description en Anglais</label>
              <textarea
                id="description_en"
                name="description_en"
                rows="3"
                style={styles.textarea}
                value={newValeur.description_en}
                onChange={handleInputChange}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Description en Arabe</label>
              <textarea
                id="description_ar"
                name="description_ar"
                rows="3"
                style={{...styles.textarea, textAlign: 'right'}}
                value={newValeur.description_ar}
                onChange={handleInputChange}
                dir="rtl"
                required
              />
            </div>

            {/* Champ image */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Image</label>
              <input 
                type="file" 
                onChange={handleImageChange}
                style={styles.fileInput}
                accept="image/*"
              />
              {imagePreview && (
                <div style={styles.imageContainer}>
                  <h4 style={styles.languageTitle}>Prévisualisation de l'image:</h4>
                  <img 
                    src={imagePreview} 
                    alt="Image prévisualisée" 
                    style={styles.imagePreview}
                  />
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px', gap: '10px' }}>
              <button 
                type="button" 
                onClick={() => setShowForm(false)}
                style={{
                  padding: '12px',
                  backgroundColor: '#e0e0e0',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '16px',
                  cursor: 'pointer',
                }}
              >
                Annuler
              </button>
              <button type="submit" style={styles.submitButton}>
                {editingId ? 'Mettre à jour' : 'Ajouter'}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Liste des valeurs */}
      <h2 style={styles.title}>Liste des valeurs</h2>
      
      <div style={styles.valeursList}>
        {currentItems.length === 0 ? (
          <p>Aucune valeur à afficher.</p>
        ) : (
          currentItems.map((valeur) => (
            <div key={valeur.id} style={styles.valeurCard}>
              <div
                onClick={() => toggleExpand(valeur.id)}
                style={styles.valeurHeader}
              >
                <h3 style={styles.valeurTitle}>{valeur.titre_fr}</h3>
                <span>{expanded === valeur.id ? '−' : '+'}</span>
              </div>

              {expanded === valeur.id && (
                <div style={styles.valeurContent}>
                  {/* Ordre de présentation réorganisé */}
                  <div style={styles.infoItem}>
                    <strong>Titre (FR):</strong> {valeur.titre_fr}
                  </div>
                  <div style={styles.infoItem}>
                    <strong>Title (EN):</strong> {valeur.titre_en}
                  </div>
                  <div style={{...styles.infoItem, textAlign: 'right'}} dir="rtl">
                    <strong>العنوان (AR):</strong> {valeur.titre_ar}
                  </div>
                  
                  <div style={styles.infoItem}>
                    <strong>Description (FR):</strong> {valeur.description_fr}
                  </div>
                  <div style={styles.infoItem}>
                    <strong>Description (EN):</strong> {valeur.description_en}
                  </div>
                  <div style={{...styles.infoItem, textAlign: 'right'}} dir="rtl">
                    <strong>الوصف (AR):</strong> {valeur.description_ar}
                  </div>
                  
                  {/* Image avec gestion d'erreur */}
                  {valeur.image && (
                    <div style={styles.languageSection}>
                      <div style={styles.languageTitle}>Image</div>
                      <img 
                        src={valeur.image} 
                        alt={valeur.titre_fr} 
                        style={{
                          maxWidth: '200px',
                          maxHeight: '200px',
                          objectFit: 'contain',
                          borderRadius: '5px',
                        }}
                        onError={(e) => {
                          // En cas d'erreur de chargement d'image, afficher une image par défaut
                          e.target.onerror = null; 
                          e.target.src = '/placeholder-image.png'; // Remplacez par votre image par défaut
                          console.log("Erreur de chargement de l'image:", valeur.image);
                        }}
                      />
                    </div>
                  )}
                  
                  <div style={styles.valeurActions}>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(valeur);
                      }}
                      style={{...styles.actionButton, ...styles.editButton}}
                    >
                      ✏️ Modifier
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(valeur.id);
                      }}
                      style={{...styles.actionButton, ...styles.deleteButton}}
                    >
                      🗑️ Supprimer
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      {/* Pagination */}
      {valeurs.length > itemsPerPage && (
        <div style={styles.paginationContainer}>
          <button 
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            style={{
              ...styles.pageButton,
              opacity: currentPage === 1 ? 0.5 : 1
            }}
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
            style={{
              ...styles.pageButton,
              opacity: currentPage === totalPages ? 0.5 : 1
            }}
          >
            &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default ValeurPost;
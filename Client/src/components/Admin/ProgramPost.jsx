import React, { useEffect, useState } from 'react';

const ProgramPost = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProgram, setNewProgram] = useState({
    title_fr: "",
    title_en: "",
    title_ar: "",
    description_fr: "",
    description_en: "",
    description_ar: "",
    photo_couverture: null
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const apiUrl = import.meta.env.VITE_API_BACKEND;

  // Pagination améliorée
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  const API_URL = `${apiUrl}/api/programmes/`;
  const IMAGE_BASE_URL = apiUrl;

  useEffect(() => {
    fetchPrograms();
  }, [currentPage]);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Erreur lors du chargement des programmes");
      const data = await response.json();
      setPrograms(data);
      setTotalItems(data.length);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProgram((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProgram((prev) => ({ ...prev, photo_couverture: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}${editingId}/` : API_URL;

    try {
      setLoading(true);
      const formData = new FormData();
      Object.keys(newProgram).forEach(key => {
        if (newProgram[key] !== null) {
          formData.append(key, newProgram[key]);
        }
      });

      const response = await fetch(url, {
        method,
        body: formData
      });

      if (!response.ok) throw new Error("Erreur lors de l'enregistrement");
      
      // Récupération du programme mis à jour
      const updatedProgram = await response.json();
      
      // Mise à jour optimiste du state
      if (editingId) {
        setPrograms(prev => prev.map(p => p.id === editingId ? updatedProgram : p));
      } else {
        setPrograms(prev => [...prev, updatedProgram]);
        // Naviguer vers la dernière page pour voir le nouveau programme
        setTimeout(() => {
          const newTotalPages = Math.ceil((programs.length + 1) / itemsPerPage);
          setCurrentPage(newTotalPages);
        }, 100);
      }

      setNotification(editingId ? "Programme mis à jour avec succès !" : "Nouveau programme ajouté avec succès !");

      // Réinitialisation du formulaire
      setNewProgram({
        title_fr: "",
        title_en: "",
        title_ar: "",
        description_fr: "",
        description_en: "",
        description_ar: "",
        photo_couverture: null
      });
      setImagePreview(null);
      setEditingId(null);
      setShowForm(false);
      setError(null);

      setTimeout(() => setNotification(null), 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (program) => {
    setNewProgram({
      title_fr: program.title_fr || "",
      title_en: program.title_en || "",
      title_ar: program.title_ar || "",
      description_fr: program.description_fr || "",
      description_en: program.description_en || "",
      description_ar: program.description_ar || "",
      photo_couverture: null
    });
    setImagePreview(program.photo_couverture ? `${IMAGE_BASE_URL}${program.photo_couverture}` : null);
    setEditingId(program.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce programme ?")) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}${id}/`, { method: 'DELETE' });
      if (!response.ok) throw new Error("Erreur lors de la suppression");

      // Mise à jour optimiste du state
      setPrograms(prev => prev.filter(p => p.id !== id));
      setNotification("Programme supprimé avec succès !");
      setTimeout(() => setNotification(null), 5000);

      // Vérifier si nous devons changer de page
      const newTotalPages = Math.ceil((programs.length - 1) / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  // Pagination améliorée
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = programs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(programs.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: document.getElementById('programs-list').offsetTop - 20, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Styles pour le design responsive
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
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
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
      resize: 'vertical',
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
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    programsList: {
      display: 'grid',
      gap: '15px',
    },
    programCard: {
      border: '1px solid #eaeaea',
      borderRadius: '8px',
      overflow: 'hidden',
      transition: 'box-shadow 0.3s',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },
    programHeader: {
      padding: '15px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
    programTitle: {
      margin: 0,
      fontSize: '18px',
      fontWeight: '500',
    },
    programContent: {
      padding: '15px',
    },
    programInfo: {
      margin: '8px 0',
    },
    programActions: {
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
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    editButton: {
      backgroundColor: '#e0e0e0',
      color: '#333',
    },
    deleteButton: {
      backgroundColor: '#ffebee',
      color: '#c62828',
    },
    paginationContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      marginTop: '20px',
      flexWrap: 'wrap',
    },
    pageButton: {
      padding: '8px 12px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      backgroundColor: '#fff',
      cursor: 'pointer',
      minWidth: '40px',
      textAlign: 'center',
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
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px'
    },
    loadingText: {
      fontSize: '18px',
      fontWeight: '500',
      color: '#666'
    },
    paginationInfo: {
      margin: '0 15px',
      fontSize: '14px',
      color: '#666',
    },
    paginationControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    programImage: {
      maxWidth: '100%',
      maxHeight: '200px',
      objectFit: 'contain',
      borderRadius: '5px',
      border: '1px solid #ddd',
      margin: '10px 0',
    },
    selectControl: {
      padding: '8px 10px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      fontSize: '14px',
      marginLeft: '5px',
    }
  };

  if (loading && programs.length === 0) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingText}>
          Chargement...
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Gestion des Programmes</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={styles.addButton}
        >
          {showForm ? 'Fermer le formulaire' : 'Ajouter un programme'}
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

      {/* Formulaire d'ajout de programme */}
      {showForm && (
        <section style={styles.formContainer}>
          <h2 style={styles.title}>{editingId ? 'Modifier le programme' : 'Nouveau programme'}</h2>
          <form onSubmit={handleSubmit} style={styles.form} encType="multipart/form-data">
            {/* Champs titre */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Titre en Français</label>
              <input
                type="text"
                id="title_fr"
                name="title_fr"
                style={styles.input}
                value={newProgram.title_fr}
                onChange={handleInputChange}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Title in English</label>
              <input
                type="text"
                id="title_en"
                name="title_en"
                style={styles.input}
                value={newProgram.title_en}
                onChange={handleInputChange}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>العنوان بالعربية</label>
              <input
                type="text"
                id="title_ar"
                name="title_ar"
                style={{...styles.input, textAlign: 'right'}}
                value={newProgram.title_ar}
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
                value={newProgram.description_fr}
                onChange={handleInputChange}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Description in English</label>
              <textarea
                id="description_en"
                name="description_en"
                rows="3"
                style={styles.textarea}
                value={newProgram.description_en}
                onChange={handleInputChange}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>الوصف بالعربية</label>
              <textarea
                id="description_ar"
                name="description_ar"
                rows="3"
                style={{...styles.textarea, textAlign: 'right'}}
                value={newProgram.description_ar}
                onChange={handleInputChange}
                dir="rtl"
                required
              />
            </div>

            {/* Champ image */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Photo de couverture</label>
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
                    loading="lazy"
                  />
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px', gap: '10px' }}>
              <button 
                type="button" 
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setNewProgram({
                    title_fr: "",
                    title_en: "",
                    title_ar: "",
                    description_fr: "",
                    description_en: "",
                    description_ar: "",
                    photo_couverture: null
                  });
                  setImagePreview(null);
                }}
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

      {/* Liste des programmes */}
      <h2 style={styles.title} id="programs-list">Liste des programmes</h2>
      
      {loading && programs.length > 0 && (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          Chargement...
        </div>
      )}
      
      <div style={styles.programsList}>
        {!loading && currentItems.length === 0 ? (
          <p>Aucun programme à afficher.</p>
        ) : (
          currentItems.map((program) => (
            <div key={program.id} style={styles.programCard}>
              <div
                onClick={() => toggleExpand(program.id)}
                style={styles.programHeader}
              >
                <h3 style={styles.programTitle}>{program.title_fr || program.title}</h3>
                <span>{expanded === program.id ? '−' : '+'}</span>
              </div>

              {expanded === program.id && (
                <div style={styles.programContent}>
                  {/* Affichage de l'image en premier pour plus de visibilité */}
                  {program.photo_couverture && (
                    <div style={styles.languageSection}>
                      <div style={styles.languageTitle}>Photo de couverture</div>
                      <img 
                        src={program.photo_couverture.startsWith('http') 
                          ? program.photo_couverture 
                          : `${IMAGE_BASE_URL}${program.photo_couverture}`}
                        alt={program.title_fr || program.title} 
                        style={styles.programImage}
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null; 
                          e.target.src = '/placeholder-image.png';
                          console.log("Erreur de chargement de l'image:", program.photo_couverture);
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Informations du programme */}
                  <div style={styles.infoItem}>
                    <strong>Titre (FR):</strong> {program.title_fr || program.title || "N/A"}
                  </div>
                  <div style={styles.infoItem}>
                    <strong>Title (EN):</strong> {program.title_en || "N/A"}
                  </div>
                  <div style={{...styles.infoItem, textAlign: 'right'}} dir="rtl">
                    <strong>العنوان (AR):</strong> {program.title_ar || "N/A"}
                  </div>
                  
                  <div style={styles.infoItem}>
                    <strong>Description (FR):</strong> {program.description_fr || program.description || "N/A"}
                  </div>
                  <div style={styles.infoItem}>
                    <strong>Description (EN):</strong> {program.description_en || "N/A"}
                  </div>
                  <div style={{...styles.infoItem, textAlign: 'right'}} dir="rtl">
                    <strong>الوصف (AR):</strong> {program.description_ar || "N/A"}
                  </div>
                  
                  <div style={styles.programActions}>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(program);
                      }}
                      style={{...styles.actionButton, ...styles.editButton}}
                    >
                      ✏️ Modifier
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(program.id);
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
      
      {/* Pagination améliorée */}
      {programs.length > 0 && (
        <div style={styles.paginationContainer}>
          <div style={styles.paginationControls}>
            <button 
              onClick={() => paginate(1)}
              disabled={currentPage === 1}
              style={{
                ...styles.pageButton,
                opacity: currentPage === 1 ? 0.5 : 1,
                cursor: currentPage === 1 ? 'default' : 'pointer'
              }}
            >
              &laquo;
            </button>
            
            <button 
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              style={{
                ...styles.pageButton,
                opacity: currentPage === 1 ? 0.5 : 1,
                cursor: currentPage === 1 ? 'default' : 'pointer'
              }}
            >
              &lsaquo;
            </button>
            
            {/* Afficher les numéros de page avec un nombre limité de pages visibles */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(num => 
                num === 1 || 
                num === totalPages || 
                (num >= currentPage - 1 && num <= currentPage + 1)
              )
              .map((number, index, array) => (
                <React.Fragment key={number}>
                  {index > 0 && array[index - 1] !== number - 1 && (
                    <span style={{ margin: '0 5px' }}>...</span>
                  )}
                  <button
                    onClick={() => paginate(number)}
                    style={{
                      ...styles.pageButton,
                      ...(currentPage === number ? styles.activePageButton : {})
                    }}
                  >
                    {number}
                  </button>
                </React.Fragment>
              ))
            }
            
            <button 
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              style={{
                ...styles.pageButton,
                opacity: currentPage === totalPages ? 0.5 : 1,
                cursor: currentPage === totalPages ? 'default' : 'pointer'
              }}
            >
              &rsaquo;
            </button>
            
            <button 
              onClick={() => paginate(totalPages)}
              disabled={currentPage === totalPages}
              style={{
                ...styles.pageButton,
                opacity: currentPage === totalPages ? 0.5 : 1,
                cursor: currentPage === totalPages ? 'default' : 'pointer'
              }}
            >
              &raquo;
            </button>
          </div>
          
          <div style={styles.paginationInfo}>
            Affichage {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} sur {totalItems} programmes
            <span style={{ marginLeft: '10px' }}>
              Programmes par page:
              <select 
                value={itemsPerPage} 
                onChange={handleItemsPerPageChange}
                style={styles.selectControl}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramPost;
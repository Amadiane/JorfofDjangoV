import React, { useEffect, useState } from 'react';

const MotPresidentPost = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState({
    titre_fr: "", 
    titre_en: "",
    titre_ar: "",
    description_fr: "",
    description_en: "",
    description_ar: "",
    image: null,
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

  const API_URL = apiUrl + "/api/motpresident/";
  // URL de base pour les images - assurez-vous que cette URL correspond à la configuration de votre serveur
  const IMAGE_BASE_URL = apiUrl;

  // Chargement des messages
  useEffect(() => {
    fetchMessages();
  }, []);

  // Ajustement page si suppression/ajout
  useEffect(() => {
    const totalPages = Math.ceil(messages.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [messages, currentPage, itemsPerPage]);

  // Fonction de récupération API
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`Erreur lors du chargement des messages: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("Messages récupérés:", data); // Pour le debug
      setMessages(data);
      setError(null);
    } catch (err) {
      console.error("Erreur de récupération:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Changement inputs formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMessage(prev => ({ ...prev, [name]: value }));
  };

  // Changement image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewMessage(prev => ({ ...prev, image: file }));
      
      // Création de l'aperçu de l'image
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      // Si aucun fichier n'est sélectionné, conserver l'image actuelle en mode édition
      if (editingId) {
        // Ne pas modifier l'image si on est en mode édition
      } else {
        setImagePreview(null);
      }
    }
  };

  // Vérifier si l'URL de l'image est valide
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    // Si l'URL est déjà absolue, la retourner telle quelle
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // Sinon, construire l'URL complète
    return `${IMAGE_BASE_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  };

  // Soumission formulaire ajout/édition
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}${editingId}/` : API_URL;

    try {
      setLoading(true);
      const formData = new FormData();
      
      // Ajouter tous les champs au FormData
      Object.keys(newMessage).forEach(key => {
        if (newMessage[key] !== null) {
          formData.append(key, newMessage[key]);
        }
      });

      // Afficher le contenu du FormData pour le debug
      console.log("FormData contenu:");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + (pair[1] instanceof File ? pair[1].name : pair[1]));
      }

      const response = await fetch(url, {
        method,
        body: formData,
        // Ne pas ajouter Content-Type header car il est automatiquement défini avec FormData
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur lors de l'enregistrement: ${response.status} ${response.statusText}. ${errorText}`);
      }

      await fetchMessages();
      setNotification(editingId ? "Message mis à jour avec succès !" : "Nouveau message ajouté avec succès !");
      setNewMessage({
        titre_fr: "",
        titre_en: "",
        titre_ar: "",
        description_fr: "",
        description_en: "",
        description_ar: "",
        image: null,
      });
      setImagePreview(null);
      setEditingId(null);
      setShowForm(false);
      setError(null);

      setTimeout(() => setNotification(null), 5000);

      // Rediriger vers la dernière page si ajout d'un nouveau message
      if (!editingId) {
        setTimeout(() => {
          const newTotalPages = Math.ceil((messages.length + 1) / itemsPerPage);
          setCurrentPage(newTotalPages);
        }, 100);
      }
    } catch (err) {
      console.error("Erreur de soumission:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Préparer l'édition d'un message
  const handleEdit = (message) => {
    setNewMessage({
      titre_fr: message.titre_fr || "",
      titre_en: message.titre_en || "",
      titre_ar: message.titre_ar || "",
      description_fr: message.description_fr || "",
      description_en: message.description_en || "",
      description_ar: message.description_ar || "",
      image: null, // On ne peut pas récupérer l'image existante comme un File object
    });
    
    // Définir l'aperçu de l'image si elle existe
    setImagePreview(message.image ? getImageUrl(message.image) : null);
    setEditingId(message.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Supprimer un message
  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}${id}/`, { method: 'DELETE' });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur lors de la suppression: ${response.status} ${response.statusText}. ${errorText}`);
      }

      setMessages(prev => prev.filter(m => m.id !== id));
      setNotification("Message supprimé avec succès !");
      setTimeout(() => setNotification(null), 5000);

      // Ajuster page si besoin
      const newTotalPages = Math.ceil((messages.length - 1) / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    } catch (err) {
      console.error("Erreur de suppression:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Afficher / cacher description complète
  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = messages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(messages.length / itemsPerPage);

  // Fonction de pagination améliorée
  const paginate = (pageNumber) => {
    // Vérifier que le numéro de page est valide
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // Remonter en haut de la liste
      const listElement = document.getElementById('messages-list');
      if (listElement) {
        listElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Fonction pour rendre le bouton de pagination en fonction de la page courante
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Nombre maximal de boutons de page à afficher
    
    // Calcul des pages à afficher
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    // Ajustements pour toujours afficher le nombre maximal de pages quand c'est possible
    if (endPage - startPage + 1 < maxPagesToShow && startPage > 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    // Bouton pour la première page
    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => paginate(1)}
          style={styles.pageButton}
        >
          1
        </button>
      );
      
      // Ellipsis si nécessaire
      if (startPage > 2) {
        pageNumbers.push(<span key="ellipsis1" style={{margin: '0 5px'}}>...</span>);
      }
    }
    
    // Pages numérotées
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          style={{
            ...styles.pageButton,
            ...(currentPage === i ? styles.activePageButton : {})
          }}
        >
          {i}
        </button>
      );
    }
    
    // Ellipsis et dernière page si nécessaire
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="ellipsis2" style={{margin: '0 5px'}}>...</span>);
      }
      
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => paginate(totalPages)}
          style={styles.pageButton}
        >
          {totalPages}
        </button>
      );
    }
    
    return pageNumbers;
  };

  // Styles pour le design responsive, inspirés du composant FondationPost
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
      '&:hover': {
        backgroundColor: '#15153a',
      },
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
      '&:hover': {
        backgroundColor: '#15153a',
      },
    },
    messagesList: {
      display: 'grid',
      gap: '15px',
    },
    messageCard: {
      border: '1px solid #eaeaea',
      borderRadius: '8px',
      overflow: 'hidden',
      transition: 'box-shadow 0.3s',
      backgroundColor: '#fff',
      '&:hover': {
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      },
    },
    messageHeader: {
      padding: '15px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
    messageTitle: {
      margin: 0,
      fontSize: '18px',
      fontWeight: '500',
    },
    messageContent: {
      padding: '15px',
    },
    messageInfo: {
      margin: '8px 0',
    },
    messageActions: {
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
      transition: 'background-color 0.2s',
    },
    editButton: {
      backgroundColor: '#e0e0e0',
      '&:hover': {
        backgroundColor: '#d0d0d0',
      },
    },
    deleteButton: {
      backgroundColor: '#ffebee',
      color: '#c62828',
      '&:hover': {
        backgroundColor: '#ffcdd2',
      },
    },
    paginationContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '5px',
      marginTop: '20px',
    },
    pageButton: {
      padding: '8px 12px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      backgroundColor: '#fff',
      cursor: 'pointer',
      transition: 'all 0.2s',
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
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
      marginBottom: '12px',
      lineHeight: '1.5',
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100px',
    },
    loadingText: {
      fontSize: '18px',
      fontWeight: '500',
      color: '#666',
    },
    paginationInfo: {
      textAlign: 'center',
      margin: '10px 0',
      color: '#666',
      fontSize: '14px',
    },
    noMessageText: {
      textAlign: 'center',
      padding: '20px',
      color: '#666',
      fontStyle: 'italic',
    },
    expandButton: {
      fontSize: '18px',
      fontWeight: 'bold',
    }
  };

  if (loading && messages.length === 0) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingText}>
          Chargement des messages...
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Messages du Président</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setNewMessage({
              titre_fr: "",
              titre_en: "",
              titre_ar: "",
              description_fr: "",
              description_en: "",
              description_ar: "",
              image: null,
            });
            setImagePreview(null);
          }}
          style={styles.addButton}
        >
          {showForm ? 'Fermer le formulaire' : 'Ajouter un message'}
        </button>
      </div>

      {error && (
        <div style={styles.errorMessage}>
          <strong>Erreur:</strong> {error}
        </div>
      )}

      {notification && (
        <div style={styles.notificationMessage}>
          {notification}
        </div>
      )}

      {/* Formulaire d'ajout de message */}
      {showForm && (
        <section style={styles.formContainer}>
          <h2 style={styles.title}>{editingId ? 'Modifier le message' : 'Nouveau message'}</h2>
          <form onSubmit={handleSubmit} style={styles.form} encType="multipart/form-data">
            {/* Champs titre */}
            <div style={styles.formGroup}>
              <label htmlFor="titre_fr" style={styles.label}>Titre en Français</label>
              <input
                type="text"
                id="titre_fr"
                name="titre_fr"
                style={styles.input}
                value={newMessage.titre_fr}
                onChange={handleInputChange}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="titre_en" style={styles.label}>Title in English</label>
              <input
                type="text"
                id="titre_en"
                name="titre_en"
                style={styles.input}
                value={newMessage.titre_en}
                onChange={handleInputChange}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="titre_ar" style={styles.label}>العنوان بالعربية</label>
              <input
                type="text"
                id="titre_ar"
                name="titre_ar"
                style={{...styles.input, textAlign: 'right'}}
                value={newMessage.titre_ar}
                onChange={handleInputChange}
                dir="rtl"
                required
              />
            </div>

            {/* Champs description */}
            <div style={styles.formGroup}>
              <label htmlFor="description_fr" style={styles.label}>Description en Français</label>
              <textarea
                id="description_fr"
                name="description_fr"
                rows="3"
                style={styles.textarea}
                value={newMessage.description_fr}
                onChange={handleInputChange}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="description_en" style={styles.label}>Description in English</label>
              <textarea
                id="description_en"
                name="description_en"
                rows="3"
                style={styles.textarea}
                value={newMessage.description_en}
                onChange={handleInputChange}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="description_ar" style={styles.label}>الوصف بالعربية</label>
              <textarea
                id="description_ar"
                name="description_ar"
                rows="3"
                style={{...styles.textarea, textAlign: 'right'}}
                value={newMessage.description_ar}
                onChange={handleInputChange}
                dir="rtl"
                required
              />
            </div>

            {/* Champ image */}
            <div style={styles.formGroup}>
              <label htmlFor="image" style={styles.label}>Image {editingId && !newMessage.image ? "(laisser vide pour conserver l'image actuelle)" : ""}</label>
              <input 
                type="file" 
                id="image"
                name="image"
                onChange={handleImageChange}
                style={styles.fileInput}
                accept="image/*"
              />
              {imagePreview && (
                <div style={styles.imageContainer}>
                  <h4 style={styles.languageTitle}>Prévisualisation de l'image:</h4>
                  <img 
                    src={imagePreview} 
                    alt="Aperçu" 
                    style={styles.imagePreview}
                    onError={(e) => {
                      console.error("Erreur de chargement de l'image preview:", e);
                      e.target.src = '/placeholder-image.png'; // Image par défaut
                    }}
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

      {/* Liste des messages */}
      <h2 id="messages-list" style={styles.title}>Liste des messages</h2>
      
      {loading && messages.length > 0 && (
        <div style={styles.loadingContainer}>
          <div style={styles.loadingText}>
            Chargement...
          </div>
        </div>
      )}
      
      <div style={styles.messagesList}>
        {!loading && currentItems.length === 0 ? (
          <p style={styles.noMessageText}>Aucun message à afficher.</p>
        ) : (
          currentItems.map((message) => (
            <div key={message.id} style={styles.messageCard}>
              <div
                onClick={() => toggleExpand(message.id)}
                style={styles.messageHeader}
              >
                <h3 style={styles.messageTitle}>{message.titre_fr}</h3>
                <span style={styles.expandButton}>{expanded === message.id ? '−' : '+'}</span>
              </div>

              {expanded === message.id && (
                <div style={styles.messageContent}>
                  {/* Information en français */}
                  <div style={styles.infoItem}>
                    <strong>Titre (FR):</strong> {message.titre_fr}
                  </div>
                  <div style={styles.infoItem}>
                    <strong>Title (EN):</strong> {message.titre_en}
                  </div>
                  <div style={{...styles.infoItem, textAlign: 'right'}} dir="rtl">
                    <strong>العنوان (AR):</strong> {message.titre_ar}
                  </div>
                  
                  <div style={styles.infoItem}>
                    <strong>Description (FR):</strong> {message.description_fr}
                  </div>
                  <div style={styles.infoItem}>
                    <strong>Description (EN):</strong> {message.description_en}
                  </div>
                  <div style={{...styles.infoItem, textAlign: 'right'}} dir="rtl">
                    <strong>الوصف (AR):</strong> {message.description_ar}
                  </div>
                  
                  {/* Image avec gestion d'erreur améliorée */}
                  {message.image && (
                    <div style={styles.languageSection}>
                      <div style={styles.languageTitle}>Image</div>
                      <img 
                        src={getImageUrl(message.image)}
                        alt={message.titre_fr} 
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          maxHeight: '300px',
                          objectFit: 'contain',
                          borderRadius: '5px',
                          border: '1px solid #eee',
                        }}
                        onError={(e) => {
                          console.error("Erreur de chargement de l'image:", message.image);
                          e.target.onerror = null; 
                          e.target.src = '/placeholder-image.png'; // Image par défaut
                        }}
                      />
                    </div>
                  )}
                  
                  <div style={styles.messageActions}>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(message);
                      }}
                      style={{...styles.actionButton, ...styles.editButton}}
                    >
                      ✏️ Modifier
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(message.id);
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
      
      {/* Affichage de l'information de pagination */}
      {messages.length > 0 && (
        <div style={styles.paginationInfo}>
          Affichage {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, messages.length)} sur {messages.length} messages
        </div>
      )}
      
      {/* Pagination améliorée */}
      {messages.length > itemsPerPage && (
        <div style={styles.paginationContainer}>
          <button 
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
            style={{
              ...styles.pageButton,
              opacity: currentPage === 1 ? 0.5 : 1,
              cursor: currentPage === 1 ? 'default' : 'pointer'
            }}
            aria-label="Première page"
          >
            &laquo;&laquo;
          </button>
          
          <button 
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            style={{
              ...styles.pageButton,
              opacity: currentPage === 1 ? 0.5 : 1,
              cursor: currentPage === 1 ? 'default' : 'pointer'
            }}
            aria-label="Page précédente"
          >
            &laquo;
          </button>
          
          {renderPageNumbers()}
          
          <button 
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            style={{
              ...styles.pageButton,
              opacity: currentPage === totalPages ? 0.5 : 1,
              cursor: currentPage === totalPages ? 'default' : 'pointer'
            }}
            aria-label="Page suivante"
          >
            &raquo;
          </button>
          
          <button 
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
            style={{
              ...styles.pageButton,
              opacity: currentPage === totalPages ? 0.5 : 1,
              cursor: currentPage === totalPages ? 'default' : 'pointer'
            }}
            aria-label="Dernière page"
          >
            &raquo;&raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default MotPresidentPost;
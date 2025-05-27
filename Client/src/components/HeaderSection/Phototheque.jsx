//A rendre responsive
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';  // Import de useTranslation
import ChatBotNew from "../ChatBot/ChatbotNew";


const Phototheque = () => {
  const { t } = useTranslation();  // Initialisation du hook de traduction
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [draggingImage, setDraggingImage] = useState(null);
  const [imagePositions, setImagePositions] = useState({});
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or timeline
  const [zoomedImage, setZoomedImage] = useState(null);
  const apiUrl = import.meta.env.VITE_API_BACKEND;

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(apiUrl + "/api/media/");
        if (!response.ok) throw new Error("Erreur lors du chargement des données.");
        const data = await response.json();

        const initialPositions = {};
        data.forEach((item, index) => {
          initialPositions[index] = { x: 0, y: 0 };
        });
        setImagePositions(initialPositions);

        setPhotos(data);
      } catch (err) {
        console.error("Erreur de fetch:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = searchTerm === "" || 
      photo.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (photo.description && photo.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const handleMouseDown = (index, e) => {
    if (zoomedImage !== null) return; // Ne pas permettre le déplacement si une image est zoomée
    setDraggingImage(index);
    e.preventDefault();
  };

  const handleTouchStart = (index, e) => {
    if (zoomedImage !== null) return; // Ne pas permettre le déplacement si une image est zoomée
    setDraggingImage(index);
  };

  const handleMouseMove = (e) => {
    if (draggingImage !== null) {
      e.preventDefault();
      setImagePositions(prev => ({
        ...prev,
        [draggingImage]: {
          x: (prev[draggingImage]?.x || 0) + e.movementX,
          y: (prev[draggingImage]?.y || 0) + e.movementY
        }
      }));
    }
  };

  const handleTouchMove = (e) => {
    if (draggingImage !== null && e.touches && e.touches[0]) {
      const touch = e.touches[0];
      const previousTouch = e.target.previousTouch || { clientX: touch.clientX, clientY: touch.clientY };
      
      const movementX = touch.clientX - previousTouch.clientX;
      const movementY = touch.clientY - previousTouch.clientY;
      
      e.target.previousTouch = { clientX: touch.clientX, clientY: touch.clientY };
      
      setImagePositions(prev => ({
        ...prev,
        [draggingImage]: {
          x: (prev[draggingImage]?.x || 0) + movementX,
          y: (prev[draggingImage]?.y || 0) + movementY
        }
      }));
    }
  };

  const handleMouseUp = () => {
    setDraggingImage(null);
  };

  const handleTouchEnd = () => {
    setDraggingImage(null);
  };

  const resetImagePosition = (index, e) => {
    e && e.stopPropagation();
    setImagePositions(prev => ({
      ...prev,
      [index]: { x: 0, y: 0 }
    }));
  };

  const toggleDescription = (index) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleZoomImage = (index, e) => {
    e && e.stopPropagation();
    setZoomedImage(zoomedImage === index ? null : index);
  };

  const closeZoomedImage = () => {
    setZoomedImage(null);
  };

  useEffect(() => {
    if (draggingImage !== null) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }

    // Ajouter un gestionnaire d'événement pour fermer l'image zoomée avec échap
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        closeZoomedImage();
      }
    };

    if (zoomedImage !== null) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [draggingImage, zoomedImage]);

  const getImageSrc = (photo) => {
    let imageUrl = '/image_indispo.png';
    if (photo.image) {
      if (photo.image.startsWith("http")) {
        imageUrl = photo.image;
      } else {
        imageUrl = `${apiUrl}${photo.image}`;
      }
    }
    return imageUrl;
  };

  const splitDescription = (description) => {
    if (!description) return { intro: '', main: '' };
    
    // Pour les petits écrans, on retourne tout dans intro pour afficher plus tard avec le bouton "Voir plus"
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      return { intro: description.substring(0, 150) + '...', main: description };
    }
    
    if (description.length < 300) {
      return { intro: description, main: '' };
    }

    const cutIndex = description.lastIndexOf(" ", 300);
    const intro = description.substring(0, cutIndex);
    const main = description.substring(cutIndex).trim();
    return { intro, main };
  };

  // Styles améliorés
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      padding: '0',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      fontFamily: 'Roboto, Arial, sans-serif',
      position: 'relative',
    },
    header: {
      width: '100%',
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '25px 0',
      marginBottom: '40px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      position: 'relative',
      zIndex: '1',
    },
    headerContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      fontSize: '42px',
      fontWeight: '700',
      margin: '0 0 15px 0',
      textAlign: 'center',
      color: 'white',
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      textShadow: '0 2px 4px rgba(0,0,0,0.2)',
    },
    subtitle: {
      fontSize: '18px',
      fontWeight: '400',
      marginBottom: '10px',
      textAlign: 'center',
      color: 'rgba(255,255,255,0.9)',
      maxWidth: '800px',
    },
    content: {
      width: '100%',
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 20px 50px',
      position: 'relative',
      zIndex: '1',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginBottom: '30px',
      gap: '15px',
      backgroundColor: 'white',
      padding: '15px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    },
    searchContainer: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#f1f3f5',
      borderRadius: '30px',
      padding: '5px 15px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
      flex: '1',
      maxWidth: '500px',
      margin: '0 auto',
    },
    searchIcon: {
      fontSize: '18px',
      color: '#7f8c8d',
      marginRight: '10px',
    },
    searchInput: {
      border: 'none',
      padding: '10px 5px',
      fontSize: '16px',
      width: '100%',
      outline: 'none',
      backgroundColor: 'transparent',
    },
    viewModeContainer: {
      display: 'flex',
      gap: '10px',
    },
    viewModeButton: {
      padding: '10px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: '#f1f3f5',
      color: '#495057',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s',
    },
    activeViewMode: {
      backgroundColor: '#3498db',
      color: 'white',
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '30px',
    },
    timelineContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '50px',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
      transition: 'transform 0.3s, box-shadow 0.3s',
      position: 'relative',
    },
    cardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
    },
    imageContainer: {
      position: 'relative',
      width: '100%',
      paddingTop: '66%', // Ratio aspect 3:2
      backgroundColor: '#f0f0f0',
      overflow: 'hidden',
    },
    timelineImageContainer: {
      width: '100%',
      height: '400px',
      position: 'relative',
      backgroundColor: '#f0f0f0',
      borderRadius: '12px',
      overflow: 'hidden',
    },
    image: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: 'auto',
      height: 'auto',
      maxWidth: '90%',
      maxHeight: '90%',
      objectFit: 'contain',
      cursor: 'grab',
      transform: 'translate(-50%, -50%)',
      transition: 'transform 0.2s ease',
    },
    zoomButton: {
      position: 'absolute',
      bottom: '15px',
      right: '15px',
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      backgroundColor: 'rgba(52, 152, 219, 0.85)',
      border: 'none',
      color: 'white',
      fontSize: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      transition: 'all 0.2s',
      zIndex: '2',
    },
    zoomButtonHover: {
      backgroundColor: 'rgba(52, 152, 219, 1)',
      transform: 'scale(1.1)',
    },
    resetButton: {
      position: 'absolute',
      bottom: '15px',
      left: '15px',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      border: 'none',
      color: '#333',
      fontSize: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      transition: 'all 0.2s',
      zIndex: '2',
    },
    cardContent: {
      padding: '20px',
    },
    timelineContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      padding: '20px',
    },
    cardTitle: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '10px',
      color: '#2c3e50',
    },
    timelineTitle: {
      fontSize: '28px',
      fontWeight: '700',
      marginBottom: '15px',
      color: '#2c3e50',
    },
    cardDescription: {
      fontSize: '15px',
      color: '#636e72',
      lineHeight: '1.6',
    },
    timelineDescription: {
      fontSize: '16px',
      color: '#636e72',
      lineHeight: '1.8',
    },
    readMoreButton: {
      backgroundColor: 'transparent',
      color: '#3498db',
      border: 'none',
      padding: '8px 0',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      marginTop: '10px',
    },
    zoomedImageOverlay: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(0,0,0,0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '1000',
    },
    zoomedImageContainer: {
      position: 'relative',
      width: '90%',
      height: '90%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    zoomedImage: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
    },
    closeZoomButton: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      backgroundColor: 'rgba(255,255,255,0.2)',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      fontSize: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      zIndex: '1001',
    },
    imageInfo: {
      position: 'absolute',
      bottom: '20px',
      left: '0',
      right: '0',
      backgroundColor: 'rgba(0,0,0,0.7)',
      color: 'white',
      padding: '15px 20px',
      textAlign: 'center',
    },
    imageTitle: {
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '5px',
    },
    imageDescription: {
      fontSize: '16px',
      opacity: '0.9',
    },
    loaderContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '300px',
    },
    loader: {
      border: '4px solid rgba(0, 0, 0, 0.1)',
      borderLeft: '4px solid #3498db',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      animation: 'spin 1s linear infinite',
    },
    errorContainer: {
      padding: '30px',
      textAlign: 'center',
      backgroundColor: '#fff3f3',
      borderRadius: '12px',
      border: '1px solid #ffcdd2',
    },
    errorTitle: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#c0392b',
      marginBottom: '15px',
    },
    errorMessage: {
      fontSize: '16px',
      color: '#7f8c8d',
      marginBottom: '20px',
    },
    noResultsContainer: {
      padding: '40px',
      textAlign: 'center',
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      border: '1px dashed #dee2e6',
    },
    noResultsText: {
      fontSize: '18px',
      color: '#636e72',
    },
    // Keyframes pour les animations
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
    '@keyframes fadeIn': {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    // Styles pour les breakpoints responsifs
    '@media (max-width: 992px)': {
      gridContainer: {
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      },
      timelineImageContainer: {
        height: '350px',
      },
      title: {
        fontSize: '36px',
      },
    },
    '@media (max-width: 768px)': {
      gridContainer: {
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      },
      timelineImageContainer: {
        height: '250px',
      },
      title: {
        fontSize: '32px',
      },
      toolbar: {
        flexDirection: 'column',
        alignItems: 'stretch',
      },
      searchContainer: {
        maxWidth: '100%',
      },
    },
    '@media (max-width: 576px)': {
      title: {
        fontSize: '28px',
      },
      subtitle: {
        fontSize: '16px',
      },
      gridContainer: {
        gridTemplateColumns: '1fr',
      },
    },
  };

  // Contenu pour les cas de chargement, erreur ou pas de résultats
  const renderLoadingContent = () => (
    <div style={styles.loaderContainer}>
      <div style={styles.loader}></div>
    </div>
  );

  const renderErrorContent = () => (
    <div style={styles.errorContainer}>
      <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚠️</div>
      <h3 style={styles.errorTitle}>Erreur de chargement</h3>
      <p style={styles.errorMessage}>{error}</p>
      <p>Vérifiez que votre serveur Django est bien lancé sur http://127.0.0.1:8000</p>
    </div>
  );

  const renderNoResultsContent = () => (
    <div style={styles.noResultsContainer}>
      <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
      <p style={styles.noResultsText}>
        {searchTerm 
          ? "Aucune photo ne correspond à votre recherche." 
          : "Aucune photo n'est disponible dans la galerie."}
      </p>
    </div>
  );

  const renderGridView = () => (
    <div style={styles.gridContainer}>
      {filteredPhotos.map((photo, index) => {
        const { intro } = splitDescription(photo.description);
        return (
          <div 
            key={index} 
            style={styles.card}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={styles.imageContainer}>
              <img
                src={getImageSrc(photo)}
                alt={`Image de ${photo.titre}`}
                style={{
                  ...styles.image,
                  transform: `translate(-50%, -50%) translate(${imagePositions[index]?.x || 0}px, ${imagePositions[index]?.y || 0}px)`,
                }}
                onMouseDown={(e) => handleMouseDown(index, e)}
                onTouchStart={(e) => handleTouchStart(index, e)}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/image_indispo.png';
                }}
              />
              {/* Bouton de zoom stylisé */}
              <button 
                style={{
                  ...styles.zoomButton,
                  transform: `scale(${draggingImage === index ? '0.9' : '1'})`,
                }}
                onClick={(e) => handleZoomImage(index, e)}
                title={('Agrandir l\'image')}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = `scale(${draggingImage === index ? '0.9' : '1'})`}
              >
                <span>🔍</span>
              </button>
              {/* Bouton de réinitialisation de position */}
              <button 
                style={styles.resetButton}
                onClick={(e) => resetImagePosition(index, e)}
                title={('Réinitialiser la position')}
              >
                <span>↺</span>
              </button>
            </div>
            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>{photo.titre}</h3>
              <p style={styles.cardDescription}>
                {expandedDescriptions[index] ? photo.description : intro}
              </p>
              {/*{photo.description && photo.description.length > 150 && (
                <button
                  onClick={() => toggleDescription(index)}
                  style={styles.readMoreButton}
                >
                  {expandedDescriptions[index] ? 'Voir moins' : 'Voir plus'} {expandedDescriptions[index] ? '↑' : '↓'}
                </button>
              )}*/}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderTimelineView = () => (
    <div style={styles.timelineContainer}>
      {filteredPhotos.map((photo, index) => {
        const { intro } = splitDescription(photo.description);
        const isMobile = window.innerWidth <= 768;
        
        return (
          <div key={index} style={{
            ...styles.card,
            padding: '20px',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : (index % 2 === 0 ? 'row' : 'row-reverse'),
              gap: '30px',
            }}>
              <div style={{
                flex: '1',
                ...styles.timelineImageContainer,
              }}>
                <img
                  src={getImageSrc(photo)}
                  alt={`Image de ${photo.titre}`}
                  style={{
                    ...styles.image,
                    transform: `translate(-50%, -50%) translate(${imagePositions[index]?.x || 0}px, ${imagePositions[index]?.y || 0}px)`,
                  }}
                  onMouseDown={(e) => handleMouseDown(index, e)}
                  onTouchStart={(e) => handleTouchStart(index, e)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/image_indispo.png';
                  }}
                />
                {/* Bouton de zoom stylisé */}
                <button 
                  style={{
                    ...styles.zoomButton,
                    transform: `scale(${draggingImage === index ? '0.9' : '1'})`,
                  }}
                  onClick={(e) => handleZoomImage(index, e)}
                  title={('Agrandir l\'image')}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = `scale(${draggingImage === index ? '0.9' : '1'})`}
                >
                  <span>🔍</span>
                </button>
                {/* Bouton de réinitialisation de position */}
                <button 
                  style={styles.resetButton}
                  onClick={(e) => resetImagePosition(index, e)}
                  title={('Réinitialiser la position')}
                >
                  <span>↺</span>
                </button>
              </div>
              <div style={{
                flex: '1',
                ...styles.timelineContent,
              }}>
                <h3 style={styles.timelineTitle}>{photo.titre}</h3>
                <p style={styles.timelineDescription}>
                  {expandedDescriptions[index] ? photo.description : intro}
                </p>
                {photo.description && photo.description.length > 250 && (
                  <button
                    onClick={() => toggleDescription(index)}
                    style={styles.readMoreButton}
                  >
                    {expandedDescriptions[index] ? 'Voir moins' : 'Voir plus'} {expandedDescriptions[index] ? '↑' : '↓'}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div style={styles.container}>
      {/* En-tête avec titre bien visible */}
      <div style={{ ...styles.header, backgroundColor: '#1C1C47' }}>
  <div style={styles.headerContent}>
    <h1 style={{ ...styles.title, paddingTop: '80px', color: '#f0f0f0' }}> {/* Augmenter le padding-top pour plus d'espacement */}
      {t('Phototheque')}
    </h1>
    <p style={{ ...styles.subtitle, color: '#d1d1d1' }}>
    {t('Découvrez notre collection de photos illustrant les activités et événements de notre fondation')}
    </p>
  </div>
</div>
      <div style={styles.content}>
        {/* Barre d'outils simplifiée avec uniquement la recherche */}
        <div style={styles.toolbar}>
          <div style={styles.searchContainer}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder={t('Rechercher des photos...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          <div style={styles.viewModeContainer}>
            <button
              onClick={() => setViewMode("grid")}
              style={{
                ...styles.viewModeButton,
                ...(viewMode === "grid" ? styles.activeViewMode : {})
              }}
              title={('Vue grille')}
            >
              {/* Icône grille */}
              <span style={{ fontSize: '18px' }}>⊞</span>
            </button>
            <button
              onClick={() => setViewMode("timeline")}
              style={{
                ...styles.viewModeButton,
                ...(viewMode === "timeline" ? styles.activeViewMode : {})
              }}
              title={('Vue chronologique')}
            >
              {/* Icône chronologique */}
              <span style={{ fontSize: '18px' }}>≡</span>
            </button>
          </div>
        </div>

        {/* Contenu principal */}
        {loading ? renderLoadingContent() :
          error ? renderErrorContent() :
          filteredPhotos.length === 0 ? renderNoResultsContent() :
          viewMode === "grid" ? renderGridView() : renderTimelineView()}
          
        {/* Modal pour l'image zoomée */}
        {zoomedImage !== null && (
          <div 
            style={styles.zoomedImageOverlay}
            onClick={closeZoomedImage}
          >
            <div 
              style={styles.zoomedImageContainer}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getImageSrc(photos[zoomedImage])}
                alt={`Image de ${photos[zoomedImage].titre}`}
                style={styles.zoomedImage}
              />
              <button 
                style={styles.closeZoomButton}
                onClick={closeZoomedImage}
                title={('Fermer')}
              >
                ✖
              </button>
              <div style={styles.imageInfo}>
                <h3 style={styles.imageTitle}>{photos[zoomedImage].titre}</h3>
                {photos[zoomedImage].description && (
                  <p style={styles.imageDescription}>{photos[zoomedImage].description}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="fixed bottom-6 right-6 z-50">
        <ChatBotNew />
      </div>
    </div>
  );
};

export default Phototheque;
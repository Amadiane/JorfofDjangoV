// //A rendre responsive
// import React, { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import ChatBotNew from "../ChatBot/ChatbotNew";
// import CONFIG from "../../config/config.js";
// import CloudImage from "../CloudImage"; // ✅ composant Cloudinary

// const Phototheque = () => {
//   const apiUrl = CONFIG.BASE_URL;
//   const { t } = useTranslation();
//   const [photos, setPhotos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [draggingImage, setDraggingImage] = useState(null);
//   const [imagePositions, setImagePositions] = useState({});
//   const [expandedDescriptions, setExpandedDescriptions] = useState({});
//   const [searchTerm, setSearchTerm] = useState("");
//   const [viewMode, setViewMode] = useState("grid");
//   const [zoomedImage, setZoomedImage] = useState(null);

//   useEffect(() => {
//     const fetchPhotos = async () => {
//       try {
//         const response = await fetch(CONFIG.API_PHOTO_LIST);
//         if (!response.ok) throw new Error("Erreur lors du chargement des données.");
//         const data = await response.json();
//         const initialPositions = {};
//         data.forEach((item, index) => {
//           initialPositions[index] = { x: 0, y: 0 };
//         });
//         setImagePositions(initialPositions);
//         setPhotos(data);
//       } catch (err) {
//         console.error("Erreur de fetch:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPhotos();
//   }, []);

//   const filteredPhotos = photos.filter(photo => {
//     const matchesSearch =
//       searchTerm === "" ||
//       photo.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (photo.description && photo.description.toLowerCase().includes(searchTerm.toLowerCase()));
//     return matchesSearch;
//   });

//   const handleMouseDown = (index, e) => {
//     if (zoomedImage !== null) return;
//     setDraggingImage(index);
//     e.preventDefault();
//   };

//   const handleTouchStart = (index, e) => {
//     if (zoomedImage !== null) return;
//     setDraggingImage(index);
//   };

//   const handleMouseMove = (e) => {
//     if (draggingImage !== null) {
//       e.preventDefault();
//       setImagePositions(prev => ({
//         ...prev,
//         [draggingImage]: {
//           x: (prev[draggingImage]?.x || 0) + e.movementX,
//           y: (prev[draggingImage]?.y || 0) + e.movementY
//         }
//       }));
//     }
//   };

//   const handleTouchMove = (e) => {
//     if (draggingImage !== null && e.touches && e.touches[0]) {
//       const touch = e.touches[0];
//       const previousTouch = e.target.previousTouch || { clientX: touch.clientX, clientY: touch.clientY };
//       const movementX = touch.clientX - previousTouch.clientX;
//       const movementY = touch.clientY - previousTouch.clientY;
//       e.target.previousTouch = { clientX: touch.clientX, clientY: touch.clientY };
//       setImagePositions(prev => ({
//         ...prev,
//         [draggingImage]: {
//           x: (prev[draggingImage]?.x || 0) + movementX,
//           y: (prev[draggingImage]?.y || 0) + movementY
//         }
//       }));
//     }
//   };

//   const handleMouseUp = () => setDraggingImage(null);
//   const handleTouchEnd = () => setDraggingImage(null);
//   const resetImagePosition = (index, e) => {
//     e && e.stopPropagation();
//     setImagePositions(prev => ({ ...prev, [index]: { x: 0, y: 0 } }));
//   };
//   const toggleDescription = (index) => setExpandedDescriptions(prev => ({ ...prev, [index]: !prev[index] }));
//   const handleZoomImage = (index, e) => { e && e.stopPropagation(); setZoomedImage(zoomedImage === index ? null : index); };
//   const closeZoomedImage = () => setZoomedImage(null);

//   useEffect(() => {
//     if (draggingImage !== null) {
//       window.addEventListener('mousemove', handleMouseMove);
//       window.addEventListener('mouseup', handleMouseUp);
//       window.addEventListener('touchmove', handleTouchMove);
//       window.addEventListener('touchend', handleTouchEnd);
//     }
//     const handleEscKey = (e) => e.key === 'Escape' && closeZoomedImage();
//     if (zoomedImage !== null) document.addEventListener('keydown', handleEscKey);
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mouseup', handleMouseUp);
//       window.removeEventListener('touchmove', handleTouchMove);
//       window.removeEventListener('touchend', handleTouchEnd);
//       document.removeEventListener('keydown', handleEscKey);
//     };
//   }, [draggingImage, zoomedImage]);

//   // ✅ Cloudinary + local logic
// const getImageSrc = (photo) => {
//   if (!photo.image) return "/image_indispo.png";

//   if (photo.image.startsWith("http")) {
//     console.log("🔗 URL directe:", photo.image);
//     return photo.image;
//   }

//   const full = `${CONFIG.BASE_URL}${photo.image}`.replace(/([^:]\/)\/+/g, "$1");
//   console.log("🧩 URL complétée:", full);
//   return full;
// };



//   // ✅ Composant pour image (Cloudinary ou locale)
//   const renderImage = (photo, index, style) => {
//     const imageUrl = getImageSrc(photo);
//     const isCloudinary = imageUrl.includes("res.cloudinary.com");

//     return isCloudinary ? (
//       <CloudImage
//         publicId={photo.cloudinary_id || photo.image.split("/").pop().split(".")[0]}
//         width={400}
//         height={300}
//       />
//     ) : (
//       <img
//         src={imageUrl}
//         alt={photo.titre}
//         style={{
//           ...style,
//           transform: `translate(-50%, -50%) translate(${imagePositions[index]?.x || 0}px, ${imagePositions[index]?.y || 0}px)`
//         }}
//         onMouseDown={(e) => handleMouseDown(index, e)}
//         onTouchStart={(e) => handleTouchStart(index, e)}
//         onError={(e) => (e.target.src = "/image_indispo.png")}
//       />
//     );
//   };

//   // 🖼️ rendu principal (grille ou timeline)
//   const renderGridView = () => (
//     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
//       {filteredPhotos.map((photo, index) => (
//         <div key={index} style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
//           <div style={{ position: 'relative', width: '100%', paddingTop: '66%', backgroundColor: '#f0f0f0', overflow: 'hidden' }}>
//             {renderImage(photo, index, {
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               width: 'auto',
//               height: 'auto',
//               maxWidth: '90%',
//               maxHeight: '90%',
//               objectFit: 'contain',
//               cursor: 'grab',
//               transition: 'transform 0.2s ease',
//             })}
//           </div>
//           <div style={{ padding: '20px' }}>
//             <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>{photo.titre}</h3>
//             <p style={{ fontSize: '15px', color: '#636e72' }}>
//               {expandedDescriptions[index] ? photo.description : (photo.description || '').slice(0, 150) + '...'}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
//       <div style={{ backgroundColor: '#1C1C47', color: 'white', padding: '25px 0', textAlign: 'center' }}>
//         <h1>{t('Phototheque')}</h1>
//         <p>{t('Découvrez notre collection de photos illustrant les activités et événements de notre fondation')}</p>
//       </div>

//       <div style={{ padding: '20px' }}>
//         {loading ? <p>Chargement...</p> :
//           error ? <p style={{ color: 'red' }}>{error}</p> :
//             filteredPhotos.length === 0 ? <p>Aucune photo trouvée</p> :
//               renderGridView()}
//       </div>

//       {zoomedImage !== null && (
//         <div
//           style={{
//             position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
//             backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex',
//             justifyContent: 'center', alignItems: 'center', zIndex: 1000
//           }}
//           onClick={closeZoomedImage}
//         >
//           <div style={{ position: 'relative' }}>
//             {renderImage(photos[zoomedImage], zoomedImage, { maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' })}
//             <button
//               onClick={closeZoomedImage}
//               style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', color: 'white', fontSize: '24px', border: 'none', cursor: 'pointer' }}
//             >
//               ✖
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="fixed bottom-6 right-6 z-50">
//         <ChatBotNew />
//       </div>
//     </div>
//   );
// };

// export default Phototheque;




















import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ChatBotNew from "../ChatBot/ChatbotNew";
import CONFIG from "../../config/config.js";
import CloudImage from "../CloudImage"; // Optionnel si tu veux Cloudinary auto-format

const Phototheque = () => {
  const { t } = useTranslation();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);

  // 🟢 Charger les photos depuis Django
  const fetchPhotos = async () => {
    try {
      setRefreshing(true);
      const response = await fetch(CONFIG.API_PHOTO_LIST);
      if (!response.ok) throw new Error("Erreur de chargement des photos.");
      const data = await response.json();
      setPhotos(data);
      setError("");
    } catch (err) {
      console.error("Erreur :", err);
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  // 🔍 Recherche locale
  const filteredPhotos = photos.filter((photo) => {
    const term = searchTerm.toLowerCase();
    return (
      photo.title_fr?.toLowerCase().includes(term) ||
      photo.comment_fr?.toLowerCase().includes(term)
    );
  });

  // 🧩 Gestion de l'image (Cloudinary ou locale)
  const getImageSrc = (photo) => {
    if (!photo.image) return "/image_indispo.png";
    return photo.image.startsWith("http")
      ? photo.image
      : `${CONFIG.BASE_URL}${photo.image}`;
  };

  // 🎨 Style principal (reprend le design du code commenté)
  const styles = {
    page: {
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      backgroundColor: '#1C1C47',
      color: 'white',
      padding: '40px 20px',
      textAlign: 'center',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '700',
      marginBottom: '10px',
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#ddd',
      maxWidth: '700px',
      margin: '0 auto',
    },
    searchBar: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      margin: '30px auto',
      flexWrap: 'wrap',
      width: '90%',
      maxWidth: '800px',
    },
    input: {
      padding: '12px',
      width: '60%',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    refreshButton: {
      backgroundColor: '#1C1C47',
      color: 'white',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '25px',
      padding: '0 20px 60px',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
    },
    cardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
    },
    image: {
      width: '100%',
      height: '230px',
      objectFit: 'cover',
      transition: 'transform 0.3s ease',
    },
    content: {
      padding: '18px',
    },
    titleCard: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '8px',
    },
    desc: {
      fontSize: '15px',
      color: '#636e72',
      lineHeight: '1.4',
    },
    zoomContainer: {
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    zoomImage: {
      maxWidth: '90%',
      maxHeight: '90%',
      objectFit: 'contain',
    },
    closeButton: {
      position: 'absolute',
      top: '20px',
      right: '30px',
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: '28px',
      cursor: 'pointer',
    },
  };

  // ✅ Rendu principal
  return (
    <div style={styles.page}>
              {/* HEADER */}
        <div
          style={{
            backgroundColor: '#1C1C47',
            color: 'white',
            padding: '120px 20px', // 🟢 Plus de hauteur POUR POUSSER LE TITRE VERS LE BAS
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px', // 🟢 Hauteur minimale
          }}
        >
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
            {t('Photothèque')}
          </h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '700px', lineHeight: '1.5' }}>
            {t('Découvrez notre collection de photos illustrant les activités et événements de notre fondation')}
          </p>
        </div>


      {/* BARRE DE RECHERCHE */}
      <div style={styles.searchBar}>
        <input
          type="text"
          placeholder="🔍 Rechercher une photo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />
        <button
          onClick={fetchPhotos}
          style={{
            ...styles.refreshButton,
            opacity: refreshing ? 0.6 : 1,
          }}
          disabled={refreshing}
        >
          {refreshing ? "Rafraîchissement..." : "🔄 Rafraîchir"}
        </button>
      </div>

      {/* CONTENU */}
      {loading ? (
        <p style={{ textAlign: 'center' }}>Chargement...</p>
      ) : error ? (
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      ) : filteredPhotos.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Aucune photo trouvée</p>
      ) : (
        <div style={styles.grid}>
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id || index}
              style={styles.card}
              onClick={() => setZoomedImage(getImageSrc(photo))}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = styles.cardHover.transform)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "none")
              }
            >
              <img
                src={getImageSrc(photo)}
                alt={photo.title_fr}
                style={styles.image}
                onError={(e) => (e.target.src = "/image_indispo.png")}
              />
              <div style={styles.content}>
                <h3 style={styles.titleCard}>{photo.title_fr}</h3>
                <p style={styles.desc}>
                  {(photo.comment_fr || "").slice(0, 150)}...
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ZOOM IMAGE */}
      {zoomedImage && (
        <div style={styles.zoomContainer} onClick={() => setZoomedImage(null)}>
          <img src={zoomedImage} alt="Zoomed" style={styles.zoomImage} />
          <button
            onClick={() => setZoomedImage(null)}
            style={styles.closeButton}
          >
            ✖
          </button>
        </div>
      )}

      {/* CHATBOT */}
      <div className="fixed bottom-6 right-6 z-50">
        <ChatBotNew />
      </div>
    </div>
  );
};

export default Phototheque;

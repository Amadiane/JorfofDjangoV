///A rendre responsive


import React, { useEffect, useState } from 'react';

const MotPresident = () => {
  const [motPresidents, setMotPresidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [draggingImage, setDraggingImage] = useState(null);
  const [imagePositions, setImagePositions] = useState({});
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    const fetchMotPresidents = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/mot-president/");
        if (!response.ok) throw new Error("Erreur lors du chargement des données.");
        const data = await response.json();

        const initialPositions = {};
        data.forEach((item, index) => {
          initialPositions[index] = { x: 0, y: 0 };
        });
        setImagePositions(initialPositions);

        setMotPresidents(data);
      } catch (err) {
        console.error("Erreur de fetch:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMotPresidents();
  }, []);

  const handleMouseDown = (index, e) => {
    setDraggingImage(index);
    e.preventDefault();
  };

  const handleTouchStart = (index, e) => {
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

  useEffect(() => {
    if (draggingImage !== null) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [draggingImage]);

  const getImageSrc = (motPresident) => {
    let imageUrl = '/image_indispo.png';
    if (motPresident.image) {
      if (motPresident.image.startsWith("http")) {
        imageUrl = motPresident.image;
      } else {
        imageUrl = `http://127.0.0.1:8000${motPresident.image}`;
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

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '20px',
    backgroundColor: '#f4f7f6',
    minHeight: '100vh',
  };

  const contentStyle = {
    width: '100%',
    maxWidth: '1200px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
  };

  const messageItemStyle = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    overflow: 'visible',
    marginBottom: '50px',
  };

  const titleStyle = {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#1C1C47',
    fontWeight: '700',
    textAlign: 'center',
  };

  const textStyle = {
    fontSize: '16px',
    color: '#555',
    lineHeight: '1.8',
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 style={{...titleStyle, fontSize: '32px', marginBottom: '30px'}}>Messages du Président</h1>
        
        {loading && <p style={{ textAlign: 'center', fontSize: '18px' }}>Chargement des messages du président...</p>}
        
        {error && (
          <div style={{ color: 'red', textAlign: 'center', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', marginBottom: '20px' }}>
            <p style={{ fontSize: '18px', marginBottom: '10px' }}><strong>Erreur:</strong> {error}</p>
            <p>Vérifiez que votre serveur Django est bien lancé sur http://127.0.0.1:8000</p>
          </div>
        )}

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '50px',
        }}>
          {motPresidents.length > 0 ? motPresidents.map((motPresident, index) => {
            const { intro, main } = splitDescription(motPresident.description);
            const isMobile = window.innerWidth <= 768;
            
            return (
              <div key={index} style={messageItemStyle}>
                <div style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : (index % 2 === 0 ? 'row' : 'row-reverse'),
                  marginBottom: '15px',
                }}>
                  <div style={{
                    width: isMobile ? '100%' : '45%',
                    position: 'relative',
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                    minHeight: isMobile ? '200px' : '300px',
                    borderRadius: '12px',
                    margin: isMobile ? '0 0 15px 0' : '0 15px',
                  }}>
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <img
                        src={getImageSrc(motPresident)}
                        alt={`Image de ${motPresident.titre}`}
                        style={{
                          maxWidth: '100%',
                          maxHeight: isMobile ? '200px' : '300px',
                          objectFit: 'contain',
                          cursor: draggingImage === index ? 'grabbing' : 'grab',
                          position: 'relative',
                          transform: `translate(${imagePositions[index]?.x || 0}px, ${imagePositions[index]?.y || 0}px)`,
                          transition: draggingImage === index ? 'none' : 'transform 0.2s ease',
                          userSelect: 'none',
                          zIndex: draggingImage === index ? 10 : 1,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          borderRadius: '8px',
                        }}
                        onMouseDown={(e) => handleMouseDown(index, e)}
                        onTouchStart={(e) => handleTouchStart(index, e)}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/image_indispo.png';
                        }}
                      />
                      {(imagePositions[index]?.x !== 0 || imagePositions[index]?.y !== 0) && (
                        <button
                          onClick={(e) => resetImagePosition(index, e)}
                          style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px',
                            backgroundColor: '#1C1C47',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '5px 10px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            zIndex: 5,
                          }}
                        >
                          Réinitialiser
                        </button>
                      )}
                    </div>
                    {draggingImage === index && (
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        zIndex: 11,
                      }}>
                        Déplacement en cours...
                      </div>
                    )}
                  </div>
                  
                  <div style={{
                    width: isMobile ? '100%' : '55%',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}>
                    <h2 style={titleStyle}>{motPresident.titre}</h2>
                    <p style={textStyle}>
                      {isMobile ? (expandedDescriptions[index] ? motPresident.description : intro) : intro}
                    </p>
                    
                    {isMobile && motPresident.description && motPresident.description.length > 150 && (
                      <button
                        onClick={() => toggleDescription(index)}
                        style={{
                          backgroundColor: '#1C1C47',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '8px 15px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          marginTop: '15px',
                          alignSelf: 'flex-start',
                        }}
                      >
                        {expandedDescriptions[index] ? 'Voir moins' : 'Voir plus'}
                      </button>
                    )}
                  </div>
                </div>

                {!isMobile && main && (
                  <div style={{
                    padding: '0 30px 30px 30px',
                  }}>
                    <p style={textStyle}>{main}</p>
                  </div>
                )}
              </div>
            );
          }) : !loading && (
            <div style={{ textAlign: 'center', padding: '30px' }}>
              <p>Aucun message du président trouvé. Veuillez en ajouter dans votre système.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MotPresident;
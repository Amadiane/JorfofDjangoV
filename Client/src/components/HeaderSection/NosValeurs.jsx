//A rendre responsive
import React, { useEffect, useState } from 'react';

const NosValeurs = () => {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [draggingImage, setDraggingImage] = useState(null);
  const [imagePositions, setImagePositions] = useState({});

  useEffect(() => {
    const fetchValues = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/valeurs/");
        if (!response.ok) throw new Error("Erreur lors du chargement des données.");
        const data = await response.json();

        const initialPositions = {};
        data.forEach((item, index) => {
          initialPositions[index] = { x: 0, y: 0 };
        });
        setImagePositions(initialPositions);

        setValues(data);
      } catch (err) {
        console.error("Erreur de fetch:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchValues();
  }, []);

  const handleMouseDown = (index, e) => {
    setDraggingImage(index);
  };

  const handleMouseMove = (e) => {
    if (draggingImage !== null) {
      e.preventDefault();
      setImagePositions(prev => ({
        ...prev,
        [draggingImage]: {
          x: prev[draggingImage].x + e.movementX,
          y: prev[draggingImage].y + e.movementY
        }
      }));
    }
  };

  const handleMouseUp = () => {
    setDraggingImage(null);
  };

  useEffect(() => {
    if (draggingImage !== null) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingImage]);

  const getImageSrc = (valeur) => {
    let imageUrl = '/image_indispo.png';
    if (valeur.image) {
      if (valeur.image.startsWith("http")) {
        imageUrl = valeur.image;
      } else {
        imageUrl = `http://127.0.0.1:8000${valeur.image}`;
      }
    }
    return imageUrl;
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      padding: '40px',
      backgroundColor: '#f4f7f6',
      minHeight: '100vh',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
      }}>
      

        {loading && <p style={{ textAlign: 'center', fontSize: '18px' }}>Chargement des valeurs...</p>}
        {error && (
          <div style={{ color: 'red', textAlign: 'center', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', marginBottom: '20px' }}>
            <p style={{ fontSize: '18px', marginBottom: '10px' }}><strong>Erreur:</strong> {error}</p>
            <p>Vérifiez que votre serveur Django est bien lancé sur http://127.0.0.1:8000</p>
          </div>
        )}

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
        }}>
          {values.length > 0 ? values.map((valeur, index) => (
            <div key={index} style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
            }}>
              <div style={{
                width: '40%',
                position: 'relative',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                overflow: 'hidden',
              }}>
                <img
                  src={getImageSrc(valeur)}
                  alt={`Image de ${valeur.titre}`}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    objectFit: 'contain',
                    cursor: 'grab',
                    position: 'relative',
                    transform: `translate(${imagePositions[index]?.x || 0}px, ${imagePositions[index]?.y || 0}px)`,
                    transition: draggingImage === index ? 'none' : 'transform 0.2s ease',
                    userSelect: 'none',
                  }}
                  onMouseDown={(e) => handleMouseDown(index, e)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/image_indispo.png';
                  }}
                />
                {draggingImage === index && (
                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    fontSize: '12px',
                  }}>
                    Déplacement en cours...
                  </div>
                )}
              </div>
              <div style={{
                width: '60%',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
                <h2 style={{
                  fontSize: '36px',
                  marginBottom: '15px',
                  color: '#1C1C47',
                  borderLeft: '4px solid #1C1C47',
                  paddingLeft: '15px',
                  fontWeight: '600',
                }}>{valeur.titre}</h2>
                <p style={{
                  fontSize: '18px',
                  color: '#555',
                  lineHeight: '1.6',
                }}>{valeur.description}</p>
              </div>
            </div>
          )) : !loading && (
            <div style={{ textAlign: 'center', padding: '30px' }}>
              <p>Aucune valeur trouvée. Veuillez ajouter des valeurs dans votre système.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NosValeurs;

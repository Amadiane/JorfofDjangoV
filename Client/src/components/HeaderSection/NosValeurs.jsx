import React, { useEffect, useState } from 'react';

const NosValeurs = () => {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState([]);

  useEffect(() => {
    const fetchValues = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/valeurs/");
        if (!response.ok) throw new Error("Erreur lors du chargement des données.");
        const data = await response.json();
        
        // Débogage: afficher les données reçues
        console.log("Données reçues de l'API:", data);
        
        // Stocker les données pour le débogage dans l'interface
        const debugData = data.map(item => ({
          titre: item.titre,
          imageUrl: item.image || "Non définie"
        }));
        setDebugInfo(debugData);
        
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

  const getImageSrc = (valeur) => {
    let imageUrl = '/image_indispo.png'; // Image par défaut
    
    // Vérifie si l'API renvoie une image valide
    if (valeur.image) {
      // CORRECTION: Évitez de doubler les chemins
      if (valeur.image.startsWith("http")) {
        imageUrl = valeur.image;
      } else {
        imageUrl = `http://127.0.0.1:8000${valeur.image}`;
      }
    }
    
    console.log(`URL d'image pour ${valeur.titre}:`, imageUrl);
    
    return imageUrl;
  };

  // Fonction pour tester directement une URL d'image
  const testImageUrl = (url) => {
    if (!url || url === '/image_indispo.png') return false;
    
    const img = new Image();
    img.src = url;
    return true;
  };

  return (
    <div className="valeurs-container" style={{
      margin: '20px',
      padding: '40px',
      backgroundColor: '#f4f7f6',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      minHeight: '100vh',
    }}>
      <h1 style={{
        fontSize: '48px',
        marginBottom: '40px',
        textAlign: 'center',
        color: '#333',
        borderBottom: '2px solid #1C1C47',
        paddingBottom: '15px',
        fontWeight: '700',
      }}>Nos Valeurs</h1>

      {loading && <p style={{ textAlign: 'center', fontSize: '18px' }}>Chargement des valeurs...</p>}
      {error && (
        <div style={{ color: 'red', textAlign: 'center', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', marginBottom: '20px' }}>
          <p style={{ fontSize: '18px', marginBottom: '10px' }}><strong>Erreur:</strong> {error}</p>
          <p>Vérifiez que votre serveur Django est bien lancé sur http://127.0.0.1:8000</p>
        </div>
      )}

      {debugInfo.length > 0 && (
        <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#fff', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '10px', color: '#1C1C47' }}>Informations de débogage</h3>
          <ul style={{ listStyleType: 'none', padding: '0' }}>
            {debugInfo.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '8px', paddingBottom: '8px', borderBottom: '1px solid #eee' }}>
                <strong>{item.titre}:</strong> {item.imageUrl}
                {item.imageUrl !== "Non définie" && (
                  <span style={{ marginLeft: '10px', color: testImageUrl(item.imageUrl) ? 'green' : 'red' }}>
                    {testImageUrl(item.imageUrl) ? '✓' : '✗'}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
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
            }}>
              <img
                src={getImageSrc(valeur)}
                alt={`Image de ${valeur.titre}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '300px',
                  objectFit: 'contain',
                }}
                onError={(e) => {
                  console.error(`Erreur de chargement d'image pour ${valeur.titre}`);
                  e.target.onerror = null;
                  e.target.src = '/image_indispo.png';
                }}
              />
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
  );
};

export default NosValeurs;

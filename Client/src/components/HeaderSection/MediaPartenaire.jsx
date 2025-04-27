import React, { useEffect, useState } from "react";

const MediaPartenaire = () => {
  const [partenaires, setPartenaires] = useState([]);

  useEffect(() => {
    const fetchPartenaires = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/partenaires/");
        if (!response.ok) throw new Error("Erreur lors du chargement");
        const data = await response.json();
        setPartenaires(data);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchPartenaires();
  }, []);

  return (
    <div style={{
      padding: '5vw 4vw',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      boxSizing: 'border-box'
    }}>
      <h1 style={{
        textAlign: 'center',
        fontSize: '8vw',
        fontWeight: '700',
        marginBottom: '8vw',
        color: '#1C1C47'
      }}>
        Nos Partenaires
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {partenaires.map((partenaire, index) => (
          <div key={index} style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box'
          }}>
            {partenaire.couverture && (
              <img
                src={partenaire.couverture}
                alt={`Image de ${partenaire.titre}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '15px'
                }}
              />
            )}

            <h2 style={{
              fontSize: '5vw',
              color: '#1C1C47',
              marginBottom: '10px',
              textAlign: 'center'
            }}>{partenaire.titre}</h2>

            <p style={{
              fontSize: '4vw',
              color: '#333',
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              {partenaire.description}
            </p>

            {partenaire.site_url && (
              <a
                href={partenaire.site_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: 'none',
                  color: '#fff',
                  backgroundColor: '#1C1C47',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: '4vw',
                  display: 'block',
                  marginTop: 'auto'
                }}
              >
                Visiter le site
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaPartenaire;

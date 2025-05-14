import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const NosValeurs = () => {
  const { i18n, t } = useTranslation(); // Using useTranslation for language management
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [draggingImage, setDraggingImage] = useState(null);
  const [imagePositions, setImagePositions] = useState({});

  useEffect(() => {
    const fetchValues = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/valeurs/");
        if (!response.ok) throw new Error(t('errors.loading_data'));
        const data = await response.json();

        const initialPositions = {};
        data.forEach((item, index) => {
          initialPositions[index] = { x: 0, y: 0 };
        });
        setImagePositions(initialPositions);

        setValues(data);
      } catch (err) {
        console.error(t('errors.fetch_error'), err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchValues();
  }, [t]);

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
    <div className="flex justify-center items-center flex-col p-4 md:p-10 bg-gray-100 min-h-screen">
      <div className="w-full max-w-6xl bg-white p-4 md:p-10 rounded-lg shadow-lg">
        {/* <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-blue-900">
          {t('nos_valeurs.title')}
        </h1> */}

        {loading && <p className="text-center text-lg">{t('common.loading')}</p>}
        {error && (
          <div className="text-red-600 text-center p-5 bg-white rounded-lg mb-5">
            <p className="text-lg mb-2"><strong>{t('common.error')}:</strong> {error}</p>
            <p>{t('errors.check_server')}</p>
          </div>
        )}

        <div className="flex flex-col gap-8">
          {values.length > 0 ? values.map((valeur, index) => (
            <div key={index} className={`bg-white rounded-lg shadow-md overflow-hidden flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className="w-full md:w-2/5 relative bg-gray-100 flex justify-center items-center p-4 overflow-hidden">
                <img
                  src={getImageSrc(valeur)}
                  alt={`${t('nos_valeurs.image_of')} ${valeur[`titre_${i18n.language}`] || valeur.titre}`}
                  className="max-w-full max-h-72 object-contain cursor-grab select-none"
                  style={{
                    transform: `translate(${imagePositions[index]?.x || 0}px, ${imagePositions[index]?.y || 0}px)`,
                    transition: draggingImage === index ? 'none' : 'transform 0.2s ease',
                  }}
                  onMouseDown={(e) => handleMouseDown(index, e)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/image_indispo.png';
                  }}
                />
                {draggingImage === index && (
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white p-1 px-2 rounded text-xs">
                    {t('nos_valeurs.moving')}
                  </div>
                )}
              </div>
              <div className="w-full md:w-3/5 p-4 md:p-8 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl mb-4 text-blue-900 border-l-4 border-blue-900 pl-3 font-semibold">
                  {valeur[`titre_${i18n.language}`] || valeur.titre || t('common.title_unavailable')}
                </h2>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  {valeur[`description_${i18n.language}`] || valeur.description || t('common.description_unavailable')}
                </p>
              </div>
            </div>
          )) : !loading && (
            <div className="text-center py-8">
              <p>{t('nos_valeurs.no_values')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NosValeurs;
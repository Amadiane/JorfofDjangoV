import React, { useState, useEffect } from 'react';
import { Video, Search, RefreshCw, AlertCircle, X, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ChatBotNew from "../ChatBot/ChatbotNew";

const Videotheque = () => {
  const { t } = useTranslation();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BACKEND;

  useEffect(() => {
    fetchVideos();
  }, []);

  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getEmbedUrl = (url) => {
    const videoId = getYoutubeId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiUrl + "/api/add-video/"); //(apiUrl + "/api/programmes/");
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setVideos(data);
        setError(null);
      } else {
        setError('Les données reçues ne sont pas valides.');
      }
    } catch (err) {
      setError('Erreur de chargement des vidéos');
      console.error('Erreur API:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredVideos = videos.filter(video => 
    video.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    setTimeout(() => {
      const videoPlayerElement = document.getElementById('video-player-section');
      if (videoPlayerElement) {
        videoPlayerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handlePlayVideo = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && showModal) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [showModal]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* En-tête avec barre de recherche - style centré inspiré de Partner */}
      <header className="bg-gradient-to-r from-[#1C1C47] to-[#12138B] text-white py-4 px-4 md:py-8 lg:py-12 shadow-md">
        <div className="max-w-7xl mx-auto pt-16 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 flex items-center justify-center">
            <Video className="mr-3 text-white" />
            {t('Vidéothèque')}
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg opacity-90 mb-8">
            {t('Découvrez notre collection de vidéos éducatives pour enrichir votre expérience d\'apprentissage.')}
          </p>
          
          {/* Barre de recherche centré en position responsive */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
            <div className="relative w-full sm:flex-grow">
              <input
                type="text"
                placeholder={t('Rechercher une vidéo...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
            </div>
            
            <button 
              onClick={fetchVideos}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center transition-colors duration-200"
            >
              <RefreshCw size={18} className="mr-2" />
              <span>{t('Actualiser')}</span>
            </button>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Vidéo sélectionnée */}
        {selectedVideo && (
          <div id="video-player-section" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 px-2">{selectedVideo.titre}</h2>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <iframe 
                  src={getEmbedUrl(selectedVideo.lien)}
                  title={selectedVideo.titre}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <h3 className="text-lg font-medium text-gray-800">{selectedVideo.titre}</h3>
                  <button
                    onClick={() => handlePlayVideo(selectedVideo)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded flex items-center"
                  >
                    <Play size={16} className="mr-1" />
                    {t('Plein écran')}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border-b border-gray-200 my-8"></div>
          </div>
        )}

        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Video className="mr-2 text-blue-600" />
          {selectedVideo ? t("Autres vidéos") : t("Toutes les vidéos")}
        </h3>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600 font-medium">{t('Chargement des vidéos...')}</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="text-red-500 mr-3" />
              <p className="text-red-700">{error}</p>
            </div>
            <button 
              onClick={fetchVideos} 
              className="mt-4 text-red-600 hover:text-red-800 font-medium flex items-center"
            >
              <RefreshCw size={16} className="mr-1" />
              {t('Réessayer')}
            </button>
          </div>
        ) : (
          <>
            {/* Grille de vidéos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredVideos.length > 0 ? (
                filteredVideos.map((video) => (
                  <div
                    key={video.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-medium text-gray-800 line-clamp-2 min-h-[3rem]">{video.titre}</h3>
                    </div>
                    
                    <div className="relative group cursor-pointer" onClick={() => handleVideoSelect(video)}>
                      <img
                        src={video.couverture}
                        alt={video.titre}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <div className="bg-white bg-opacity-90 text-blue-600 p-3 rounded-full">
                          <Play size={24} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-2">
                      <button 
                        onClick={() => handleVideoSelect(video)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center w-full sm:w-auto justify-center sm:justify-start"
                      >
                        {t('Voir la vidéo')}
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayVideo(video);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded flex items-center w-full sm:w-auto justify-center"
                      >
                        <Play size={14} className="mr-1" />
                        {t('Plein écran')}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500">
                  <Search size={48} className="mb-4 opacity-30" />
                  {searchTerm ? (
                    <>
                      <p className="text-lg font-medium mb-2">{t('Aucun résultat trouvé pour ')}"{searchTerm}"</p>
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="text-blue-600 hover:text-blue-800 font-medium mt-2"
                      >
                        {t('Effacer la recherche')}
                      </button>
                    </>
                  ) : (
                    <p className="text-lg font-medium">{t('Aucune vidéo disponible.')}</p>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Modal vidéo */}
      {showModal && selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl p-4 sm:p-6 relative">
            <button onClick={closeModal} className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-600 hover:text-gray-800 bg-white rounded-full p-1">
              <X size={20} />
            </button>
            <div className="aspect-w-16 aspect-h-9 w-full">
              <iframe
                src={getEmbedUrl(selectedVideo.lien)}
                title={selectedVideo.titre}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-gray-800">{selectedVideo.titre}</h3>
              <p className="text-gray-600 mt-2">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer CTA */}
      <div className="bg-white py-16 text-black">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('Explorez notre collection de vidéos')}
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            {t('Découvrez des contenus éducatifs innovants pour enrichir votre expérience d\'apprentissage et développer de nouvelles compétences.')}
          </p>
          <button
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            className="bg-gradient-to-r from-[#1C1C47] to-[#12138B] text-white hover:opacity-90 transition px-8 py-4 rounded-full font-semibold text-lg"
          >
            {t('Découvrir les vidéos')}
          </button>
        </div>
      </div>
      <div className="fixed bottom-6 right-6 z-50">
              <ChatBotNew />
            </div>
    </div>
  );
};

export default Videotheque;
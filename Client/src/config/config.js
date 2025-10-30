// ✅ Détection automatique selon le domaine
const BASE_URL =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:8000"
    : "https://api.jorfofbasketclub.com"; // ton URL backend Render

const CONFIG = {
  BASE_URL,
  API_LOGIN: `/api/login/`,

  // 🖼️ Photothèque
  API_PHOTO_LIST: `${BASE_URL}/api/media/`,
  API_PHOTO_DETAIL: (id) => `${BASE_URL}/api/media/${id}/`,


   // 🎬 Vidéothèque (Cloudinary)
  API_VIDEO_LIST: `${BASE_URL}/api/videos/`,
  API_VIDEO_DETAIL: (id) => `${BASE_URL}/api/videos/${id}/`,
  API_VIDEO_CREATE: `${BASE_URL}/api/videos/`,
  API_VIDEO_UPDATE: (id) => `${BASE_URL}/api/videos/${id}/`,
  API_VIDEO_DELETE: (id) => `${BASE_URL}/api/videos/${id}/`,

  // 📰 News (Cloudinary)
  API_NEWS_LIST: `${BASE_URL}/api/news/`,
  API_NEWS_DETAIL: (id) => `${BASE_URL}/api/news/${id}/`,
  /* optionally */
  API_NEWS_CREATE: `${BASE_URL}/api/news/`,
  API_NEWS_UPDATE: (id) => `${BASE_URL}/api/news/${id}/`,
  API_NEWS_DELETE: (id) => `${BASE_URL}/api/news/${id}/`,


  //Match
  API_MATCH_LIST: `${BASE_URL}/api/matches/`,
  API_MATCH_CREATE: `${BASE_URL}/api/matches/`,
  API_MATCH_UPDATE: (id) => `${BASE_URL}/api/matches/${id}/`,
  API_MATCH_DELETE: (id) => `${BASE_URL}/api/matches/${id}/`,


  // 🤝 Partners
// 🤝 Partners
API_PARTNER_LIST: `${BASE_URL}/api/partners/`,
API_PARTNER_DETAIL: (id) => `${BASE_URL}/api/partners/${id}/`,
API_PARTNER_CREATE: `${BASE_URL}/api/partners/`,
API_PARTNER_UPDATE: (id) => `${BASE_URL}/api/partners/${id}/`,
API_PARTNER_DELETE: (id) => `${BASE_URL}/api/partners/${id}/`,


  // 📸 Dossier media (pour les images directes)
  MEDIA_URL: `${BASE_URL}/media/`,

  CLOUDINARY_NAME: "dwuyq2eoz",
  CLOUDINARY_UPLOAD_PRESET: "default", // 👈 le nom exact de ton preset UNSIGNED
  
  // CLOUDINARY_UPLOAD_PRESET: "ml_default", // 👈 nom exact du preset créé
};

export default CONFIG;





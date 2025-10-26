// ✅ Détection automatique selon le domaine
const BASE_URL =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:8000"
    : "https://jorfofdjangov.onrender.com"; // ton URL backend Render

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

  // 📸 Dossier media (pour les images directes)
  MEDIA_URL: `${BASE_URL}/media/`,

  CLOUDINARY_NAME: "dwuyq2eoz",
};

export default CONFIG;





// const BASE_URL = "http://127.0.0.1:8000"; // ✅ d’abord on la définit ici
// ✅ Détection automatique : local ou production
const BASE_URL =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:8000"
    : "https://jorfofdjangov.onrender.com"; // ton URL Render

const CONFIG = {
  BASE_URL: "http://127.0.0.1:8000", // ton backend local
  API_LOGIN: "/api/login/",

  //   // 🖼️ Photothèque
  API_PHOTO_LIST: `${BASE_URL}/api/media/`,
  API_PHOTO_DETAIL: (id) => `${BASE_URL}/api/media/${id}/`,

  //   // 📸 Images (chemin vers le dossier media)
  MEDIA_URL: BASE_URL.includes("127.0.0.1")
    ? "http://127.0.0.1:8000/media/"
    : "https://jorfofdjangov.onrender.com/media/",

  API_PHOTO_LIST: BASE_URL.includes("127.0.0.1")
    ? "http://127.0.0.1:8000/media/"
    : "https://jorfofdjangov.onrender.com/media/",

  CLOUDINARY_NAME: "dwuyq2eoz", // ⚡ remplace par ton cloud name exact

  

};

export default CONFIG;


// const BASE_URL = "http://127.0.0.1:8000"; // ✅ d’abord on la définit ici
// ✅ Détection automatique : local ou production


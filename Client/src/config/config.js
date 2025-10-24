// // const BASE_URL = "http://127.0.0.1:8000"; // ✅ d’abord on la définit ici
// // ✅ Détection automatique : local ou production
// const BASE_URL =
//   window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
//     ? "http://127.0.0.1:8000"
//     : "https://jorfofdjangov.onrender.com"; // ton URL Render

// const CONFIG = {
//   BASE_URL: "http://127.0.0.1:8000", // ton backend local
//   API_LOGIN: "/api/login/",

//   //   // 🖼️ Photothèque
//   API_PHOTO_LIST: `${BASE_URL}/api/phototheque/`,
//   API_PHOTO_DETAIL: (id) => `${BASE_URL}/api/phototheque/${id}/`,

//   //   // 📸 Images (chemin vers le dossier media)
//   MEDIA_URL: `${BASE_URL}/media/`,
//   API_PHOTO_LIST: `${BASE_URL}/api/media/`,
//   CLOUDINARY_NAME: "dwuyq2eoz", // ⚡ remplace par ton cloud name exact

  

// };

// export default CONFIG;


// const BASE_URL = "http://127.0.0.1:8000"; // ✅ d’abord on la définit ici
// ✅ Détection automatique : local ou production
const BASE_URL =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:8000"
    : "https://jorfofdjangov.onrender.com";

const CONFIG = {
  BASE_URL,
  API_LOGIN: `${BASE_URL}/api/login/`,

  API_PHOTO_LIST: `${BASE_URL}/api/phototheque/`,
  API_PHOTO_DETAIL: (id) => `${BASE_URL}/api/phototheque/${id}/`,

  MEDIA_URL: `${BASE_URL}/media/`, // utile seulement si backend renvoie des chemins relatifs
  CLOUDINARY_NAME: "dwuyq2eoz",
};

export default CONFIG;

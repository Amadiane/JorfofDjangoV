// const BASE_URL =
//   window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
//     ? "http://127.0.0.1:8000"
//     : "https://jorfofdjangov.onrender.com";


// const CONFIG = {
//   BASE_URL,
//   // BASE_URL: "https://jorfofdjangov.onrender.com",
//   API_LOGIN: "/api/login/",
//   API_PHOTO_LIST: "http://127.0.0.1:8000/api/media/",
//   API_PHOTO_DETAIL: (id) => `http://127.0.0.1:8000/api/media/${id}/`,
//   MEDIA_URL: "https://jorfofdjangov.onrender.com/media/",
//   CLOUDINARY_NAME: "dwuyq2eoz",
// };

// export default CONFIG;



// // ✅ Détection automatique selon le domaine
// const BASE_URL =
//   window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
//     ? "http://127.0.0.1:8000"
//     : "https://jorfofdjangov.onrender.com"; // ton URL backend Render

// const CONFIG = {
//   BASE_URL,
//   API_LOGIN: `/api/login/`,

//   // 🖼️ Photothèque
//   API_PHOTO_LIST: `${BASE_URL}/api/media/`,
//   API_PHOTO_DETAIL: (id) => `${BASE_URL}/api/media/${id}/`,

//   // 📸 Dossier media (pour les images directes)
//   MEDIA_URL: `${BASE_URL}/media/`,

//   CLOUDINARY_NAME: "dwuyq2eoz",
// };

// export default CONFIG;




// ===============================
// ⚙️ CONFIGURATION PRODUCTION
// ===============================

const CONFIG = {
  BASE_URL: "https://jorfofdjangov.onrender.com",
  API_LOGIN: "/api/login/",

  // 🖼️ Photothèque
  API_PHOTO_LIST: "https://jorfofdjangov.onrender.com/api/media/",
  API_PHOTO_DETAIL: (id) => `https://jorfofdjangov.onrender.com/api/media/${id}/`,

  // 📸 Dossier media (Cloudinary ou ton backend prod)
  MEDIA_URL: "https://jorfofdjangov.onrender.com/media/",

  CLOUDINARY_NAME: "dwuyq2eoz",
};

export default CONFIG;

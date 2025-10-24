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
  API_PHOTO_LIST: `${BASE_URL}/api/phototheque/`,
  API_PHOTO_DETAIL: (id) => `${BASE_URL}/api/phototheque/${id}/`,

  //   // 📸 Images (chemin vers le dossier media)
  MEDIA_URL: `${BASE_URL}/media/`,
  API_PHOTO_LIST: `${BASE_URL}/api/media/`,
  CLOUDINARY_NAME: "dwuyq2eoz", // ⚡ remplace par ton cloud name exact

  

};

export default CONFIG;



// const BASE_URL = "http://127.0.0.1:8000"; // ✅ ton backend local

// const CONFIG = {
//   BASE_URL,

//   // 🔐 Authentification
//   API_LOGIN: `${BASE_URL}/api/login/`,

//   // 📰 Blog
//   API_BLOG: `${BASE_URL}/api/blog/`,
//   API_BLOG_DETAIL: (id) => `${BASE_URL}/api/blog/${id}/`,

//   // 🖼️ Photothèque
//   API_PHOTO_LIST: `${BASE_URL}/api/phototheque/`,
//   API_PHOTO_DETAIL: (id) => `${BASE_URL}/api/phototheque/${id}/`,

//   // 📸 Images (chemin vers le dossier media)
//   MEDIA_URL: `${BASE_URL}/media/`,
// };

// export default CONFIG;


























// // // Client/src/config.js

// // // ✅ Utilise la variable d'environnement si elle existe (Vite ou Create React App)
// // // sinon, bascule automatiquement sur le serveur local.
// // const CONFIG = {
// //   BASE_URL: import.meta.env?.VITE_API_BACKEND || process.env.REACT_APP_API_URL || "http://127.0.0.1:8000",
// //   API_LOGIN: "/api/login/",
// //   API_BLOG: `${BASE_URL}/api/blog/`,            // 📰 Actualités
// //   API_BLOG_DETAIL: (id) => `${BASE_URL}/api/blog/${id}/`, // 📄 Détail d’un article
// // };

// // export default CONFIG;


// // Client/src/config/config.js

// // ✅ Fichier central de configuration de l’API
// // Utilise la variable d'environnement si disponible (Vite ou React)
// // sinon, bascule sur le backend local par défaut.
// const BASE_URL =
//   import.meta.env?.VITE_API_BACKEND ||
//   process.env.REACT_APP_API_URL ||
//   "http://127.0.0.1:8000";

// const CONFIG = {
//   BASE_URL,
//   API_LOGIN: `${BASE_URL}/api/login/`,          // 🔐 Authentification
//   API_BLOG: `${BASE_URL}/api/blog/`,            // 📰 Actualités
//   API_BLOG_DETAIL: (id) => `${BASE_URL}/api/blog/${id}/`, // 📄 Détail d’un article
// };

// export default CONFIG;



// Client/src/config/config.js

// 🧠 Détecte automatiquement si on est en mode développement (localhost)
// const isLocalhost =
//   window.location.hostname === "localhost" ||
//   window.location.hostname === "127.0.0.1";

// // 🌐 Détermine dynamiquement l’URL de base
// const BASE_URL = isLocalhost
//   ? "http://127.0.0.1:8000" // 👉 ton backend Django local
//   : import.meta.env?.VITE_API_BACKEND || "https://jorfofdjangov.onrender.com"; // 👉 backend en ligne (Render)

// // 🧩 Centralise toutes les routes API ici
// const CONFIG = {
//   BASE_URL,
//   API_LOGIN: `${BASE_URL}/api/login/`,
//   API_BLOG: `${BASE_URL}/api/blog/`,
//   API_BLOG_DETAIL: (id) => `${BASE_URL}/api/blog/${id}/`,
// };

// // 🧭 Petit log pour t’aider à savoir où tu pointes
// console.log(`🔧 Environnement détecté : ${isLocalhost ? "DEV (local)" : "PROD (Render)"}`);
// console.log(`🌍 API utilisée : ${BASE_URL}`);

// export default CONFIG;


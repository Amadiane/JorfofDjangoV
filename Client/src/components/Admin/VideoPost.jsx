// // import React, { useState } from 'react';

// // const VideoPost = () => {
// //   const [titre, setTitre] = useState('');
// //   const [lien, setLien] = useState('');
// //   const [couverture, setCouverture] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [message, setMessage] = useState('');
// //   const apiUrl = import.meta.env.VITE_API_BACKEND;

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setMessage('');

// //     const formData = new FormData();
// //     formData.append('titre', titre);
// //     formData.append('lien', lien);
// //     if (couverture) {
// //       formData.append('couverture', couverture);
// //     }

// //     try {
// //       const response = await fetch(apiUrl + "/api/add-video/", {
// //         method: 'POST',
// //         body: formData,
// //       });

// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }

// //       const data = await response.json();
// //       setMessage('✅ Vidéo ajoutée avec succès !');
// //       setTitre('');
// //       setLien('');
// //       setCouverture(null);
// //     } catch (error) {
// //       setMessage(`❌ Erreur: ${error.message}`);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div style={{
// //       margin: '20px',
// //       padding: '40px',
// //       backgroundColor: '#f4f7f6',
// //       borderRadius: '8px',
// //       boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
// //       display: 'flex',
// //       justifyContent: 'center',
// //       alignItems: 'center',
// //       minHeight: '100vh',
// //     }}>
// //       <section style={{
// //         width: '100%',
// //         maxWidth: '800px',
// //         backgroundColor: '#ffffff',
// //         borderRadius: '10px',
// //         padding: '40px',
// //         boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
// //       }}>
// //         <h1 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '20px' }}>Ajouter une Vidéo</h1>
// //         <form onSubmit={handleSubmit}>
// //           <div style={{ marginBottom: '20px' }}>
// //             <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Titre de la vidéo</label>
// //             <input
// //               type="text"
// //               value={titre}
// //               onChange={(e) => setTitre(e.target.value)}
// //               required
// //               style={{
// //                 width: '100%',
// //                 padding: '12px',
// //                 border: '1px solid #ddd',
// //                 borderRadius: '8px',
// //                 fontSize: '16px'
// //               }}
// //             />
// //           </div>

// //           <div style={{ marginBottom: '20px' }}>
// //             <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Lien de la vidéo</label>
// //             <input
// //               type="url"
// //               value={lien}
// //               onChange={(e) => setLien(e.target.value)}
// //               required
// //               style={{
// //                 width: '100%',
// //                 padding: '12px',
// //                 border: '1px solid #ddd',
// //                 borderRadius: '8px',
// //                 fontSize: '16px'
// //               }}
// //             />
// //           </div>

// //           <div style={{ marginBottom: '20px' }}>
// //             <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Image de couverture</label>
// //             <input
// //               type="file"
// //               accept="image/*"
// //               onChange={(e) => setCouverture(e.target.files[0])}
// //               style={{
// //                 width: '100%',
// //                 padding: '12px',
// //                 border: '1px solid #ddd',
// //                 borderRadius: '8px',
// //               }}
// //             />
// //             {couverture && (
// //               <div style={{ marginTop: '10px' }}>
// //                 <img src={URL.createObjectURL(couverture)} alt="Prévisualisation" style={{ maxWidth: '200px', maxHeight: '200px' }} />
// //               </div>
// //             )}
// //           </div>

// //           <button type="submit" disabled={loading} style={{
// //             padding: '16px',
// //             backgroundColor: '#1C1C47',
// //             color: 'white',
// //             border: 'none',
// //             borderRadius: '8px',
// //             fontSize: '20px',
// //             cursor: 'pointer',
// //             width: '100%',
// //           }}>
// //             {loading ? 'Envoi en cours...' : 'Ajouter la vidéo'}
// //           </button>
// //         </form>

// //         {message && <p style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '20px' }}>{message}</p>}
// //       </section>
// //     </div>
// //   );
// // };

// // export default VideoPost;


// import React, { useState, useEffect } from "react";

// const VideoPost = () => {
//   const apiUrl = import.meta.env.VITE_API_BACKEND;
//   const [videos, setVideos] = useState([]);
//   const [formData, setFormData] = useState({
//     title_fr: "",
//     title_en: "",
//     title_ar: "",
//     comment_fr: "",
//     comment_en: "",
//     comment_ar: "",
//     lien_video: "",
//     cover_image: null,
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Charger la liste des vidéos au montage
//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const res = await fetch(`${apiUrl}/api/videos/`);
//       if (!res.ok) throw new Error("Erreur de chargement des vidéos");
//       const data = await res.json();
//       setVideos(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (value) data.append(key, value);
//     });

//     try {
//       const endpoint = editingId
//         ? `${apiUrl}/api/videos/${editingId}/update/`
//         : `${apiUrl}/api/videos/create/`;
//       const method = editingId ? "PUT" : "POST";

//       const response = await fetch(endpoint, { method, body: data });
//       if (!response.ok)
//         throw new Error(`Erreur HTTP ${response.status}`);

//       setMessage(
//         editingId
//           ? "✅ Vidéo mise à jour avec succès !"
//           : "✅ Vidéo ajoutée avec succès !"
//       );
//       setFormData({
//         title_fr: "",
//         title_en: "",
//         title_ar: "",
//         comment_fr: "",
//         comment_en: "",
//         comment_ar: "",
//         lien_video: "",
//         cover_image: null,
//       });
//       setEditingId(null);
//       fetchVideos();
//     } catch (error) {
//       setMessage(`❌ ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (video) => {
//     setEditingId(video.id);
//     setFormData({
//       title_fr: video.title_fr || "",
//       title_en: video.title_en || "",
//       title_ar: video.title_ar || "",
//       comment_fr: video.comment_fr || "",
//       comment_en: video.comment_en || "",
//       comment_ar: video.comment_ar || "",
//       lien_video: video.lien_video || "",
//       cover_image: null,
//     });
//     window.scrollTo(0, 0);
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Supprimer cette vidéo ?")) return;
//     try {
//       const res = await fetch(`${apiUrl}/api/videos/${id}/delete/`, {
//         method: "DELETE",
//       });
//       if (!res.ok) throw new Error("Suppression échouée");
//       setVideos(videos.filter((v) => v.id !== id));
//     } catch (err) {
//       setMessage(`❌ ${err.message}`);
//     }
//   };

//   return (
//     <div
//       style={{
//         margin: "20px",
//         padding: "40px",
//         backgroundColor: "#f4f7f6",
//         borderRadius: "8px",
//         boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       <section
//         style={{
//           width: "100%",
//           maxWidth: "900px",
//           backgroundColor: "#ffffff",
//           borderRadius: "10px",
//           padding: "40px",
//           boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//         }}
//       >
//         <h1 style={{ textAlign: "center", fontSize: "28px", marginBottom: "20px" }}>
//           {editingId ? "Modifier la Vidéo" : "Ajouter une Vidéo"}
//         </h1>

//         <form onSubmit={handleSubmit}>
//           <div style={{ display: "grid", gap: "20px" }}>
//             <input
//               type="text"
//               name="title_fr"
//               placeholder="Titre (Français)"
//               value={formData.title_fr}
//               onChange={handleChange}
//               required
//               style={inputStyle}
//             />
//             <input
//               type="text"
//               name="title_en"
//               placeholder="Title (English)"
//               value={formData.title_en}
//               onChange={handleChange}
//               style={inputStyle}
//             />
//             <input
//               type="text"
//               name="title_ar"
//               placeholder="العنوان (Arabe)"
//               value={formData.title_ar}
//               onChange={handleChange}
//               style={inputStyle}
//             />
//             <textarea
//               name="comment_fr"
//               placeholder="Commentaire (Français)"
//               value={formData.comment_fr}
//               onChange={handleChange}
//               style={inputStyle}
//             />
//             <textarea
//               name="comment_en"
//               placeholder="Comment (English)"
//               value={formData.comment_en}
//               onChange={handleChange}
//               style={inputStyle}
//             />
//             <textarea
//               name="comment_ar"
//               placeholder="تعليق (Arabe)"
//               value={formData.comment_ar}
//               onChange={handleChange}
//               style={inputStyle}
//             />
//             <input
//               type="url"
//               name="lien_video"
//               placeholder="Lien de la vidéo"
//               value={formData.lien_video}
//               onChange={handleChange}
//               required
//               style={inputStyle}
//             />
//             <input
//               type="file"
//               name="cover_image"
//               accept="image/*"
//               onChange={handleChange}
//               style={inputStyle}
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             style={{
//               padding: "16px",
//               backgroundColor: "#1C1C47",
//               color: "white",
//               border: "none",
//               borderRadius: "8px",
//               fontSize: "18px",
//               cursor: "pointer",
//               width: "100%",
//               marginTop: "20px",
//             }}
//           >
//             {loading
//               ? "Envoi en cours..."
//               : editingId
//               ? "Mettre à jour"
//               : "Ajouter la vidéo"}
//           </button>
//         </form>

//         {message && (
//           <p
//             style={{
//               textAlign: "center",
//               fontWeight: "bold",
//               marginTop: "20px",
//               color: message.includes("✅") ? "green" : "red",
//             }}
//           >
//             {message}
//           </p>
//         )}
//       </section>

//       {/* Liste des vidéos */}
//       <section
//         style={{
//           marginTop: "40px",
//           width: "100%",
//           maxWidth: "900px",
//           backgroundColor: "#fff",
//           borderRadius: "10px",
//           padding: "20px",
//           boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//         }}
//       >
//         <h2 style={{ textAlign: "center", fontSize: "24px", marginBottom: "20px" }}>
//           Liste des vidéos
//         </h2>
//         {videos.length === 0 ? (
//           <p style={{ textAlign: "center" }}>Aucune vidéo disponible</p>
//         ) : (
//           <div
//             style={{
//               display: "grid",
//               gap: "20px",
//               gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
//             }}
//           >
//             {videos.map((v) => (
//               <div
//                 key={v.id}
//                 style={{
//                   border: "1px solid #ddd",
//                   borderRadius: "10px",
//                   padding: "10px",
//                   backgroundColor: "#fafafa",
//                   textAlign: "center",
//                 }}
//               >
//                 {v.cover_image && (
//                   <img
//                     src={v.cover_image}
//                     alt={v.title_fr}
//                     style={{
//                       width: "100%",
//                       height: "160px",
//                       objectFit: "cover",
//                       borderRadius: "8px",
//                     }}
//                   />
//                 )}
//                 <h3 style={{ marginTop: "10px" }}>{v.title_fr}</h3>
//                 <p style={{ fontSize: "14px", color: "#555" }}>
//                   {v.comment_fr || "Aucun commentaire"}
//                 </p>
//                 <video
//                   controls
//                   src={v.lien_video}
//                   style={{
//                     width: "100%",
//                     borderRadius: "8px",
//                     marginTop: "8px",
//                   }}
//                 />
//                 <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
//                   <button
//                     onClick={() => handleEdit(v)}
//                     style={btnEdit}
//                   >
//                     ✏️ Modifier
//                   </button>
//                   <button
//                     onClick={() => handleDelete(v.id)}
//                     style={btnDelete}
//                   >
//                     🗑️ Supprimer
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// // Styles réutilisables
// const inputStyle = {
//   width: "100%",
//   padding: "12px",
//   border: "1px solid #ddd",
//   borderRadius: "8px",
//   fontSize: "16px",
// };

// const btnEdit = {
//   backgroundColor: "#007bff",
//   color: "white",
//   border: "none",
//   padding: "8px 12px",
//   borderRadius: "6px",
//   cursor: "pointer",
// };

// const btnDelete = {
//   backgroundColor: "#dc3545",
//   color: "white",
//   border: "none",
//   padding: "8px 12px",
//   borderRadius: "6px",
//   cursor: "pointer",
// };

// export default VideoPost;



import React, { useEffect, useState } from "react";
import CONFIG from "../../config/config.js"; 

const VideoPost = () => {
  const [videos, setVideos] = useState([]);
  const [formData, setFormData] = useState({
    title_fr: "",
    title_en: "",
    title_ar: "",
    comment_fr: "",
    comment_en: "",
    comment_ar: "",
    lien_video: "",
    cover_image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Récupérer toutes les vidéos
  const fetchVideos = async () => {
    try {
      const res = await fetch(CONFIG.API_VIDEO_LIST);
      if (!res.ok) throw new Error("Erreur de chargement des vidéos");
      const data = await res.json();
      setVideos(data);
    } catch (error) {
      console.error(error);
      setMessage("❌ Impossible de charger les vidéos.");
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // ✅ Gérer la saisie
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Ajouter ou modifier une vidéo
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const fd = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) fd.append(key, formData[key]);
    });

    const url = editingId
      ? CONFIG.API_VIDEO_UPDATE(editingId)
      : CONFIG.API_VIDEO_CREATE;

    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        body: fd,
      });

      if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);

      await fetchVideos();
      setMessage(
        editingId ? "✅ Vidéo mise à jour avec succès !" : "✅ Vidéo ajoutée avec succès !"
      );
      setFormData({
        title_fr: "",
        title_en: "",
        title_ar: "",
        comment_fr: "",
        comment_en: "",
        comment_ar: "",
        lien_video: "",
        cover_image: null,
      });
      setEditingId(null);
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Supprimer une vidéo
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette vidéo ?")) return;
    try {
      const res = await fetch(CONFIG.API_VIDEO_DELETE(id), {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur de suppression");
      await fetchVideos();
      setMessage("🗑️ Vidéo supprimée avec succès !");
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  // ✅ Éditer une vidéo
  const handleEdit = (video) => {
    setFormData({
      title_fr: video.title_fr || "",
      title_en: video.title_en || "",
      title_ar: video.title_ar || "",
      comment_fr: video.comment_fr || "",
      comment_en: video.comment_en || "",
      comment_ar: video.comment_ar || "",
      lien_video: video.lien_video || "",
      cover_image: null,
    });
    setEditingId(video.id);
  };

  return (
    <div
      style={{
        margin: "20px",
        padding: "40px",
        backgroundColor: "#f4f7f6",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "900px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "40px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ textAlign: "center", fontSize: "28px", marginBottom: "20px" }}>
          {editingId ? "Modifier la Vidéo" : "Ajouter une Vidéo"}
        </h1>

        {/* FORMULAIRE */}
        <form onSubmit={handleSubmit}>
          {["title_fr", "title_en", "title_ar"].map((field, i) => (
            <div key={field} style={{ marginBottom: "15px" }}>
              <label style={{ fontWeight: "bold", display: "block", marginBottom: "6px" }}>
                {["Titre (Français)", "Title (English)", "العنوان (Arabe)"][i]}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              />
            </div>
          ))}

          {["comment_fr", "comment_en", "comment_ar"].map((field, i) => (
            <div key={field} style={{ marginBottom: "15px" }}>
              <label style={{ fontWeight: "bold", display: "block", marginBottom: "6px" }}>
                {["Commentaire (Français)", "Comment (English)", "تعليق (Arabe)"][i]}
              </label>
              <textarea
                name={field}
                value={formData[field]}
                onChange={handleChange}
                rows="3"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              />
            </div>
          ))}

          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>
              Lien de la vidéo (YouTube, Cloudinary, etc.)
            </label>
            <input
              type="url"
              name="lien_video"
              value={formData.lien_video}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>
              Image de couverture
            </label>
            <input
              type="file"
              name="cover_image"
              accept="image/*"
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "16px",
              backgroundColor: "#1C1C47",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "20px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            {loading ? "Envoi en cours..." : editingId ? "Mettre à jour" : "Ajouter"}
          </button>
        </form>

        {message && (
          <p style={{ textAlign: "center", fontWeight: "bold", marginTop: "20px" }}>{message}</p>
        )}
      </section>

      {/* 🧾 Liste des vidéos */}
      <section style={{ marginTop: "40px", width: "100%", maxWidth: "900px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>📺 Liste des vidéos</h2>
        {videos.length === 0 ? (
          <p style={{ textAlign: "center" }}>Aucune vidéo pour le moment.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {videos.map((video) => (
              <div
                key={video.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "20px",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                {video.cover_image && (
                  <img
                    src={video.cover_image}
                    alt={video.title_fr}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      marginBottom: "10px",
                    }}
                  />
                )}
                <h3>{video.title_fr}</h3>
                <p style={{ fontSize: "14px", color: "#555" }}>{video.comment_fr}</p>
                <a href={video.lien_video} target="_blank" rel="noreferrer">
                  🔗 Voir la vidéo
                </a>
                <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
                  <button
                    onClick={() => handleEdit(video)}
                    style={{
                      backgroundColor: "#1C1C47",
                      color: "#fff",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    ✏️ Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(video.id)}
                    style={{
                      backgroundColor: "#E74C3C",
                      color: "#fff",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    🗑️ Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default VideoPost;

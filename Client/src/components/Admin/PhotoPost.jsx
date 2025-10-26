// import React, { useState } from 'react';
// import CONFIG from "../../config/config.js"; // 🔥 importe ton fichier config.js


// const PhotoPost = () => {
//   const apiUrl = CONFIG.BASE_URL;
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   // const apiUrl = import.meta.env.VITE_API_BACKEND;

//   // Palette de couleurs similaire à "Contacter nous"
//   const colors = {
//     primary: '#1C1C47', // Bleu principal
//     background: '#F3F4F6',
//     card: '#FFFFFF',
//     text: '#1F2937',
//     border: '#E5E7EB',
//     success: '#10B981',
//     error: '#EF4444',
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   setMessage("");

//   const formData = new FormData();
//   formData.append("titre", title);
//   formData.append("description", description);
//   if (image) {
//     formData.append("image", image);
//   }

//   try {
//     // ✅ Correction : la virgule avant "{" était une erreur de syntaxe
//     const response = await fetch(CONFIG.API_PHOTO_LIST, {
//       method: "POST",
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     setMessage("✅ Photo ajoutée avec succès !");
//     setTitle("");
//     setDescription("");
//     setImage(null);
//   } catch (error) {
//     setMessage(`❌ Erreur: ${error.message}`);
//   } finally {
//     setLoading(false);
//   }
// };

//   const styles = {
//     container: {
//       margin: '0',
//       padding: '20px',
//       backgroundColor: colors.background,
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       minHeight: '100vh',
//       width: '100%',
//       boxSizing: 'border-box',
//     },
//     section: {
//       width: '100%',
//       maxWidth: '900px',
//       backgroundColor: colors.card,
//       borderRadius: '12px',
//       padding: '30px 20px',
//       boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
//     },
//     title: {
//       textAlign: 'center',
//       fontSize: '28px',
//       marginBottom: '30px',
//       fontWeight: 'bold',
//       color: colors.primary,
//     },
//     formGroup: {
//       marginBottom: '24px',
//     },
//     label: {
//       fontWeight: '600',
//       display: 'block',
//       marginBottom: '8px',
//       color: colors.text,
//     },
//     input: {
//       width: '100%',
//       padding: '12px',
//       border: `1px solid ${colors.border}`,
//       borderRadius: '8px',
//       fontSize: '16px',
//       boxSizing: 'border-box',
//     },
//     textarea: {
//       width: '100%',
//       padding: '12px',
//       border: `1px solid ${colors.border}`,
//       borderRadius: '8px',
//       fontSize: '16px',
//       resize: 'vertical',
//       minHeight: '150px',
//       boxSizing: 'border-box',
//     },
//     imagePreview: {
//       marginTop: '10px',
//       textAlign: 'center',
//     },
//     previewImg: {
//       maxWidth: '100%',
//       maxHeight: '200px',
//       objectFit: 'cover',
//       borderRadius: '4px',
//     },
//     button: {
//       padding: '14px',
//       backgroundColor: colors.primary,
//       color: 'white',
//       border: 'none',
//       borderRadius: '8px',
//       fontSize: '16px',
//       cursor: 'pointer',
//       width: '100%',
//       boxSizing: 'border-box',
//       transition: 'background-color 0.3s ease',
//       fontWeight: '600',
//     },
//     successMessage: {
//       textAlign: 'center',
//       fontWeight: 'bold',
//       marginTop: '20px',
//       color: colors.success,
//     },
//     errorMessage: {
//       textAlign: 'center',
//       fontWeight: 'bold',
//       marginTop: '20px',
//       color: colors.error,
//     },
//     // Styles responsifs pour les petits écrans
//     '@media (max-width: 768px)': {
//       section: {
//         padding: '20px 15px',
//       },
//       title: {
//         fontSize: '24px',
//       },
//       button: {
//         padding: '12px',
//       },
//     }
//   };

//   // Appliquer les styles responsifs manuellement
//   const getResponsiveStyles = () => {
//     const isMobile = window.innerWidth <= 768;
//     return {
//       section: {
//         ...styles.section,
//         padding: isMobile ? '20px 15px' : '30px 20px',
//       },
//       title: {
//         ...styles.title,
//         fontSize: isMobile ? '24px' : '28px',
//       },
//     };
//   };

//   const responsiveStyles = getResponsiveStyles();

//   return (
//     <div style={styles.container}>
//       <section style={responsiveStyles.section}>
//         <h1 style={responsiveStyles.title}>Publier un nouvel élément</h1>
//         <form onSubmit={handleSubmit}>
//           <div style={styles.formGroup}>
//             <label style={styles.label} aria-label="Titre">Titre</label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//               aria-label="Titre"
//               style={styles.input}
//             />
//           </div>

//           <div style={styles.formGroup}>
//             <label style={styles.label} aria-label="Description">Description</label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//               aria-label="Description"
//               style={styles.textarea}
//             />
//           </div>

//           <div style={styles.formGroup}>
//             <label style={styles.label} aria-label="Image de couverture">Image de couverture</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setImage(e.target.files[0])}
//               aria-label="Image de couverture"
//               style={styles.input}
//             />
//             {image && (
//               <div style={styles.imagePreview}>
//                 <img 
//                   src={URL.createObjectURL(image)} 
//                   alt="Prévisualisation" 
//                   style={styles.previewImg} 
//                 />
//               </div>
//             )}
//           </div>

//           <button 
//             type="submit" 
//             disabled={loading} 
//             style={{
//               ...styles.button,
//               opacity: loading ? 0.7 : 1,
//             }}
//           >
//             {loading ? 'Envoi en cours...' : 'Ajouter l\'élément'}
//           </button>
//         </form>

//         {message && (
//           <p style={message.startsWith('✅') ? styles.successMessage : styles.errorMessage}>
//             {message}
//           </p>
//         )}
//       </section>
//     </div>
//   );
// };

// export default PhotoPost;

import React, { useState, useEffect } from "react";
import CONFIG from "../../config/config.js"; // ⚙️ URL de ton backend

const PhotoPost = () => {
  const [photos, setPhotos] = useState([]);
  const [form, setForm] = useState({
    title_fr: "",
    title_en: "",
    title_ar: "",
    comment_fr: "",
    comment_en: "",
    comment_ar: "",
    image: null,
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const apiUrl = CONFIG.API_PHOTO_LIST; // Exemple: "http://localhost:8000/api/photos/"

  // 🟢 GET — Charger les photos
  const fetchPhotos = async () => {
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setPhotos(data);
    } catch (error) {
      setMessage("❌ Erreur de chargement des photos");
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  // 🟡 Gérer les champs du formulaire
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  // 🟠 POST ou PUT — Enregistrer une photo
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const method = editId ? "PUT" : "POST";
      const url = editId ? `${apiUrl}${editId}/` : apiUrl;

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) throw new Error("Erreur d’envoi");

      setMessage(editId ? "✅ Photo mise à jour !" : "✅ Photo ajoutée !");
      setForm({
        title_fr: "",
        title_en: "",
        title_ar: "",
        comment_fr: "",
        comment_en: "",
        comment_ar: "",
        image: null,
      });
      setEditId(null);
      fetchPhotos();
    } catch (error) {
      setMessage("❌ Erreur : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔴 DELETE — Supprimer une photo
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette photo ?")) return;
    try {
      await fetch(`${apiUrl}${id}/`, { method: "DELETE" });
      setMessage("🗑️ Photo supprimée !");
      fetchPhotos();
    } catch (error) {
      setMessage("❌ Erreur de suppression");
    }
  };

  // ✏️ Pré-remplir pour modification
  const handleEdit = (photo) => {
    setForm({
      title_fr: photo.title_fr,
      title_en: photo.title_en,
      title_ar: photo.title_ar,
      comment_fr: photo.comment_fr,
      comment_en: photo.comment_en,
      comment_ar: photo.comment_ar,
      image: null,
    });
    setEditId(photo.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={styles.container}>
      <section style={styles.section}>
        <h1 style={styles.title}>
          {editId ? "Modifier une photo" : "Ajouter une nouvelle photo"}
        </h1>

        <form onSubmit={handleSubmit}>
          {["fr", "en", "ar"].map((lang) => (
            <div key={lang} style={styles.langSection}>
              <h3 style={styles.langTitle}>
                {lang === "fr" ? "Français" : lang === "en" ? "English" : "العربية"}
              </h3>
              <div style={styles.formGroup}>
                <label style={styles.label}>Titre ({lang})</label>
                <input
                  type="text"
                  name={`title_${lang}`}
                  value={form[`title_${lang}`]}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Commentaire ({lang})</label>
                <textarea
                  name={`comment_${lang}`}
                  value={form[`comment_${lang}`]}
                  onChange={handleChange}
                  style={styles.textarea}
                />
              </div>
            </div>
          ))}

          <div style={styles.formGroup}>
            <label style={styles.label}>Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.button, opacity: loading ? 0.6 : 1 }}
          >
            {loading ? "⏳ Envoi..." : editId ? "💾 Mettre à jour" : "📤 Ajouter"}
          </button>
        </form>

        {message && (
          <p
            style={
              message.startsWith("✅")
                ? styles.success
                : message.startsWith("❌")
                ? styles.error
                : styles.info
            }
          >
            {message}
          </p>
        )}
      </section>

      <section style={styles.listSection}>
        <h2 style={styles.subtitle}>📸 Liste des photos</h2>
        <div style={styles.grid}>
          {photos.map((photo) => (
            <div key={photo.id} style={styles.card}>
              <img
                src={photo.image}
                alt={photo.title_fr}
                style={styles.image}
              />
              <h3>{photo.title_fr}</h3>
              <p>{photo.comment_fr}</p>
              <div style={styles.actions}>
                <button style={styles.editBtn} onClick={() => handleEdit(photo)}>
                  ✏️ Modifier
                </button>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(photo.id)}
                >
                  🗑️ Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// 🎨 Styles
const styles = {
  container: {
    background: "#f8fafc",
    padding: "40px",
    minHeight: "100vh",
  },
  section: {
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    marginBottom: "30px",
  },
  title: { textAlign: "center", color: "#1C1C47" },
  langSection: { marginBottom: "20px" },
  langTitle: { color: "#1C1C47", marginBottom: "10px" },
  formGroup: { marginBottom: "15px" },
  label: { display: "block", marginBottom: "5px", fontWeight: "bold" },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minHeight: "80px",
  },
  button: {
    background: "#1C1C47",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    width: "100%",
  },
  success: { color: "green", textAlign: "center", marginTop: "10px" },
  error: { color: "red", textAlign: "center", marginTop: "10px" },
  info: { color: "#555", textAlign: "center", marginTop: "10px" },
  listSection: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  },
  subtitle: { textAlign: "center", color: "#1C1C47", marginBottom: "20px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#f9fafb",
    borderRadius: "8px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "6px",
    marginBottom: "10px",
  },
  actions: { display: "flex", justifyContent: "space-between" },
  editBtn: {
    background: "#2563EB",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#DC2626",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default PhotoPost;

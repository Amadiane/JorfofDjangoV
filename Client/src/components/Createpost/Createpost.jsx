// import React, { useState } from "react";


// const Createpost = ({ onPostCreated }) => {
//   const [formData, setFormData] = useState({
//     title_fr: "",
//     title_en: "",
//     title_ar: "",
//     content_fr: "",
//     content_en: "",
//     content_ar: "",
//     image: null,
//   });

//   const [previewImage, setPreviewImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Simulation des dépendances externes
//   const apiUrl = "http://localhost:8000/"; // Exemple d'URL
//   const navigate = (path) => console.log(`Navigation vers: ${path}`);

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     if (type === "file") {
//       const file = files[0];
//       setFormData({ ...formData, [name]: file });
//       if (file) {
//         setPreviewImage(URL.createObjectURL(file));
//       }
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const validateForm = () => {
//     return formData.title_fr.trim() && formData.content_fr.trim();
//   };

//   const resetForm = () => {
//     setFormData({
//       title_fr: "",
//       title_en: "",
//       title_ar: "",
//       content_fr: "",
//       content_en: "",
//       content_ar: "",
//       image: null,
//     });
//     setPreviewImage(null);
//     setMessage("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (!validateForm()) {
//       setMessage("❌ Le titre et le contenu en français sont obligatoires.");
//       return;
//     }

//     setLoading(true);

//     const form = new FormData();
//     form.append("title_fr", formData.title_fr.trim());
//     form.append("title_en", formData.title_en.trim());
//     form.append("title_ar", formData.title_ar.trim());
//     form.append("content_fr", formData.content_fr.trim());
//     form.append("content_en", formData.content_en.trim());
//     form.append("content_ar", formData.content_ar.trim());
//     if (formData.image) {
//       form.append("image", formData.image);
//     }

//     try {
//       // Simulation de l'appel API
//       const response = await fetch(apiUrl + "api/blog/", {
//         method: 'POST',
//         body: form,
//       });

//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

//       const data = await response.json();
//       onPostCreated && onPostCreated(data);
//       setMessage("✅ Article publié avec succès !");
//       resetForm();

//       setTimeout(() => navigate("/motpresi"), 2000);
//     } catch (error) {
//       console.error("Erreur lors de la publication :", error);
//       setMessage("❌ Erreur lors de la publication de l'article.");
//       setTimeout(() => navigate("/"), 2000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Styles responsifs similaires à PlatformPost
//   const styles = {
//     container: {
//       padding: '15px',
//       maxWidth: '1200px',
//       margin: '0 auto',
//       fontFamily: 'Arial, sans-serif',
//     },
//     header: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       flexWrap: 'wrap',
//       marginBottom: '20px',
//       gap: '10px',
//     },
//     title: {
//       fontSize: 'clamp(20px, 4vw, 24px)',
//       margin: '10px 0',
//       color: '#1C1C47',
//     },
//     formContainer: {
//       backgroundColor: '#f9f9f9',
//       padding: '20px',
//       borderRadius: '12px',
//       boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//       marginBottom: '30px',
//     },
//     form: {
//       display: 'grid',
//       gap: '20px',
//     },
//     formRow: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
//       gap: '15px',
//     },
//     formGroup: {
//       display: 'flex',
//       flexDirection: 'column',
//     },
//     label: {
//       marginBottom: '8px',
//       fontWeight: '600',
//       color: '#333',
//       fontSize: '14px',
//     },
//     input: {
//       padding: '12px',
//       borderRadius: '8px',
//       border: '2px solid #e0e0e0',
//       fontSize: '16px',
//       transition: 'border-color 0.3s ease',
//       outline: 'none',
//     },
//     textarea: {
//       padding: '12px',
//       borderRadius: '8px',
//       border: '2px solid #e0e0e0',
//       minHeight: '120px',
//       fontSize: '16px',
//       fontFamily: 'inherit',
//       resize: 'vertical',
//       transition: 'border-color 0.3s ease',
//       outline: 'none',
//     },
//     submitButton: {
//       padding: '15px',
//       backgroundColor: '#1C1C47',
//       color: 'white',
//       border: 'none',
//       borderRadius: '8px',
//       fontSize: '16px',
//       fontWeight: '600',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       justifySelf: 'start',
//       minWidth: '200px',
//     },
//     message: {
//       marginTop: '15px',
//       padding: '12px',
//       borderRadius: '8px',
//       fontWeight: '500',
//     },
//     imagePreview: {
//       marginTop: '10px',
//       width: '100%',
//       maxHeight: '200px',
//       objectFit: 'cover',
//       borderRadius: '8px',
//       border: '1px solid #e0e0e0',
//     },
//     resetButton: {
//       padding: '15px',
//       backgroundColor: '#6c757d',
//       color: 'white',
//       border: 'none',
//       borderRadius: '8px',
//       fontSize: '16px',
//       fontWeight: '600',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       minWidth: '150px',
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <h1 style={styles.title}>Créer un article de blog</h1>
//       </div>

//       <section style={styles.formContainer}>
//         <div style={styles.form}>
//           {/* Titres */}
//           <div>
//             <h3 style={{margin: '0 0 15px 0', color: '#1C1C47'}}>Titres</h3>
//             <div style={styles.formRow}>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Titre (Français) *</label>
//                 <input 
//                   type="text" 
//                   name="title_fr"
//                   value={formData.title_fr} 
//                   onChange={handleChange} 
//                   required 
//                   style={styles.input}
//                   onFocus={(e) => e.target.style.borderColor = '#1C1C47'}
//                   onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
//                 />
//               </div>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Title (English)</label>
//                 <input 
//                   type="text" 
//                   name="title_en"
//                   value={formData.title_en} 
//                   onChange={handleChange} 
//                   style={styles.input}
//                   onFocus={(e) => e.target.style.borderColor = '#1C1C47'}
//                   onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
//                 />
//               </div>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>العنوان (العربية)</label>
//                 <input 
//                   type="text" 
//                   name="title_ar"
//                   value={formData.title_ar} 
//                   onChange={handleChange} 
//                   style={{...styles.input, direction: 'rtl'}}
//                   onFocus={(e) => e.target.style.borderColor = '#1C1C47'}
//                   onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Contenus */}
//           <div>
//             <h3 style={{margin: '0 0 15px 0', color: '#1C1C47'}}>Contenus</h3>
//             <div style={styles.formRow}>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Contenu (Français) *</label>
//                 <textarea 
//                   name="content_fr"
//                   value={formData.content_fr} 
//                   onChange={handleChange} 
//                   required 
//                   style={styles.textarea}
//                   onFocus={(e) => e.target.style.borderColor = '#1C1C47'}
//                   onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
//                 />
//               </div>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Content (English)</label>
//                 <textarea 
//                   name="content_en"
//                   value={formData.content_en} 
//                   onChange={handleChange} 
//                   style={styles.textarea}
//                   onFocus={(e) => e.target.style.borderColor = '#1C1C47'}
//                   onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
//                 />
//               </div>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>المحتوى (العربية)</label>
//                 <textarea 
//                   name="content_ar"
//                   value={formData.content_ar} 
//                   onChange={handleChange} 
//                   style={{...styles.textarea, direction: 'rtl'}}
//                   onFocus={(e) => e.target.style.borderColor = '#1C1C47'}
//                   onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Image */}
//           <div style={styles.formRow}>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Image (optionnelle)</label>
//               <input 
//                 type="file" 
//                 name="image"
//                 accept="image/*" 
//                 onChange={handleChange} 
//                 style={styles.input}
//               />
//               {previewImage && (
//                 <img 
//                   src={previewImage} 
//                   alt="Aperçu" 
//                   style={styles.imagePreview}
//                 />
//               )}
//             </div>
//           </div>

//           <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
//             <button 
//               type="button" 
//               disabled={loading} 
//               onClick={handleSubmit}
//               style={{
//                 ...styles.submitButton,
//                 backgroundColor: loading ? '#ccc' : '#1C1C47',
//                 cursor: loading ? 'not-allowed' : 'pointer'
//               }}
//             >
//               {loading ? "Publication en cours..." : "Publier l'article"}
//             </button>
            
//             <button 
//               type="button"
//               onClick={resetForm}
//               style={styles.resetButton}
//             >
//               Réinitialiser
//             </button>
//           </div>
//         </div>

//         {message && (
//           <div style={{
//             ...styles.message,
//             backgroundColor: message.includes('❌') ? '#ffebee' : '#e8f5e9',
//             color: message.includes('❌') ? '#c62828' : '#2e7d32',
//           }}>
//             {message}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default Createpost;

import React, { useEffect, useState } from "react";
import CONFIG from "../../config/config.js";

const Createpost = () => {
  const [newsList, setNewsList] = useState([]);
  const [formData, setFormData] = useState({
    title_fr: "",
    title_en: "",
    title_ar: "",
    content_fr: "",
    content_en: "",
    content_ar: "",
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Charger les articles
  const fetchNews = async () => {
    try {
      const res = await fetch(CONFIG.API_NEWS_LIST);
      if (!res.ok) throw new Error("Erreur de chargement des articles");
      const data = await res.json();
      setNewsList(data);
    } catch (err) {
      console.error(err);
      setMessage("❌ Impossible de charger les articles.");
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // ✅ Gérer les champs
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Ajouter / modifier un article
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const fd = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) fd.append(key, formData[key]);
    });

    const url = editingId
      ? CONFIG.API_NEWS_UPDATE(editingId)
      : CONFIG.API_NEWS_CREATE;

    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        body: fd,
      });

      if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);

      await fetchNews();
      setMessage(
        editingId ? "✅ Article mis à jour avec succès !" : "✅ Article publié avec succès !"
      );
      setFormData({
        title_fr: "",
        title_en: "",
        title_ar: "",
        content_fr: "",
        content_en: "",
        content_ar: "",
        image: null,
      });
      setEditingId(null);
    } catch (error) {
      console.error(error);
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Supprimer un article
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet article ?")) return;
    try {
      const res = await fetch(CONFIG.API_NEWS_DELETE(id), {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur de suppression");
      await fetchNews();
      setMessage("🗑️ Article supprimé avec succès !");
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  // ✅ Éditer un article
  const handleEdit = (post) => {
    setFormData({
      title_fr: post.title_fr || "",
      title_en: post.title_en || "",
      title_ar: post.title_ar || "",
      content_fr: post.content_fr || "",
      content_en: post.content_en || "",
      content_ar: post.content_ar || "",
      image: null,
    });
    setEditingId(post.id);
  };

  // ✅ Réinitialiser
  const resetForm = () => {
    setFormData({
      title_fr: "",
      title_en: "",
      title_ar: "",
      content_fr: "",
      content_en: "",
      content_ar: "",
      image: null,
    });
    setEditingId(null);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h2 style={{ color: "#1C1C47" }}>
        {editingId ? "Modifier l’article" : "Créer un article"}
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
        <input
          type="text"
          name="title_fr"
          placeholder="Titre (Français)"
          value={formData.title_fr}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="title_en"
          placeholder="Title (English)"
          value={formData.title_en}
          onChange={handleChange}
        />
        <input
          type="text"
          name="title_ar"
          placeholder="العنوان (العربية)"
          value={formData.title_ar}
          onChange={handleChange}
          style={{ direction: "rtl" }}
        />
        <textarea
          name="content_fr"
          placeholder="Contenu (Français)"
          value={formData.content_fr}
          onChange={handleChange}
          required
        />
        <textarea
          name="content_en"
          placeholder="Content (English)"
          value={formData.content_en}
          onChange={handleChange}
        />
        <textarea
          name="content_ar"
          placeholder="المحتوى (العربية)"
          value={formData.content_ar}
          onChange={handleChange}
          style={{ direction: "rtl" }}
        />
        <input type="file" name="image" accept="image/*" onChange={handleChange} />

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" disabled={loading}>
            {loading
              ? editingId
                ? "Mise à jour..."
                : "Publication..."
              : editingId
              ? "Mettre à jour"
              : "Publier"}
          </button>
          <button type="button" onClick={resetForm}>
            Réinitialiser
          </button>
        </div>
      </form>

      {message && (
        <p
          style={{
            color: message.startsWith("❌") ? "red" : "green",
            marginTop: "10px",
          }}
        >
          {message}
        </p>
      )}

      <h3 style={{ marginTop: "30px", color: "#1C1C47" }}>Articles existants</h3>
      <div style={{ display: "grid", gap: "15px" }}>
        {newsList.length === 0 ? (
          <p>Aucun article pour le moment.</p>
        ) : (
          newsList.map((post) => (
            <div
              key={post.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                background: "#fff",
              }}
            >
              <h4>{post.title_fr}</h4>
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title_fr}
                  style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
                />
              )}
              <p>{post.content_fr.slice(0, 150)}...</p>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => handleEdit(post)}>✏️ Modifier</button>
                <button onClick={() => handleDelete(post.id)}>🗑️ Supprimer</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Createpost;


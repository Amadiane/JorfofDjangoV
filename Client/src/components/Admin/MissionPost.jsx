// import React, { useState, useEffect } from 'react';

// const MissionPost = () => {
//   const [missions, setMissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [newMission, setNewMission] = useState({
//     title_fr: "",
//     title_en: "",
//     title_ar: "",
//     content_fr: "",
//     content_en: "",
//     content_ar: "",
//   });
//   const [editingMissionId, setEditingMissionId] = useState(null);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [expanded, setExpanded] = useState(null);
//   const apiUrl = import.meta.env.VITE_API_BACKEND;
  
//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   // Récupérer toutes les missions de l'API
//   useEffect(() => {
//     const fetchMissions = async () => {
//       try {
//         const response = await fetch(apiUrl + "api/missions/");
//         if (!response.ok) {
//           throw new Error('Impossible de récupérer les missions');
//         }
//         const data = await response.json();
//         setMissions(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMissions();
//   }, []);

//   // Gestion de l'ajout de nouvelles missions
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewMission((prev) => ({ ...prev, [name]: value }));
//   };

//   // Gestion de la soumission du formulaire (ajout ou modification)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const method = editingMissionId ? 'PUT' : 'POST';
//     const url = editingMissionId
//       ? `${apiUrl}api/missions/${editingMissionId}/`
//       : `${apiUrl}api/missions/`;

//     try {
//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newMission),
//       });
//       if (!response.ok) {
//         throw new Error('Erreur lors de l\'envoi de la mission');
//       }
//       // Réinitialiser les champs après l'envoi
//       setNewMission({
//         title_fr: "",
//         title_en: "",
//         title_ar: "",
//         content_fr: "",
//         content_en: "",
//         content_ar: "",
//       });
//       setEditingMissionId(null);
//       // Recharger la liste des missions
//       const data = await response.json();
//       if (editingMissionId) {
//         setMissions((prevMissions) =>
//           prevMissions.map((mission) =>
//             mission.id === editingMissionId ? data : mission
//           )
//         );
//         setSuccessMessage('Mission modifiée avec succès !');
//       } else {
//         setMissions((prevMissions) => [...prevMissions, data]);
//         setSuccessMessage('Nouvelle mission ajoutée avec succès !');
//       }
//       setShowForm(false);
//       setError(null);
      
//       // Faire disparaître le message de succès après 5 secondes
//       setTimeout(() => {
//         setSuccessMessage(null);
//       }, 5000);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   // Fonction pour modifier une mission
//   const handleEdit = (mission) => {
//     setNewMission({
//       title_fr: mission.title_fr,
//       title_en: mission.title_en,
//       title_ar: mission.title_ar,
//       content_fr: mission.content_fr,
//       content_en: mission.content_en,
//       content_ar: mission.content_ar,
//     });
//     setEditingMissionId(mission.id);
//     setShowForm(true);
//     // Défiler jusqu'au formulaire
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Fonction pour supprimer une mission
//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette mission ?');
//     if (confirmDelete) {
//       try {
//         const response = await fetch(`${apiUrl}api/missions/${id}/`, {
//           method: 'DELETE',
//         });
//         if (!response.ok) {
//           throw new Error('Erreur lors de la suppression de la mission');
//         }
//         // Mettre à jour la liste après la suppression
//         setMissions((prevMissions) =>
//           prevMissions.filter((mission) => mission.id !== id)
//         );
//         setSuccessMessage('Mission supprimée avec succès !');
        
//         // Faire disparaître le message de succès après 5 secondes
//         setTimeout(() => {
//           setSuccessMessage(null);
//         }, 5000);
//       } catch (error) {
//         setError(error.message);
//       }
//     }
//   };
  
//   // Fonction pour basculer l'affichage détaillé d'une mission
//   const toggleExpand = (id) => {
//     setExpanded(expanded === id ? null : id);
//   };
  
//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentMissions = missions.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(missions.length / itemsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Styles for responsive design
//   const styles = {
//     container: {
//       padding: '20px',
//       maxWidth: '1200px',
//       margin: '0 auto',
//     },
//     header: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       flexWrap: 'wrap',
//       marginBottom: '20px',
//     },
//     title: {
//       fontSize: '24px',
//       margin: '10px 0',
//     },
//     addButton: {
//       padding: '10px 15px',
//       backgroundColor: '#1C1C47',
//       color: 'white',
//       fontSize: '16px',
//       border: 'none',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       transition: 'background-color 0.3s',
//     },
//     formContainer: {
//       backgroundColor: '#f9f9f9',
//       padding: '20px',
//       borderRadius: '10px',
//       boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
//       marginBottom: '30px',
//       width: '100%',
//     },
//     form: {
//       display: 'grid',
//       gap: '15px',
//     },
//     formGroup: {
//       display: 'flex',
//       flexDirection: 'column',
//     },
//     label: {
//       marginBottom: '5px',
//       fontWeight: '500',
//     },
//     input: {
//       padding: '10px',
//       borderRadius: '5px',
//       border: '1px solid #ddd',
//       fontSize: '16px',
//     },
//     textarea: {
//       padding: '10px',
//       borderRadius: '5px',
//       border: '1px solid #ddd',
//       minHeight: '100px',
//       fontSize: '16px',
//       fontFamily: 'inherit',
//     },
//     submitButton: {
//       padding: '12px',
//       backgroundColor: '#1C1C47',
//       color: 'white',
//       border: 'none',
//       borderRadius: '5px',
//       fontSize: '16px',
//       cursor: 'pointer',
//       transition: 'background-color 0.3s',
//     },
//     missionsList: {
//       display: 'grid',
//       gap: '15px',
//     },
//     missionCard: {
//       border: '1px solid #eaeaea',
//       borderRadius: '8px',
//       overflow: 'hidden',
//       transition: 'box-shadow 0.3s',
//       backgroundColor: '#fff',
//     },
//     missionHeader: {
//       padding: '15px',
//       cursor: 'pointer',
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       backgroundColor: '#f5f5f5',
//     },
//     missionTitle: {
//       margin: 0,
//       fontSize: '18px',
//       fontWeight: '500',
//     },
//     missionContent: {
//       padding: '15px',
//     },
//     missionInfo: {
//       margin: '8px 0',
//     },
//     missionActions: {
//       display: 'flex',
//       gap: '10px',
//       marginTop: '15px',
//     },
//     actionButton: {
//       padding: '8px 12px',
//       borderRadius: '5px',
//       border: 'none',
//       cursor: 'pointer',
//       fontSize: '14px',
//     },
//     editButton: {
//       backgroundColor: '#e0e0e0',
//     },
//     deleteButton: {
//       backgroundColor: '#ffebee',
//       color: '#c62828',
//     },
//     paginationContainer: {
//       display: 'flex',
//       justifyContent: 'center',
//       gap: '5px',
//       marginTop: '20px',
//     },
//     pageButton: {
//       padding: '8px 12px',
//       border: '1px solid #ddd',
//       borderRadius: '5px',
//       backgroundColor: '#fff',
//       cursor: 'pointer',
//     },
//     activePageButton: {
//       backgroundColor: '#1C1C47',
//       color: 'white',
//       border: '1px solid #1C1C47',
//     },
//     errorMessage: {
//       padding: '10px',
//       borderRadius: '5px',
//       backgroundColor: '#ffebee',
//       color: '#c62828',
//       marginBottom: '15px',
//     },
//     successMessage: {
//       padding: '10px',
//       borderRadius: '5px',
//       backgroundColor: '#e8f5e9',
//       color: '#2e7d32',
//       marginBottom: '15px',
//     },
//     languageSection: {
//       marginTop: '10px',
//       padding: '10px',
//       borderTop: '1px solid #eee',
//     },
//     languageTitle: {
//       fontSize: '16px',
//       fontWeight: '500',
//       marginBottom: '8px',
//     }
//   };

//   if (loading) {
//     return (
//       <div style={{ 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         height: '100vh' 
//       }}>
//         <div style={{ fontSize: '18px', fontWeight: '500', color: '#666' }}>
//           Chargement...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <h1 style={styles.title}>Gestion des Missions</h1>
//         <button
//           onClick={() => {
//             setShowForm(!showForm);
//             // Réinitialiser les champs lorsqu'on ferme le formulaire
//             if (showForm) {
//               setNewMission({
//                 title_fr: "",
//                 title_en: "",
//                 title_ar: "",
//                 content_fr: "",
//                 content_en: "",
//                 content_ar: "",
//               });
//               setEditingMissionId(null);
//             }
//           }}
//           style={styles.addButton}
//         >
//           {showForm ? 'Fermer le formulaire' : 'Ajouter une mission'}
//         </button>
//       </div>

//       {error && (
//         <div style={styles.errorMessage}>
//           Erreur: {error}
//         </div>
//       )}
      
//       {successMessage && (
//         <div style={styles.successMessage}>
//           {successMessage}
//         </div>
//       )}

//       {/* Formulaire d'ajout de mission */}
//       {showForm && (
//         <section style={styles.formContainer}>
//           <h2 style={styles.title}>{editingMissionId ? 'Modifier la mission' : 'Nouvelle mission'}</h2>
//           <form onSubmit={handleSubmit} style={styles.form}>
//             {/* Champs titre */}
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Titre en Français</label>
//               <input
//                 type="text"
//                 id="title_fr"
//                 name="title_fr"
//                 style={styles.input}
//                 value={newMission.title_fr}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Title in English</label>
//               <input
//                 type="text"
//                 id="title_en"
//                 name="title_en"
//                 style={styles.input}
//                 value={newMission.title_en}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>العنوان بالعربية</label>
//               <input
//                 type="text"
//                 id="title_ar"
//                 name="title_ar"
//                 style={{...styles.input, textAlign: 'right'}}
//                 value={newMission.title_ar}
//                 onChange={handleInputChange}
//                 dir="rtl"
//                 required
//               />
//             </div>

//             {/* Champs contenu */}
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Description en Français</label>
//               <textarea
//                 id="content_fr"
//                 name="content_fr"
//                 rows="3"
//                 style={styles.textarea}
//                 value={newMission.content_fr}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Description en Anglais</label>
//               <textarea
//                 id="content_en"
//                 name="content_en"
//                 rows="3"
//                 style={styles.textarea}
//                 value={newMission.content_en}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Description en Arabe</label>
//               <textarea
//                 id="content_ar"
//                 name="content_ar"
//                 rows="3"
//                 style={{...styles.textarea, textAlign: 'right'}}
//                 value={newMission.content_ar}
//                 onChange={handleInputChange}
//                 dir="rtl"
//                 required
//               />
//             </div>

//             <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
//               <button type="submit" style={styles.submitButton}>
//                 {editingMissionId ? 'Mettre à jour' : 'Ajouter'}
//               </button>
//             </div>
//           </form>
//         </section>
//       )}

//       {/* Liste des missions */}
//       <h2 style={styles.title}>Liste des missions</h2>
      
//       <div style={styles.missionsList}>
//         {currentMissions.length === 0 ? (
//           <p>Aucune mission à afficher.</p>
//         ) : (
//           currentMissions.map((mission) => (
//             <div key={mission.id} style={styles.missionCard}>
//               <div
//                 onClick={() => toggleExpand(mission.id)}
//                 style={styles.missionHeader}
//               >
//                 <div>
//                   <h3 style={styles.missionTitle}>{mission.title_fr}</h3>
//                   <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
//                     <span style={{ marginRight: '10px' }}>EN: {mission.title_en}</span>
//                     <span dir="rtl" style={{ textAlign: 'right' }}>AR: {mission.title_ar}</span>
//                   </div>
//                 </div>
//                 <span>{expanded === mission.id ? '−' : '+'}</span>
//               </div>

//               {expanded === mission.id && (
//                 <div style={styles.missionContent}>
//                   <div style={styles.missionInfo}>
//                     <strong>Description (FR):</strong> {mission.content_fr}
//                   </div>
                  
//                   <div style={styles.languageSection}>
//                     <div style={styles.languageTitle}>Anglais</div>
//                     <div><strong>Titre:</strong> {mission.title_en}</div>
//                     <div><strong>Description:</strong> {mission.content_en}</div>
//                   </div>
                  
//                   <div style={styles.languageSection}>
//                     <div style={styles.languageTitle}>Arabe</div>
//                     <div dir="rtl" style={{textAlign: 'right'}}><strong>العنوان:</strong> {mission.title_ar}</div>
//                     <div dir="rtl" style={{textAlign: 'right'}}><strong>الوصف:</strong> {mission.content_ar}</div>
//                   </div>
                  
//                   <div style={styles.missionActions}>
//                     <button 
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleEdit(mission);
//                       }}
//                       style={{...styles.actionButton, ...styles.editButton}}
//                     >
//                       ✏️ Modifier
//                     </button>
//                     <button 
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleDelete(mission.id);
//                       }}
//                       style={{...styles.actionButton, ...styles.deleteButton}}
//                     >
//                       🗑️ Supprimer
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
      
//       {/* Pagination */}
//       {missions.length > itemsPerPage && (
//         <div style={styles.paginationContainer}>
//           <button 
//             onClick={() => paginate(Math.max(1, currentPage - 1))}
//             disabled={currentPage === 1}
//             style={{
//               ...styles.pageButton,
//               opacity: currentPage === 1 ? 0.5 : 1
//             }}
//           >
//             &laquo;
//           </button>
          
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
//             <button
//               key={number}
//               onClick={() => paginate(number)}
//               style={{
//                 ...styles.pageButton,
//                 ...(currentPage === number ? styles.activePageButton : {})
//               }}
//             >
//               {number}
//             </button>
//           ))}
          
//           <button 
//             onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
//             disabled={currentPage === totalPages}
//             style={{
//               ...styles.pageButton,
//               opacity: currentPage === totalPages ? 0.5 : 1
//             }}
//           >
//             &raquo;
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MissionPost;


// ✅ MissionPost.jsx
import React, { useState, useEffect } from "react";
import CONFIG from "../../config/config.js";
import { useTranslation } from "react-i18next";

const MissionPost = () => {
  const { t } = useTranslation();
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMission, setNewMission] = useState({
    title_fr: "",
    title_en: "",
    title_ar: "",
    content_fr: "",
    content_en: "",
    content_ar: "",
    image: null,
  });
  const [editingMissionId, setEditingMissionId] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const fetchMissions = async () => {
    try {
      const response = await fetch(CONFIG.API_MISSION_LIST);
      const data = await response.json();
      setMissions(data);
    } catch {
      setError("Erreur lors du chargement des missions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setNewMission((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CONFIG.CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CONFIG.CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    let imageUrl = null;
    if (newMission.image && typeof newMission.image !== "string") {
      imageUrl = await uploadToCloudinary(newMission.image);
    }

    const missionData = {
      ...newMission,
      image: imageUrl || newMission.image,
    };

    const method = editingMissionId ? "PUT" : "POST";
    const url = editingMissionId
      ? CONFIG.API_MISSION_UPDATE(editingMissionId)
      : CONFIG.API_MISSION_CREATE;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(missionData),
      });
      if (!res.ok) throw new Error("Erreur lors de la sauvegarde");
      const data = await res.json();

      if (editingMissionId) {
        setMissions((prev) =>
          prev.map((m) => (m.id === editingMissionId ? data : m))
        );
        setSuccessMessage("Mission mise à jour avec succès !");
      } else {
        setMissions((prev) => [...prev, data]);
        setSuccessMessage("Mission ajoutée avec succès !");
      }

      setNewMission({
        title_fr: "",
        title_en: "",
        title_ar: "",
        content_fr: "",
        content_en: "",
        content_ar: "",
        image: null,
      });
      setEditingMissionId(null);
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (mission) => {
    setNewMission({
      title_fr: mission.title_fr,
      title_en: mission.title_en,
      title_ar: mission.title_ar,
      content_fr: mission.content_fr,
      content_en: mission.content_en,
      content_ar: mission.content_ar,
      image: mission.image_url || null,
    });
    setEditingMissionId(mission.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette mission ?")) return;
    try {
      await fetch(CONFIG.API_MISSION_DELETE(id), { method: "DELETE" });
      setMissions((prev) => prev.filter((m) => m.id !== id));
      setSuccessMessage("Mission supprimée !");
    } catch {
      setError("Erreur lors de la suppression");
    }
  };

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-600 text-xl">Chargement...</div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {t("missions.title", "Gestion des Missions")}
        </h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) {
              setEditingMissionId(null);
              setNewMission({
                title_fr: "",
                title_en: "",
                title_ar: "",
                content_fr: "",
                content_en: "",
                content_ar: "",
                image: null,
              });
            }
          }}
          className="bg-indigo-800 text-white px-4 py-2 rounded-md"
        >
          {showForm ? "Fermer" : "Ajouter"}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>
      )}
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">
          {successMessage}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow p-6 rounded-lg mb-8 grid gap-4"
        >
          {["fr", "en", "ar"].map((lang) => (
            <div key={lang}>
              <label className="block font-medium mb-1">
                {t(`missions.title_${lang}`, `Titre (${lang.toUpperCase()})`)}
              </label>
              <input
                type="text"
                name={`title_${lang}`}
                value={newMission[`title_${lang}`]}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
                dir={lang === "ar" ? "rtl" : "ltr"}
                required
              />
              <textarea
                name={`content_${lang}`}
                value={newMission[`content_${lang}`]}
                onChange={handleInputChange}
                className="border p-2 rounded w-full mt-2"
                rows="3"
                dir={lang === "ar" ? "rtl" : "ltr"}
                placeholder={`Description (${lang.toUpperCase()})`}
                required
              />
            </div>
          ))}

          <div>
            <label className="block font-medium mb-1">Image (Cloudinary)</label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleInputChange}
              className="block w-full border rounded p-2"
            />
            {newMission.image && typeof newMission.image === "string" && (
              <img
                src={newMission.image}
                alt="Mission"
                className="mt-3 w-32 h-32 object-cover rounded"
              />
            )}
          </div>

          <button
            type="submit"
            className="bg-indigo-700 hover:bg-indigo-900 text-white px-4 py-2 rounded-md"
          >
            {editingMissionId ? "Mettre à jour" : "Créer"}
          </button>
        </form>
      )}

      <div className="grid gap-4">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition p-4"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpand(mission.id)}
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {mission.title_fr}
              </h3>
              <span>{expanded === mission.id ? "−" : "+"}</span>
            </div>

            {expanded === mission.id && (
              <div className="mt-3 border-t pt-3">
                {mission.image_url && (
                  <img
                    src={mission.image_url}
                    alt="mission"
                    className="w-full max-h-64 object-cover rounded mb-3"
                  />
                )}
                <p className="text-gray-700 mb-2">
                  <strong>FR:</strong> {mission.content_fr}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>EN:</strong> {mission.content_en}
                </p>
                <p
                  className="text-gray-700 text-right"
                  dir="rtl"
                >
                  <strong>AR:</strong> {mission.content_ar}
                </p>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleEdit(mission)}
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    ✏️ Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(mission.id)}
                    className="bg-red-200 text-red-700 px-3 py-1 rounded"
                  >
                    🗑️ Supprimer
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionPost;

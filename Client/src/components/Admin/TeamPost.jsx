// import React, { useEffect, useState } from 'react';

// const TeamMessage = () => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [newMessage, setNewMessage] = useState({
//     title_fr: "",
//     title_en: "",
//     title_ar: "",
//     content_en: "",
//     content_fr: "",
//     content_ar: "",
//   });
//   const [editingMessageId, setEditingMessageId] = useState(null);
//   const [error, setError] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [expanded, setExpanded] = useState(null);
//   const apiUrl = import.meta.env.VITE_API_BACKEND;
  
//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   // Récupérer tous les messages de l'API
//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await fetch(apiUrl + "/api/team-messages/");
//         if (!response.ok) {
//           throw new Error('Impossible de récupérer les messages');
//         }
//         const data = await response.json();
//         setMessages(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMessages();
//   }, []);

//   // Gestion de l'ajout de nouveaux messages
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewMessage((prev) => ({ ...prev, [name]: value }));
//   };

//   // Gestion de la soumission du formulaire (ajout ou modification)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const method = editingMessageId ? 'PUT' : 'POST';
//     const url = editingMessageId
//       ? `${apiUrl}/api/team-messages/${editingMessageId}/`
//       : `${apiUrl}/api/team-messages/`;

//     try {
//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newMessage),
//       });
//       if (!response.ok) {
//         throw new Error('Erreur lors de l\'envoi du message');
//       }
//       // Réinitialiser les champs après l'envoi
//       setNewMessage({
//         title_fr: "",
//         title_en: "",
//         title_ar: "",
//         content_en: "",
//         content_fr: "",
//         content_ar: "",
//       });
//       setEditingMessageId(null);
//       // Recharger la liste des messages
//       const data = await response.json();
//       if (editingMessageId) {
//         setMessages((prevMessages) =>
//           prevMessages.map((message) =>
//             message.id === editingMessageId ? data : message
//           )
//         );
//       } else {
//         setMessages((prevMessages) => [...prevMessages, data]);
//       }
//       setShowForm(false);
//       setError(null);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   // Fonction pour modifier un message
//   const handleEdit = (message) => {
//     setNewMessage({
//       title_fr: message.title_fr,
//       title_en: message.title_en,
//       title_ar: message.title_ar,
//       content_en: message.content_en,
//       content_fr: message.content_fr,
//       content_ar: message.content_ar,
//     });
//     setEditingMessageId(message.id);
//     setShowForm(true);
//     // Défiler jusqu'au formulaire
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Fonction pour supprimer un message
//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?');
//     if (confirmDelete) {
//       try {
//         const response = await fetch(`${apiUrl}/api/team-messages/${id}/`, {
//           method: 'DELETE',
//         });
//         if (!response.ok) {
//           throw new Error('Erreur lors de la suppression du message');
//         }
//         // Mettre à jour la liste après la suppression
//         setMessages((prevMessages) =>
//           prevMessages.filter((message) => message.id !== id)
//         );
//       } catch (error) {
//         setError(error.message);
//       }
//     }
//   };
  
//   // Fonction pour basculer l'affichage détaillé d'un message
//   const toggleExpand = (id) => {
//     setExpanded(expanded === id ? null : id);
//   };
  
//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentMessages = messages.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(messages.length / itemsPerPage);

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
//     messagesList: {
//       display: 'grid',
//       gap: '15px',
//     },
//     messageCard: {
//       border: '1px solid #eaeaea',
//       borderRadius: '8px',
//       overflow: 'hidden',
//       transition: 'box-shadow 0.3s',
//       backgroundColor: '#fff',
//     },
//     messageHeader: {
//       padding: '15px',
//       cursor: 'pointer',
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       backgroundColor: '#f5f5f5',
//     },
//     messageTitle: {
//       margin: 0,
//       fontSize: '18px',
//       fontWeight: '500',
//     },
//     messageContent: {
//       padding: '15px',
//     },
//     messageInfo: {
//       margin: '8px 0',
//     },
//     messageActions: {
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
//         <h1 style={styles.title}>Messages d'Équipe</h1>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           style={styles.addButton}
//         >
//           {showForm ? 'Fermer le formulaire' : 'Ajouter un message'}
//         </button>
//       </div>

//       {error && (
//         <div style={styles.errorMessage}>
//           Erreur: {error}
//         </div>
//       )}

//       {/* Formulaire d'ajout de message */}
//       {showForm && (
//         <section style={styles.formContainer}>
//           <h2 style={styles.title}>{editingMessageId ? 'Modifier le message' : 'Nouveau message'}</h2>
//           <form onSubmit={handleSubmit} style={styles.form}>
//             {/* Champs titre */}
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Titre en Français</label>
//               <input
//                 type="text"
//                 id="title_fr"
//                 name="title_fr"
//                 style={styles.input}
//                 value={newMessage.title_fr}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Title in English</label>
//               <input
//                 type="text"
//                 id="title_en"
//                 name="title_en"
//                 style={styles.input}
//                 value={newMessage.title_en}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>العنوان بالعربية</label>
//               <input
//                 type="text"
//                 id="title_ar"
//                 name="title_ar"
//                 style={{...styles.input, textAlign: 'right'}}
//                 value={newMessage.title_ar}
//                 onChange={handleInputChange}
//                 dir="rtl"
//               />
//             </div>

//             {/* Champs contenu */}
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Message en Français</label>
//               <textarea
//                 id="content_fr"
//                 name="content_fr"
//                 rows="3"
//                 style={styles.textarea}
//                 value={newMessage.content_fr}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Message en Anglais</label>
//               <textarea
//                 id="content_en"
//                 name="content_en"
//                 rows="3"
//                 style={styles.textarea}
//                 value={newMessage.content_en}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Message en Arabe</label>
//               <textarea
//                 id="content_ar"
//                 name="content_ar"
//                 rows="3"
//                 style={{...styles.textarea, textAlign: 'right'}}
//                 value={newMessage.content_ar}
//                 onChange={handleInputChange}
//                 dir="rtl"
//                 required
//               />
//             </div>

//             <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
//               <button type="submit" style={styles.submitButton}>
//                 {editingMessageId ? 'Mettre à jour' : 'Ajouter'}
//               </button>
//             </div>
//           </form>
//         </section>
//       )}

//       {/* Liste des messages */}
//       <h2 style={styles.title}>Liste des messages</h2>
      
//       <div style={styles.messagesList}>
//         {currentMessages.length === 0 ? (
//           <p>Aucun message à afficher.</p>
//         ) : (
//           currentMessages.map((message) => (
//             <div key={message.id} style={styles.messageCard}>
//               <div
//                 onClick={() => toggleExpand(message.id)}
//                 style={styles.messageHeader}
//               >
//                 <h3 style={styles.messageTitle}>{message.title_fr}</h3>
//                 <span>{expanded === message.id ? '−' : '+'}</span>
//               </div>

//               {expanded === message.id && (
//                 <div style={styles.messageContent}>
//                   <div style={styles.messageInfo}>
//                     <strong>Message (FR):</strong> {message.content_fr}
//                   </div>
                  
//                   <div style={styles.languageSection}>
//                     <div style={styles.languageTitle}>Anglais</div>
//                     <div><strong>Titre:</strong> {message.title_en}</div>
//                     <div><strong>Message:</strong> {message.content_en}</div>
//                   </div>
                  
//                   <div style={styles.languageSection}>
//                     <div style={styles.languageTitle}>Arabe</div>
//                     <div dir="rtl" style={{textAlign: 'right'}}><strong>العنوان:</strong> {message.title_ar}</div>
//                     <div dir="rtl" style={{textAlign: 'right'}}><strong>الرسالة:</strong> {message.content_ar}</div>
//                   </div>
                  
//                   <div style={styles.messageActions}>
//                     <button 
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleEdit(message);
//                       }}
//                       style={{...styles.actionButton, ...styles.editButton}}
//                     >
//                       ✏️ Modifier
//                     </button>
//                     <button 
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleDelete(message.id);
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
//       {messages.length > itemsPerPage && (
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

// export default TeamMessage;


import React, { useEffect, useState } from "react";
import CONFIG from "../../config/config.js";

const TeamMessage = () => {
  const [membres, setMembres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    role: "player",
    position: "",
    number: "",
    bio_fr: "",
    bio_en: "",
    bio_ar: "",
    photo: null,
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Charger les membres
  useEffect(() => {
    const fetchMembres = async () => {
      try {
        const response = await fetch(`${CONFIG.BASE_URL}/api/equipe/`);
        if (!response.ok) throw new Error("Erreur lors du chargement");
        const data = await response.json();
        setMembres(data.results || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMembres();
  }, []);

  // Input handler
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, photo: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Upload photo to Cloudinary
  const uploadToCloudinary = async (file) => {
    const formDataCloud = new FormData();
    formDataCloud.append("file", file);
    formDataCloud.append("upload_preset", CONFIG.CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CONFIG.CLOUDINARY_NAME}/image/upload`,
      { method: "POST", body: formDataCloud }
    );
    const data = await res.json();
    return data.secure_url;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = null;
      if (formData.photo && typeof formData.photo !== "string") {
        imageUrl = await uploadToCloudinary(formData.photo);
      } else if (typeof formData.photo === "string") {
        imageUrl = formData.photo;
      }

      const payload = {
        ...formData,
        photo: imageUrl,
      };

      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${CONFIG.BASE_URL}/api/equipe/${editingId}/`
        : `${CONFIG.BASE_URL}/api/equipe/`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Erreur lors de l'enregistrement");

      const saved = await response.json();

      setMembres((prev) =>
        editingId
          ? prev.map((m) => (m.id === editingId ? saved : m))
          : [...prev, saved]
      );

      // Reset form
      setFormData({
        first_name: "",
        last_name: "",
        role: "player",
        position: "",
        number: "",
        bio_fr: "",
        bio_en: "",
        bio_ar: "",
        photo: null,
      });
      setPreview(null);
      setEditingId(null);
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Edit
  const handleEdit = (membre) => {
    setFormData({
      ...membre,
      photo: membre.photo_url,
    });
    setPreview(membre.photo_url);
    setEditingId(membre.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce membre ?")) return;
    try {
      await fetch(`${CONFIG.BASE_URL}/api/equipe/${id}/`, { method: "DELETE" });
      setMembres((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = membres.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(membres.length / itemsPerPage);

  if (loading)
    return (
      <div className="text-center py-40 text-gray-600 text-lg">
        Chargement des membres...
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Gestion de l’équipe
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          {showForm ? "Fermer" : "➕ Ajouter un membre"}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      {/* ✅ FORMULAIRE */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md mb-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="first_name"
              placeholder="Prénom"
              value={formData.first_name}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Nom"
              value={formData.last_name}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="player">Joueur</option>
              <option value="coach">Entraîneur</option>
              <option value="staff">Staff</option>
            </select>
            <input
              type="text"
              name="position"
              placeholder="Poste (ex: Pivot)"
              value={formData.position}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="number"
              placeholder="Numéro"
              value={formData.number}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>

          {preview && (
            <div className="mt-3">
              <img
                src={preview}
                alt="Prévisualisation"
                className="w-32 h-32 object-cover rounded-lg shadow"
              />
            </div>
          )}

          <textarea
            name="bio_fr"
            placeholder="Bio en Français"
            value={formData.bio_fr}
            onChange={handleChange}
            className="border p-2 rounded w-full mt-4"
          ></textarea>
          <textarea
            name="bio_en"
            placeholder="Bio en Anglais"
            value={formData.bio_en}
            onChange={handleChange}
            className="border p-2 rounded w-full mt-2"
          ></textarea>
          <textarea
            name="bio_ar"
            placeholder="السيرة بالعربية"
            dir="rtl"
            value={formData.bio_ar}
            onChange={handleChange}
            className="border p-2 rounded w-full mt-2"
          ></textarea>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
          >
            {editingId ? "💾 Mettre à jour" : "➕ Ajouter"}
          </button>
        </form>
      )}

      {/* ✅ LISTE */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Liste des membres</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Photo</th>
              <th className="p-2">Nom</th>
              <th className="p-2">Rôle</th>
              <th className="p-2">Poste</th>
              <th className="p-2">Numéro</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((membre) => (
              <tr key={membre.id} className="border-b hover:bg-gray-50">
                <td className="p-2">
                  <img
                    src={membre.photo_url}
                    alt=""
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </td>
                <td className="p-2 font-medium">
                  {membre.first_name} {membre.last_name}
                </td>
                <td className="p-2 capitalize">{membre.role}</td>
                <td className="p-2">{membre.position || "-"}</td>
                <td className="p-2">{membre.number || "-"}</td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(membre)}
                    className="text-blue-600 hover:underline"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(membre.id)}
                    className="text-red-600 hover:underline"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {membres.length > itemsPerPage && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`px-3 py-1 rounded ${
                  num === currentPage
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMessage;

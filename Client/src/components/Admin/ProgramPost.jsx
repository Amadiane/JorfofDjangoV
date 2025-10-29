import React, { useState, useEffect } from "react";
import axios from "axios";
import CONFIG from "../../config/config.js";

const ProgramPost = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const initialForm = {
    home_team_name_fr: "",
    home_team_name_en: "",
    home_team_name_ar: "",
    away_team_name_fr: "",
    away_team_name_en: "",
    away_team_name_ar: "",
    location_fr: "",
    location_en: "",
    location_ar: "",
    match_date: "",
    match_time: "",
    description_fr: "",
    description_en: "",
    description_ar: "",
    home_score: 0,
    away_score: 0,
    home_team_logo: null,
    away_team_logo: null,
    banner_image: null,
  };

  const [formData, setFormData] = useState(initialForm);
  const [preview, setPreview] = useState({
    home_team_logo: null,
    away_team_logo: null,
    banner_image: null,
  });

  // === Charger les matchs ===
  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const { data } = await axios.get(CONFIG.API_MATCH_LIST);
      setMatches(data);
    } catch (err) {
      console.error("❌ Erreur chargement matchs :", err);
    }
  };

  // === Upload Cloudinary ===
  const uploadToCloudinary = async (file) => {
    if (!file || typeof file === "string") return file;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CONFIG.CLOUDINARY_UPLOAD_PRESET);

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CONFIG.CLOUDINARY_NAME}/upload`,
      data
    );
    return res.data.secure_url;
  };

  // === Gestion texte ===
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // === Gestion fichiers ===
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, [field]: file }));
    setPreview((prev) => ({ ...prev, [field]: URL.createObjectURL(file) }));
  };

  // === Soumission formulaire ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const [homeLogoURL, awayLogoURL, bannerURL] = await Promise.all([
        uploadToCloudinary(formData.home_team_logo),
        uploadToCloudinary(formData.away_team_logo),
        uploadToCloudinary(formData.banner_image),
      ]);

      const payload = {
        home_team_name_fr: formData.home_team_name_fr,
        home_team_name_en: formData.home_team_name_en,
        home_team_name_ar: formData.home_team_name_ar,
        away_team_name_fr: formData.away_team_name_fr,
        away_team_name_en: formData.away_team_name_en,
        away_team_name_ar: formData.away_team_name_ar,
        location_fr: formData.location_fr,
        location_en: formData.location_en,
        location_ar: formData.location_ar,
        match_date: formData.match_date,
        match_time: formData.match_time,
        description_fr: formData.description_fr,
        description_en: formData.description_en,
        description_ar: formData.description_ar,
        home_score: Number(formData.home_score),
        away_score: Number(formData.away_score),
        home_team_logo: homeLogoURL || "",
        away_team_logo: awayLogoURL || "",
        banner_image: bannerURL || "",
      };

      if (editId) {
        await axios.put(CONFIG.API_MATCH_UPDATE(editId), payload);
      } else {
        await axios.post(CONFIG.API_MATCH_CREATE, payload);
      }

      await fetchMatches();
      resetForm();
    } catch (err) {
      console.error("❌ Erreur soumission :", err.response?.data || err);
      alert("⚠️ Erreur lors de la soumission — vérifie les champs requis.");
    } finally {
      setLoading(false);
    }
  };

  // === Mode édition ===
  const handleEdit = (match) => {
    setEditId(match.id);
    setFormData({
      ...formData,
      ...match,
      home_team_logo: match.home_team_logo,
      away_team_logo: match.away_team_logo,
      banner_image: match.banner_image,
    });
    setPreview({
      home_team_logo: match.home_team_logo,
      away_team_logo: match.away_team_logo,
      banner_image: match.banner_image,
    });
  };

  // === Suppression ===
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce match ?")) return;
    try {
      await axios.delete(CONFIG.API_MATCH_DELETE(id));
      fetchMatches();
    } catch (err) {
      console.error("❌ Erreur suppression :", err);
    }
  };

  // === Reset ===
  const resetForm = () => {
    setFormData(initialForm);
    setPreview({
      home_team_logo: null,
      away_team_logo: null,
      banner_image: null,
    });
    setEditId(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🏀 Gestion des matchs</h2>

      {/* === FORMULAIRE === */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-100 p-4 rounded-lg shadow-md"
      >
        {/* Équipe à domicile */}
        <h3 className="font-semibold">🏠 Équipe à domicile</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {["fr", "en", "ar"].map((lang) => (
            <input
              key={`home_${lang}`}
              type="text"
              name={`home_team_name_${lang}`}
              placeholder={`Nom (${lang.toUpperCase()})`}
              value={formData[`home_team_name_${lang}`]}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "home_team_logo")}
            className="p-2 border rounded"
          />
          {preview.home_team_logo && (
            <img
              src={preview.home_team_logo}
              alt="home logo"
              className="w-12 h-12 rounded-full object-cover border"
            />
          )}
        </div>

        {/* Équipe adverse */}
        <h3 className="font-semibold mt-4">🚀 Équipe adverse</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {["fr", "en", "ar"].map((lang) => (
            <input
              key={`away_${lang}`}
              type="text"
              name={`away_team_name_${lang}`}
              placeholder={`Nom (${lang.toUpperCase()})`}
              value={formData[`away_team_name_${lang}`]}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "away_team_logo")}
            className="p-2 border rounded"
          />
          {preview.away_team_logo && (
            <img
              src={preview.away_team_logo}
              alt="away logo"
              className="w-12 h-12 rounded-full object-cover border"
            />
          )}
        </div>

        {/* Lieu */}
        <h3 className="font-semibold mt-4">📍 Lieu du match</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {["fr", "en", "ar"].map((lang) => (
            <input
              key={`loc_${lang}`}
              type="text"
              name={`location_${lang}`}
              placeholder={`Lieu (${lang.toUpperCase()})`}
              value={formData[`location_${lang}`]}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          ))}
        </div>

        {/* Date & Heure */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <input
            type="date"
            name="match_date"
            value={formData.match_date}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="time"
            name="match_time"
            value={formData.match_time}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </div>

        {/* Scores */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <input
            type="number"
            name="home_score"
            value={formData.home_score}
            onChange={handleChange}
            className="p-2 border rounded"
            placeholder="Score domicile"
          />
          <input
            type="number"
            name="away_score"
            value={formData.away_score}
            onChange={handleChange}
            className="p-2 border rounded"
            placeholder="Score extérieur"
          />
        </div>

        {/* Bannière */}
        <h3 className="font-semibold mt-4">🖼️ Bannière du match</h3>
        <div className="flex items-center gap-3">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "banner_image")}
            className="p-2 border rounded"
          />
          {preview.banner_image && (
            <img
              src={preview.banner_image}
              alt="banner"
              className="w-20 h-12 rounded object-cover border"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "⏳ Envoi..." : editId ? "💾 Modifier" : "🚀 Publier"}
        </button>
      </form>

      {/* === LISTE DES MATCHS === */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3">📅 Liste des matchs</h3>
        {matches.length === 0 ? (
          <p className="text-gray-500">Aucun match pour le moment.</p>
        ) : (
          matches.map((match) => (
            <div
              key={match.id}
              className="p-3 mb-3 border rounded flex items-center justify-between bg-white shadow-sm"
            >
              <div className="flex items-center gap-2">
                {match.home_team_logo && (
                  <img
                    src={match.home_team_logo}
                    alt="Home"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                )}
                <span className="font-bold">{match.home_team_name_fr}</span>
                <span>vs</span>
                {match.away_team_logo && (
                  <img
                    src={match.away_team_logo}
                    alt="Away"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                )}
                <span className="font-bold">{match.away_team_name_fr}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {match.match_date} — {match.match_time}
                </span>
                <button
                  onClick={() => handleEdit(match)}
                  className="text-blue-600 mr-2 hover:underline"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(match.id)}
                  className="text-red-600 hover:underline"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProgramPost;









// import React, { useState } from "react";
// import axios from "axios";
// import CONFIG from "../../config/config.js";

// const ProgramPost = () => {
//   const [form, setForm] = useState({
//     home_team_name_fr: "",
//     home_team_name_en: "",
//     home_team_name_ar: "",
//     away_team_name_fr: "",
//     away_team_name_en: "",
//     away_team_name_ar: "",
//     location_fr: "",
//     location_en: "",
//     location_ar: "",
//     match_date: "",
//     match_time: "",
//     description_fr: "",
//     description_en: "",
//     description_ar: "",
//     home_score: 0,
//     away_score: 0,
//     home_team_logo: null,
//     away_team_logo: null,
//     banner_image: null,
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       setForm((prev) => ({ ...prev, [name]: files[0] }));
//     } else {
//       setForm((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const uploadToCloudinary = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", CONFIG.CLOUDINARY_UPLOAD_PRESET);

//     const res = await fetch(
//       `https://api.cloudinary.com/v1_1/${CONFIG.CLOUDINARY_NAME}/image/upload`,
//       { method: "POST", body: formData }
//     );

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.error?.message || "Cloudinary upload failed");
//     return data.secure_url;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       // Upload Cloudinary si besoin
//       const homeLogoUrl = form.home_team_logo ? await uploadToCloudinary(form.home_team_logo) : null;
//       const awayLogoUrl = form.away_team_logo ? await uploadToCloudinary(form.away_team_logo) : null;
//       const bannerUrl = form.banner_image ? await uploadToCloudinary(form.banner_image) : null;

//       // Payload complet
//       const payload = {
//         home_team_name_fr: form.home_team_name_fr,
//         home_team_name_en: form.home_team_name_en,
//         home_team_name_ar: form.home_team_name_ar,
//         away_team_name_fr: form.away_team_name_fr,
//         away_team_name_en: form.away_team_name_en,
//         away_team_name_ar: form.away_team_name_ar,
//         location_fr: form.location_fr,
//         location_en: form.location_en,
//         location_ar: form.location_ar,
//         match_date: form.match_date,
//         match_time: form.match_time,
//         description_fr: form.description_fr,
//         description_en: form.description_en,
//         description_ar: form.description_ar,
//         home_score: form.home_score,
//         away_score: form.away_score,
//         home_team_logo: homeLogoUrl,
//         away_team_logo: awayLogoUrl,
//         banner_image: bannerUrl,
//       };

//       await axios.post(CONFIG.API_MATCH_CREATE, payload);

//       setMessage("✅ Match ajouté avec succès !");
//       setForm({
//         home_team_name_fr: "",
//         home_team_name_en: "",
//         home_team_name_ar: "",
//         away_team_name_fr: "",
//         away_team_name_en: "",
//         away_team_name_ar: "",
//         location_fr: "",
//         location_en: "",
//         location_ar: "",
//         match_date: "",
//         match_time: "",
//         description_fr: "",
//         description_en: "",
//         description_ar: "",
//         home_score: 0,
//         away_score: 0,
//         home_team_logo: null,
//         away_team_logo: null,
//         banner_image: null,
//       });
//     } catch (err) {
//       console.error("Erreur soumission :", err.response?.data || err);
//       setMessage("❌ Erreur lors de la soumission du match. Vérifie tous les champs.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
//       <h2 className="text-2xl font-semibold mb-4">🏀 Ajouter un match</h2>

//       {message && (
//         <div
//           className={`p-3 rounded mb-4 ${
//             message.startsWith("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//           }`}
//         >
//           {message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Logos */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label>🏠 Logo de ton club</label>
//             <input type="file" name="home_team_logo" onChange={handleChange} className="w-full border p-2" />
//           </div>
//           <div>
//             <label>🚩 Logo du club adverse</label>
//             <input type="file" name="away_team_logo" onChange={handleChange} className="w-full border p-2" />
//           </div>
//         </div>

//         {/* Bannière */}
//         <div>
//           <label>🖼️ Affiche principale (bannière)</label>
//           <input type="file" name="banner_image" onChange={handleChange} className="w-full border p-2" />
//         </div>

//         {/* Noms des clubs */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label>🏠 Équipe à domicile</label>
//             <input type="text" name="home_team_name_fr" placeholder="Nom FR" value={form.home_team_name_fr} onChange={handleChange} className="w-full border p-2 mb-1" required />
//             <input type="text" name="home_team_name_en" placeholder="Name EN" value={form.home_team_name_en} onChange={handleChange} className="w-full border p-2 mb-1" required />
//             <input type="text" name="home_team_name_ar" placeholder="الاسم بالعربية" value={form.home_team_name_ar} onChange={handleChange} className="w-full border p-2" required />
//           </div>

//           <div>
//             <label>🚩 Équipe adverse</label>
//             <input type="text" name="away_team_name_fr" placeholder="Nom FR" value={form.away_team_name_fr} onChange={handleChange} className="w-full border p-2 mb-1" required />
//             <input type="text" name="away_team_name_en" placeholder="Name EN" value={form.away_team_name_en} onChange={handleChange} className="w-full border p-2 mb-1" required />
//             <input type="text" name="away_team_name_ar" placeholder="الاسم بالعربية" value={form.away_team_name_ar} onChange={handleChange} className="w-full border p-2" required />
//           </div>
//         </div>

//         {/* Lieux */}
//         <div className="grid grid-cols-3 gap-4">
//           <div>
//             <label>📍 Lieu (FR)</label>
//             <input type="text" name="location_fr" value={form.location_fr} onChange={handleChange} className="w-full border p-2" required />
//           </div>
//           <div>
//             <label>📍 Location (EN)</label>
//             <input type="text" name="location_en" value={form.location_en} onChange={handleChange} className="w-full border p-2" required />
//           </div>
//           <div>
//             <label>📍 الموقع (AR)</label>
//             <input type="text" name="location_ar" value={form.location_ar} onChange={handleChange} className="w-full border p-2" required />
//           </div>
//         </div>

//         {/* Date & Heure */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label>📅 Date du match</label>
//             <input type="date" name="match_date" value={form.match_date} onChange={handleChange} className="w-full border p-2" required />
//           </div>
//           <div>
//             <label>⏰ Heure du match</label>
//             <input type="time" name="match_time" value={form.match_time} onChange={handleChange} className="w-full border p-2" required />
//           </div>
//         </div>

//         {/* Scores */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label>🏀 Score domicile</label>
//             <input type="number" name="home_score" value={form.home_score} onChange={handleChange} className="w-full border p-2" min="0" />
//           </div>
//           <div>
//             <label>🏀 Score extérieur</label>
//             <input type="number" name="away_score" value={form.away_score} onChange={handleChange} className="w-full border p-2" min="0" />
//           </div>
//         </div>

//         {/* Descriptions */}
//         <div>
//           <label>📝 Description</label>
//           <textarea name="description_fr" placeholder="Description FR" value={form.description_fr} onChange={handleChange} className="w-full border p-2 mb-1" />
//           <textarea name="description_en" placeholder="Description EN" value={form.description_en} onChange={handleChange} className="w-full border p-2 mb-1" />
//           <textarea name="description_ar" placeholder="الوصف بالعربية" value={form.description_ar} onChange={handleChange} className="w-full border p-2" />
//         </div>

//         <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg">
//           {loading ? "⏳ Envoi en cours..." : "✅ Ajouter le match"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProgramPost;

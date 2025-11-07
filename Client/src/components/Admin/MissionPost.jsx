import React, { useState, useEffect } from "react";
import { Target, Loader2, Trash2, PlusCircle, Edit2, X, ChevronDown, ChevronUp } from "lucide-react";
import CONFIG from "../../config/config.js";
import { useTranslation } from "react-i18next";

const MissionPost = () => {
  const { t } = useTranslation();
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMissionId, setEditingMissionId] = useState(null);
  const [selectedMission, setSelectedMission] = useState(null);
  const [preview, setPreview] = useState(null);

  const [newMission, setNewMission] = useState({
    title_fr: "",
    title_en: "",
    title_ar: "",
    content_fr: "",
    content_en: "",
    content_ar: "",
    image: null,
  });

  // Charger les missions
  useEffect(() => {
    fetchMissions();
  }, []);

  const fetchMissions = async () => {
    setFetchLoading(true);
    try {
      const response = await fetch(CONFIG.API_MISSION_LIST);
      if (!response.ok) throw new Error("Erreur lors du chargement");
      const data = await response.json();
      setMissions(data);
    } catch (err) {
      console.error(err);
      setError("Erreur lors du chargement des missions");
    } finally {
      setFetchLoading(false);
    }
  };

  // Upload vers Cloudinary
  const uploadToCloudinary = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CONFIG.CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CONFIG.CLOUDINARY_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      console.error("Erreur upload Cloudinary:", err);
      return null;
    }
  };

  // Gestion des champs
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setNewMission((prev) => ({ ...prev, [name]: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setNewMission((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    setNewMission({
      title_fr: "",
      title_en: "",
      title_ar: "",
      content_fr: "",
      content_en: "",
      content_ar: "",
      image: null,
    });
    setPreview(null);
    setEditingMissionId(null);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      let imageUrl = null;
      if (newMission.image && typeof newMission.image !== "string") {
        imageUrl = await uploadToCloudinary(newMission.image);
      } else if (typeof newMission.image === "string") {
        imageUrl = newMission.image;
      }

      const missionData = {
        ...newMission,
        image: imageUrl,
      };

      const method = editingMissionId ? "PUT" : "POST";
      const url = editingMissionId
        ? CONFIG.API_MISSION_UPDATE(editingMissionId)
        : CONFIG.API_MISSION_CREATE;

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

      resetForm();
      setShowForm(false);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la sauvegarde");
    } finally {
      setLoading(false);
    }
  };

  // Modifier
  const handleEdit = (mission) => {
    setNewMission({
      title_fr: mission.title_fr || "",
      title_en: mission.title_en || "",
      title_ar: mission.title_ar || "",
      content_fr: mission.content_fr || "",
      content_en: mission.content_en || "",
      content_ar: mission.content_ar || "",
      image: mission.image_url || null,
    });
    setPreview(mission.image_url || null);
    setEditingMissionId(mission.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Supprimer
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette mission ?")) return;
    try {
      await fetch(CONFIG.API_MISSION_DELETE(id), { method: "DELETE" });
      setMissions((prev) => prev.filter((m) => m.id !== id));
      setSuccessMessage("Mission supprimée avec succès !");
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la suppression");
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin inline-block text-orange-500" size={40} />
          <p className="mt-4 text-gray-300 text-lg">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] relative overflow-hidden">
      {/* Effets de fond lumineux */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 w-64 md:w-96 h-64 md:h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grille de fond */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

      <div className="relative max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500/30 blur-xl rounded-lg"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white">
              {t("missions.title", "Gestion des Missions")}
            </h1>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) resetForm();
            }}
            className="relative group w-full md:w-auto"
          >
            <div className="absolute inset-0 bg-orange-500/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
            <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-lg hover:shadow-xl hover:shadow-orange-500/50 transition-all flex items-center justify-center gap-2 font-semibold">
              <PlusCircle size={18} /> {showForm ? "Fermer" : "Nouvelle Mission"}
            </div>
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-500/20 border-2 border-red-500/50 text-red-300 p-4 mb-6 rounded-xl backdrop-blur-sm">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-500/20 border-2 border-green-500/50 text-green-300 p-4 mb-6 rounded-xl backdrop-blur-sm">
            {successMessage}
          </div>
        )}

        {/* FORMULAIRE */}
        {showForm && (
          <div className="relative mb-8">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-blue-500 to-purple-500 rounded-2xl blur opacity-20"></div>
            <div className="relative bg-[#0f1729]/90 backdrop-blur-xl shadow-2xl p-6 md:p-8 rounded-2xl border-2 border-orange-500/30">
              <h2 className="text-xl font-bold text-white mb-6">
                {editingMissionId ? "✏️ Modifier la mission" : "➕ Ajouter une mission"}
              </h2>
              
              <div className="space-y-6">
                {/* Français */}
                <div className="bg-white/5 p-4 rounded-xl border border-blue-500/30">
                  <p className="text-sm font-bold text-blue-400 mb-3">🇫🇷 FRANÇAIS</p>
                  <div className="space-y-3">
                    <div>
                      <label className="block font-semibold text-gray-300 mb-2">Titre *</label>
                      <input
                        type="text"
                        name="title_fr"
                        value={newMission.title_fr}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border-2 border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-300 mb-2">Description *</label>
                      <textarea
                        name="content_fr"
                        value={newMission.content_fr}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 bg-white/10 border-2 border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all resize-none"
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Anglais */}
                <div className="bg-white/5 p-4 rounded-xl border border-green-500/30">
                  <p className="text-sm font-bold text-green-400 mb-3">🇬🇧 ENGLISH</p>
                  <div className="space-y-3">
                    <div>
                      <label className="block font-semibold text-gray-300 mb-2">Title *</label>
                      <input
                        type="text"
                        name="title_en"
                        value={newMission.title_en}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border-2 border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-300 mb-2">Description *</label>
                      <textarea
                        name="content_en"
                        value={newMission.content_en}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 bg-white/10 border-2 border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-all resize-none"
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Arabe */}
                <div className="bg-white/5 p-4 rounded-xl border border-purple-500/30">
                  <p className="text-sm font-bold text-purple-400 mb-3">🇸🇦 العربية</p>
                  <div className="space-y-3">
                    <div>
                      <label className="block font-semibold text-gray-300 mb-2 text-right" dir="rtl">العنوان *</label>
                      <input
                        type="text"
                        name="title_ar"
                        value={newMission.title_ar}
                        onChange={handleInputChange}
                        dir="rtl"
                        className="w-full px-4 py-3 bg-white/10 border-2 border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-300 mb-2 text-right" dir="rtl">الوصف *</label>
                      <textarea
                        name="content_ar"
                        value={newMission.content_ar}
                        onChange={handleInputChange}
                        dir="rtl"
                        rows="3"
                        className="w-full px-4 py-3 bg-white/10 border-2 border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all resize-none"
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div>
                  <label className="block font-semibold text-gray-300 mb-2">🖼️ Image de la mission</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 bg-white/10 border-2 border-orange-500/30 rounded-lg text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-500 file:text-white hover:file:bg-orange-600 transition-all"
                  />
                  {preview && (
                    <div className="mt-4 relative inline-block">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-purple-500 rounded-xl blur opacity-50"></div>
                      <div className="relative bg-white p-4 rounded-xl">
                        <img src={preview} alt="Aperçu" className="w-full max-w-xs h-32 object-contain" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="relative group overflow-hidden flex-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-2xl hover:shadow-orange-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          Enregistrement...
                        </>
                      ) : (
                        editingMissionId ? "Mettre à jour" : "Ajouter"
                      )}
                    </div>
                  </button>
                  <button
                    onClick={resetForm}
                    className="bg-gray-600/30 border-2 border-gray-500/50 text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-600/50 transition-all font-semibold"
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LISTE DES MISSIONS */}
        <div className="space-y-4">
          {missions.length === 0 ? (
            <div className="text-center py-12">
              <Target size={64} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400 text-lg">Aucune mission pour le moment</p>
            </div>
          ) : (
            missions.map((mission) => (
              <div key={mission.id} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-blue-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                <div className="relative bg-[#0f1729]/90 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden border-2 border-white/10 group-hover:border-orange-500/50">
                  
                  {/* Header cliquable */}
                  <div 
                    className="p-4 md:p-6 cursor-pointer flex justify-between items-center gap-4"
                    onClick={() => setSelectedMission(selectedMission === mission.id ? null : mission.id)}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {mission.image_url && (
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-purple-500 rounded-lg blur opacity-50"></div>
                          <img
                            src={mission.image_url}
                            alt=""
                            className="relative w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-orange-400 transition-colors truncate">
                          {mission.title_fr}
                        </h3>
                        <p className="text-sm text-gray-400 truncate">{mission.title_en}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(mission);
                        }}
                        className="bg-blue-500/20 border border-blue-500/50 text-blue-300 p-2 rounded-lg hover:bg-blue-500/30 transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(mission.id);
                        }}
                        className="bg-red-500/20 border border-red-500/50 text-red-300 p-2 rounded-lg hover:bg-red-500/30 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                      {selectedMission === mission.id ? (
                        <ChevronUp className="text-gray-400" size={20} />
                      ) : (
                        <ChevronDown className="text-gray-400" size={20} />
                      )}
                    </div>
                  </div>

                  {/* Détails expandables */}
                  {selectedMission === mission.id && (
                    <div className="px-4 md:px-6 pb-4 md:pb-6 space-y-4 border-t border-white/10 pt-4">
                      {mission.image_url && (
                        <div className="relative">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-purple-500 rounded-xl blur opacity-30"></div>
                          <img
                            src={mission.image_url}
                            alt="Mission"
                            className="relative w-full max-h-64 object-cover rounded-xl"
                          />
                        </div>
                      )}

                      <div className="bg-white/5 p-4 rounded-xl border border-blue-500/30">
                        <p className="text-xs font-bold text-blue-400 mb-2">🇫🇷 FRANÇAIS</p>
                        <p className="text-gray-300 leading-relaxed">{mission.content_fr}</p>
                      </div>

                      <div className="bg-white/5 p-4 rounded-xl border border-green-500/30">
                        <p className="text-xs font-bold text-green-400 mb-2">🇬🇧 ENGLISH</p>
                        <p className="text-gray-300 leading-relaxed">{mission.content_en}</p>
                      </div>

                      <div className="bg-white/5 p-4 rounded-xl border border-purple-500/30" dir="rtl">
                        <p className="text-xs font-bold text-purple-400 mb-2">🇸🇦 العربية</p>
                        <p className="text-gray-300 leading-relaxed">{mission.content_ar}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MissionPost;
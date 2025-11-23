import React, { useEffect, useState } from "react";
import { Users, Loader2, Trash2, PlusCircle, Edit2, X, UserCircle, ChevronLeft, ChevronRight } from "lucide-react";
import CONFIG from "../../config/config.js";

const TeamMessage = () => {
  const [membres, setMembres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [preview, setPreview] = useState(null);

  // 🔹 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  // Charger TOUS les membres (pagination backend)
  useEffect(() => {
    fetchMembres();
  }, []);

  const fetchMembres = async () => {
    setFetchLoading(true);
    try {
      let url = `${CONFIG.BASE_URL}/api/equipe/`;
      let allResults = [];

      // Récupérer toutes les pages de l'API Django paginée
      while (url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erreur lors du chargement");

        const data = await response.json();
        
        // Django peut renvoyer { results: [...], next: "..." } ou directement un tableau
        const results = data.results || data;
        allResults = [...allResults, ...results];
        
        // Continuer si il y a une page suivante
        url = data.next;
      }

      setMembres(allResults);
      console.log(`✅ ${allResults.length} membres chargés`);
    } catch (err) {
      console.error(err);
      setError("Erreur lors du chargement des membres");
    } finally {
      setFetchLoading(false);
    }
  };

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
    if (!file) return null;

    const formDataCloud = new FormData();
    formDataCloud.append("file", file);
    formDataCloud.append("upload_preset", CONFIG.CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CONFIG.CLOUDINARY_NAME}/image/upload`,
        { method: "POST", body: formDataCloud }
      );
      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      console.error("Erreur upload Cloudinary:", err);
      return null;
    }
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
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
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

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

      setSuccessMessage(editingId ? "Membre mis à jour avec succès !" : "Membre ajouté avec succès !");
      resetForm();
      setShowForm(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la sauvegarde");
    } finally {
      setLoading(false);
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
      setSuccessMessage("Membre supprimé avec succès !");
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la suppression");
    }
  };

  // Badge de rôle
  const getRoleBadge = (role) => {
    const badges = {
      player: { label: "Joueur", color: "from-blue-500 to-blue-600" },
      coach: { label: "Entraîneur", color: "from-green-500 to-green-600" },
      staff: { label: "Staff", color: "from-purple-500 to-purple-600" },
    };
    return badges[role] || badges.player;
  };

  // 🔹 Pagination frontend
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMembres = membres.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(membres.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 300, behavior: "smooth" });
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
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white">
                Gestion de l'Équipe
              </h1>
              <p className="text-sm text-gray-400 font-semibold">
                {membres.length} membre{membres.length !== 1 ? "s" : ""} au total
              </p>
            </div>
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
              {showForm ? <X size={18} /> : <PlusCircle size={18} />}
              {showForm ? "Fermer" : "Nouveau Membre"}
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
                {editingId ? "✏️ Modifier le membre" : "➕ Ajouter un membre"}
              </h2>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-300 mb-2">Prénom *</label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border-2 border-orange-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-300 mb-2">Nom *</label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border-2 border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-300 mb-2">Rôle *</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border-2 border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500 transition-all"
                    >
                      <option value="player" className="bg-[#0f1729]">Joueur</option>
                      <option value="coach" className="bg-[#0f1729]">Entraîneur</option>
                      <option value="staff" className="bg-[#0f1729]">Staff</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-300 mb-2">Poste</label>
                    <input
                      type="text"
                      name="position"
                      placeholder="ex: Pivot"
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border-2 border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-300 mb-2">Numéro</label>
                    <input
                      type="number"
                      name="number"
                      placeholder="00"
                      value={formData.number}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border-2 border-pink-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-300 mb-2">📸 Photo *</label>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleChange}
                    className="block w-full px-4 py-3 bg-white/10 border-2 border-orange-500/30 rounded-lg text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-500 file:text-white hover:file:bg-orange-600 transition-all"
                  />
                  {preview && (
                    <div className="mt-4 relative inline-block">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-purple-500 rounded-xl blur opacity-50"></div>
                      <div className="relative bg-white p-2 rounded-xl">
                        <img src={preview} alt="Aperçu" className="w-32 h-32 object-cover rounded-lg" />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-gray-300 mb-2">🇫🇷 Bio en Français</label>
                  <textarea
                    name="bio_fr"
                    placeholder="Biographie en français..."
                    value={formData.bio_fr}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 bg-white/10 border-2 border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-semibold text-gray-300 mb-2">🇬🇧 Bio en Anglais</label>
                  <textarea
                    name="bio_en"
                    placeholder="Biography in English..."
                    value={formData.bio_en}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 bg-white/10 border-2 border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-all resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-semibold text-gray-300 mb-2">🇸🇦 السيرة بالعربية</label>
                  <textarea
                    name="bio_ar"
                    placeholder="السيرة الذاتية..."
                    dir="rtl"
                    value={formData.bio_ar}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 bg-white/10 border-2 border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all resize-none"
                  ></textarea>
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
                        editingId ? "Mettre à jour" : "Ajouter"
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

        {/* GRID DES MEMBRES */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {currentMembres.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Users size={64} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400 text-lg">Aucun membre pour le moment</p>
            </div>
          ) : (
            currentMembres.map((membre) => {
              const roleBadge = getRoleBadge(membre.role);
              return (
                <div key={membre.id} className="relative group cursor-pointer" onClick={() => setSelectedMember(membre)}>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-blue-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500"></div>
                  <div className="relative bg-[#0f1729]/90 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden border-2 border-white/10 group-hover:border-orange-500/50 h-full flex flex-col">
                    {/* Photo */}
                    <div className="relative aspect-square bg-gradient-to-br from-orange-500/10 to-purple-500/10">
                      {membre.photo_url ? (
                        <img
                          src={membre.photo_url}
                          alt={`${membre.first_name} ${membre.last_name}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <UserCircle size={64} className="text-white/30" />
                        </div>
                      )}
                      {/* Badge numéro */}
                      {membre.number && (
                        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white font-bold px-3 py-1 rounded-full text-sm border border-orange-500/50">
                          #{membre.number}
                        </div>
                      )}
                    </div>
                    
                    {/* Contenu */}
                    <div className="p-3 flex-1 flex flex-col">
                      <h3 className="text-sm font-bold text-white mb-1 line-clamp-1 group-hover:text-orange-400 transition-colors text-center">
                        {membre.first_name} {membre.last_name}
                      </h3>
                      
                      <div className="flex flex-col gap-1 mb-2">
                        <span className={`text-xs font-semibold text-center px-2 py-1 rounded-lg bg-gradient-to-r ${roleBadge.color} text-white`}>
                          {roleBadge.label}
                        </span>
                        {membre.position && (
                          <span className="text-xs text-gray-400 text-center">
                            {membre.position}
                          </span>
                        )}
                      </div>
                      
                      {/* Actions */}
                      <div className="flex gap-1 mt-auto pt-2 border-t border-white/10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(membre);
                          }}
                          className="flex-1 bg-blue-500/20 border border-blue-500/50 text-blue-300 px-2 py-1.5 rounded-lg hover:bg-blue-500/30 transition-all text-xs font-semibold flex items-center justify-center gap-1"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(membre.id);
                          }}
                          className="flex-1 bg-red-500/20 border border-red-500/50 text-red-300 px-2 py-1.5 rounded-lg hover:bg-red-500/30 transition-all text-xs font-semibold flex items-center justify-center gap-1"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* 🔹 PAGINATION */}
        {membres.length > itemsPerPage && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {/* Bouton précédent */}
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative group disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-orange-500/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
              <div className="relative bg-white/10 border-2 border-orange-500/30 text-white px-4 py-2 rounded-lg hover:bg-orange-500/20 hover:border-orange-500/50 transition-all flex items-center gap-2 font-semibold">
                <ChevronLeft size={18} />
                <span className="hidden sm:inline">Précédent</span>
              </div>
            </button>

            {/* Numéros de pages */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`relative group ${currentPage === number ? '' : 'hover:scale-110'} transition-transform`}
                >
                  {currentPage === number && (
                    <div className="absolute inset-0 bg-orange-500/50 blur-lg"></div>
                  )}
                  <div className={`relative px-4 py-2 rounded-lg font-bold transition-all ${
                    currentPage === number
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl shadow-orange-500/50 border-2 border-orange-400'
                      : 'bg-white/10 border-2 border-white/20 text-gray-300 hover:bg-white/20 hover:border-white/40'
                  }`}>
                    {number}
                  </div>
                </button>
              ))}
            </div>

            {/* Bouton suivant */}
            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="relative group disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-orange-500/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
              <div className="relative bg-white/10 border-2 border-orange-500/30 text-white px-4 py-2 rounded-lg hover:bg-orange-500/20 hover:border-orange-500/50 transition-all flex items-center gap-2 font-semibold">
                <span className="hidden sm:inline">Suivant</span>
                <ChevronRight size={18} />
              </div>
            </button>
          </div>
        )}

        {/* MODAL DÉTAILS - Identique au code précédent */}
        {selectedMember && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
            onClick={() => setSelectedMember(null)}
          >
            <div 
              className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-blue-500 to-purple-500 rounded-3xl blur-xl opacity-50"></div>
              <div className="relative bg-[#0a0e27] rounded-3xl shadow-2xl border-2 border-orange-500/30 overflow-hidden">
                {/* Photo grande taille */}
                <div className="relative h-80 bg-gradient-to-br from-orange-500/20 to-purple-500/20">
                  {selectedMember.photo_url ? (
                    <img
                      src={selectedMember.photo_url}
                      alt={`${selectedMember.first_name} ${selectedMember.last_name}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <UserCircle size={128} className="text-white/30" />
                    </div>
                  )}
                  {selectedMember.number && (
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white font-black px-6 py-3 rounded-2xl text-3xl border-2 border-orange-500/50">
                      #{selectedMember.number}
                    </div>
                  )}
                </div>
                
                {/* Contenu */}
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-start gap-4 mb-6">
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                        {selectedMember.first_name} {selectedMember.last_name}
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        <span className={`text-sm font-semibold px-4 py-2 rounded-lg bg-gradient-to-r ${getRoleBadge(selectedMember.role).color} text-white`}>
                          {getRoleBadge(selectedMember.role).label}
                        </span>
                        {selectedMember.position && (
                          <span className="text-sm font-semibold px-4 py-2 rounded-lg bg-white/10 text-orange-400 border border-orange-500/30">
                            {selectedMember.position}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedMember(null)}
                      className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-all"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Biographies */}
                  {(selectedMember.bio_fr || selectedMember.bio_en || selectedMember.bio_ar) && (
                    <div className="space-y-4 mb-6">
                      {selectedMember.bio_fr && (
                        <div className="bg-white/5 p-4 rounded-xl border border-blue-500/30">
                          <p className="text-xs font-bold text-blue-400 mb-2">🇫🇷 BIOGRAPHIE</p>
                          <p className="text-gray-300 leading-relaxed">{selectedMember.bio_fr}</p>
                        </div>
                      )}
                      {selectedMember.bio_en && (
                        <div className="bg-white/5 p-4 rounded-xl border border-green-500/30">
                          <p className="text-xs font-bold text-green-400 mb-2">🇬🇧 BIOGRAPHY</p>
                          <p className="text-gray-300 leading-relaxed">{selectedMember.bio_en}</p>
                        </div>
                      )}
                      {selectedMember.bio_ar && (
                        <div className="bg-white/5 p-4 rounded-xl border border-purple-500/30" dir="rtl">
                          <p className="text-xs font-bold text-purple-400 mb-2">🇸🇦 السيرة الذاتية</p>
                          <p className="text-gray-300 leading-relaxed">{selectedMember.bio_ar}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        handleEdit(selectedMember);
                        setSelectedMember(null);
                      }}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-xl hover:shadow-blue-500/50 transition-all font-bold flex items-center justify-center gap-2"
                    >
                      <Edit2 size={18} /> Modifier
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(selectedMember.id);
                        setSelectedMember(null);
                      }}
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:shadow-xl hover:shadow-red-500/50 transition-all font-bold flex items-center justify-center gap-2"
                    >
                      <Trash2 size={18} /> Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMessage;
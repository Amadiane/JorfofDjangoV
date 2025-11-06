import React, { useEffect, useState } from "react";
import axios from "axios";
import { Home, Loader2, Trash2, PlusCircle } from "lucide-react";
import CONFIG from "../../config/config.js";
import { useTranslation } from "react-i18next";

function HomePost() {
  const { t } = useTranslation();
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingHome, setEditingHome] = useState(null);
  const [formData, setFormData] = useState({
    title_fr: "",
    title_en: "",
    description_fr: "",
    description_en: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  // 🔄 Charger tous les postes Home
  useEffect(() => {
    fetchHomes();
  }, []);

  const fetchHomes = async () => {
    setFetchLoading(true);
    try {
      const res = await axios.get(CONFIG.API_HOME_LIST);
      setHomes(res.data);
    } catch (err) {
      console.error(err);
      setError("Erreur lors du chargement des postes Home");
    } finally {
      setFetchLoading(false);
    }
  };

  // 📝 Gestion des champs
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 🔄 Réinitialiser le formulaire
  const resetForm = () => {
    setFormData({
      title_fr: "",
      title_en: "",
      description_fr: "",
      description_en: "",
      image: null,
    });
    setPreview(null);
    setEditingHome(null);
  };

  // ✅ Créer ou Mettre à jour
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) form.append(key, value);
      });

      if (editingHome && editingHome.id) {
        // PATCH pour modifier
        await axios.patch(CONFIG.API_HOME_UPDATE(editingHome.id), form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccessMessage("Post Home mis à jour avec succès !");
      } else {
        // POST pour créer
        await axios.post(CONFIG.API_HOME_CREATE, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccessMessage("Post Home créé avec succès !");
      }
      resetForm();
      fetchHomes();
      setShowForm(false);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la sauvegarde");
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Supprimer un Home
  const handleDelete = async (homeId) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce poste ?")) return;

    try {
      await axios.delete(CONFIG.API_HOME_DELETE(homeId));
      setSuccessMessage("Post Home supprimé avec succès !");
      fetchHomes();
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la suppression");
    }
  };

  // 🔄 Préparer le formulaire pour modification
  const handleEdit = (home) => {
    setEditingHome(home);
    setFormData({
      title_fr: home.title_fr,
      title_en: home.title_en || "",
      description_fr: home.description_fr,
      description_en: home.description_en || "",
      image: null,
    });
    setPreview(home.image_url || null);
    setShowForm(true);
  };

  if (fetchLoading) {
    return (
      <div className="text-center mt-20 text-gray-600 text-xl">
        <Loader2 className="animate-spin inline-block" size={40} />
        <p className="mt-2">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Home size={32} />
          {t("home.title", "Gestion des postes Home")}
        </h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) resetForm();
          }}
          className="bg-indigo-800 text-white px-4 py-2 rounded-md hover:bg-indigo-900 transition flex items-center gap-2"
        >
          <PlusCircle size={18} /> {showForm ? "Fermer" : "Ajouter"}
        </button>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}
      {successMessage && <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">{successMessage}</div>}

      {/* 🧾 FORMULAIRE */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-lg mb-8 grid gap-4">
          <div>
            <label className="block font-medium mb-1">Titre (FR)</label>
            <input
              type="text"
              name="title_fr"
              value={formData.title_fr}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Titre (EN)</label>
            <input
              type="text"
              name="title_en"
              value={formData.title_en}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Description (FR)</label>
            <textarea
              name="description_fr"
              value={formData.description_fr}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              rows={3}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Description (EN)</label>
            <textarea
              name="description_en"
              value={formData.description_en}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              rows={3}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Image</label>
            <input type="file" name="image" accept="image/*" onChange={handleChange} className="block w-full border rounded p-2" />
            {preview && <img src={preview} alt="Aperçu" className="mt-3 w-32 h-32 object-cover rounded" />}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-700 hover:bg-indigo-900 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Enregistrement..." : editingHome ? "Mettre à jour" : "Créer"}
          </button>
        </form>
      )}

      {/* 🖼️ LISTE DES POSTS */}
      {homes.map((home) => (
        <div key={home.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 mb-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">{home.title_fr}</h3>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(home)} className="bg-yellow-200 px-3 py-1 rounded hover:bg-yellow-300 transition">✏️ Modifier</button>
              <button onClick={() => handleDelete(home.id)} className="bg-red-200 text-red-700 px-3 py-1 rounded hover:bg-red-300 transition flex items-center gap-1">
                <Trash2 size={16} /> Supprimer
              </button>
            </div>
          </div>
          {home.image_url && <img src={home.image_url} alt={home.title_fr} className="mt-3 w-full max-h-64 object-cover rounded" />}
          <p className="mt-2 text-gray-700">{home.description_fr}</p>
        </div>
      ))}
    </div>
  );
}

export default HomePost;

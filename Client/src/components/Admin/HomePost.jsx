import React, { useEffect, useState } from "react";
import axios from "axios";
import { Home, Loader2, Save, Trash2, PlusCircle } from "lucide-react";
import CONFIG from "../../config/config.js";

function HomePost() {
  const [home, setHome] = useState(null);
  const [formData, setFormData] = useState({
    title_fr: "",
    title_en: "",
    description_fr: "",
    description_en: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const [notification, setNotification] = useState("");
  const [formVisible, setFormVisible] = useState(false);

  // 🧩 Charger la donnée Home existante
  useEffect(() => {
    fetchHome();
  }, []);

  const fetchHome = async () => {
    try {
      const res = await axios.get(CONFIG.API_HOME_LIST);
      setHome(res.data);
      setFormData({
        title_fr: res.data.title_fr || "",
        title_en: res.data.title_en || "",
        description_fr: res.data.description_fr || "",
        description_en: res.data.description_en || "",
        image: null,
      });
      setPreview(res.data.image || null);
    } catch (err) {
      console.log("Aucun contenu d'accueil trouvé.");
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
      title_fr: home?.title_fr || "",
      title_en: home?.title_en || "",
      description_fr: home?.description_fr || "",
      description_en: home?.description_en || "",
      image: null,
    });
    setPreview(home?.image || null);
  };

  // ✅ Créer ou Mettre à jour
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) form.append(key, value);
      });

      if (home && home.id) {
        await axios.patch(CONFIG.API_HOME_UPDATE(home.id), form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setNotification("Page d'accueil mise à jour avec succès ✅");
      } else {
        await axios.post(CONFIG.API_HOME_CREATE, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setNotification("Page d'accueil créée avec succès ✅");
      }
      fetchHome();
      setFormVisible(false);
      setTimeout(() => setNotification(""), 5000);
    } catch (err) {
      console.error(err);
      setNotification("❌ Erreur lors de la sauvegarde.");
      setTimeout(() => setNotification(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Supprimer
  const handleDelete = async () => {
    if (!home || !home.id) {
      setNotification("Aucun contenu à supprimer.");
      return;
    }
    if (!window.confirm("Supprimer cette page d'accueil ?")) return;
    
    try {
      await axios.delete(CONFIG.API_HOME_DELETE(home.id));
      setHome(null);
      setFormData({
        title_fr: "",
        title_en: "",
        description_fr: "",
        description_en: "",
        image: null,
      });
      setPreview(null);
      setNotification("🗑️ Page d'accueil supprimée avec succès !");
      setFormVisible(false);
      setTimeout(() => setNotification(""), 5000);
    } catch (err) {
      console.error(err);
      setNotification("Erreur lors de la suppression ❌");
      setTimeout(() => setNotification(""), 5000);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin text-blue-900" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900 flex items-center gap-3">
          <Home size={32} />
          Gestion de la page d'accueil
        </h1>
        <button
          onClick={() => {
            setFormVisible(!formVisible);
            if (!formVisible && home) {
              resetForm();
            }
          }}
          className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
        >
          <PlusCircle size={20} />
          {formVisible ? "Fermer" : home ? "Modifier" : "Ajouter un post"}
        </button>
      </div>

      {notification && (
        <div className={`p-3 mb-4 rounded ${
          notification.includes("❌") || notification.includes("Erreur")
            ? "bg-red-100 text-red-700"
            : "bg-green-100 text-green-700"
        }`}>
          {notification}
        </div>
      )}

      {/* 🧾 FORMULAIRE */}
      {formVisible && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6 mb-10 space-y-4"
        >
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Titre (FR) *
            </label>
            <input
              type="text"
              name="title_fr"
              value={formData.title_fr}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Title (EN)
            </label>
            <input
              type="text"
              name="title_en"
              value={formData.title_en}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Description (FR)
          </label>
          <textarea
            name="description_fr"
            rows="3"
            value={formData.description_fr}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full min-h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Description (EN)
          </label>
          <textarea
            name="description_en"
            rows="3"
            value={formData.description_en}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full min-h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
          {preview && (
            <img
              src={preview}
              alt="Aperçu"
              className="mt-4 rounded-lg shadow-lg w-full max-w-md h-64 object-cover border"
            />
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-blue-900 text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Enregistrement...
              </>
            ) : (
              <>
                <Save size={18} />
                {home ? "Mettre à jour" : "Créer"}
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setFormVisible(false);
              resetForm();
            }}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Annuler
          </button>

          {home && (
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-2 bg-red-100 text-red-700 px-5 py-2 rounded-lg hover:bg-red-200 transition"
            >
              <Trash2 size={18} />
              Supprimer
            </button>
          )}
        </div>
      </form>
      )}

      {/* 🧩 APERÇU DU CONTENU ACTUEL */}
      {home && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Contenu actuel
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Titre (FR)</h3>
              <p className="text-gray-600">{home.title_fr}</p>
            </div>
            {home.title_en && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Title (EN)</h3>
                <p className="text-gray-600">{home.title_en}</p>
              </div>
            )}
            {home.description_fr && (
              <div className="md:col-span-2">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Description (FR)
                </h3>
                <p className="text-gray-600">{home.description_fr}</p>
              </div>
            )}
            {home.description_en && (
              <div className="md:col-span-2">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Description (EN)
                </h3>
                <p className="text-gray-600">{home.description_en}</p>
              </div>
            )}
            {home.image && (
              <div className="md:col-span-2">
                <h3 className="font-semibold text-gray-700 mb-2">Image</h3>
                <img
                  src={home.image}
                  alt="Page d'accueil"
                  className="rounded-lg shadow-lg max-w-md w-full h-64 object-cover border"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePost;
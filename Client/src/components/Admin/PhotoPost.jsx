import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Save,
  Edit2,
  Trash2,
  Image as ImageIcon,
  FolderOpen,
} from "lucide-react";
import CONFIG from "../../config/config.js";

const PhotoPost = () => {
  const [photos, setPhotos] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [form, setForm] = useState({
    album: "",
    title_fr: "",
    title_en: "",
    comment_fr: "",
    comment_en: "",
    image: null,
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlbumForm, setShowAlbumForm] = useState(false);
  const [openAlbum, setOpenAlbum] = useState(null);
  const [editingPhoto, setEditingPhoto] = useState(null);

  const [newAlbum, setNewAlbum] = useState({
    title_fr: "",
    title_en: "",
    description_fr: "",
    description_en: "",
    image: null,
  });

  const photoApi = CONFIG.API_PHOTO_LIST; // ex: https://tonserveur/api/media/
  const albumApi = CONFIG.API_ALBUM_LIST; // ex: https://tonserveur/api/albums/

  // Charger les albums
  const fetchAlbums = async () => {
    try {
      const res = await fetch(albumApi);
      const data = await res.json();
      setAlbums(data);
    } catch (err) {
      console.error("Erreur chargement albums:", err);
    }
  };

  // Charger les photos
  const fetchPhotos = async () => {
    try {
      const res = await fetch(photoApi);
      const data = await res.json();
      setPhotos(data);
    } catch (err) {
      console.error("Erreur chargement photos:", err);
    }
  };

  useEffect(() => {
    fetchAlbums();
    fetchPhotos();
  }, []);

  // Gestion du changement dans les inputs photo
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  // Gestion du changement dans les inputs album
  const handleAlbumChange = (e) => {
    const { name, value, files } = e.target;
    setNewAlbum({ ...newAlbum, [name]: files ? files[0] : value });
  };

  // Créer un nouvel album (avec image vers Cloudinary)
  const handleCreateAlbum = async (e) => {
    e.preventDefault();

    if (
      !newAlbum.title_fr.trim() ||
      !newAlbum.title_en.trim() ||
      !newAlbum.description_fr.trim() ||
      !newAlbum.description_en.trim() ||
      !newAlbum.image
    ) {
      setMessage("⚠️ Tous les champs (Fr, En, Image) sont obligatoires !");
      return;
    }

    const formData = new FormData();
    Object.entries(newAlbum).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const res = await fetch(albumApi, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Erreur lors de la création de l’album");

      const data = await res.json();
      setAlbums((prev) => [data, ...prev]);
      setNewAlbum({
        title_fr: "",
        title_en: "",
        description_fr: "",
        description_en: "",
        image: null,
      });
      setShowAlbumForm(false);
      setMessage("✅ Album créé avec succès !");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error(error);
      setMessage("❌ Erreur : impossible de créer l’album");
    }
  };

  // Enregistrer ou modifier une photo
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!form.title_fr.trim() || !form.title_en.trim() || !form.album) {
      setMessage("⚠️ Le titre FR, EN et l’album sont obligatoires !");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const method = editId ? "PUT" : "POST";
      const url = editId ? `${photoApi}${editId}/` : photoApi;
      const res = await fetch(url, { method, body: formData });

      if (!res.ok) throw new Error(`Erreur serveur ${res.status}`);

      setMessage(
        editId
          ? "✅ Photo mise à jour avec succès !"
          : "✅ Photo ajoutée avec succès !"
      );
      setForm({
        album: "",
        title_fr: "",
        title_en: "",
        comment_fr: "",
        comment_en: "",
        image: null,
      });
      setEditId(null);
      fetchPhotos();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error(error);
      setMessage("❌ Erreur : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Modifier une photo
  const handleEditPhoto = (photo) => {
    setForm({
      album: photo.album,
      title_fr: photo.title_fr || "",
      title_en: photo.title_en || "",
      comment_fr: photo.comment_fr || "",
      comment_en: photo.comment_en || "",
      image: null,
    });
    setEditId(photo.id);
    setEditingPhoto(photo.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Supprimer une photo
  const handleDeletePhoto = async (photoId) => {
    if (!window.confirm("Supprimer cette photo ?")) return;

    try {
      const res = await fetch(`${photoApi}${photoId}/`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur de suppression");
      setPhotos(photos.filter((p) => p.id !== photoId));
      setMessage("✅ Photo supprimée !");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur suppression !");
    }
  };

  const getPhotosByAlbum = (albumId) =>
    photos.filter((photo) => photo.album === albumId);

  return (
    <div className="min-h-screen bg-[#0a0e27] py-8">
      <div className="w-full flex items-center justify-center">
        <div className="w-[95%] lg:w-[90%] xl:w-[85%] space-y-8">
          {/* Message */}
          {message && (
            <div
              className={`p-4 rounded-xl border-2 ${
                message.includes("✅")
                  ? "bg-green-500/10 border-green-500/50 text-green-400"
                  : "bg-orange-500/10 border-orange-500/50 text-orange-400"
              } backdrop-blur-xl`}
            >
              <p className="font-bold text-center">{message}</p>
            </div>
          )}

          {/* --- FORMULAIRE PHOTO --- */}
          <section className="bg-white/5 rounded-3xl border-2 border-orange-500/20 p-6 md:p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-blue-600 rounded-xl flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-500">
                {editId ? "Modifier une photo" : "Ajouter une nouvelle photo"}
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Sélection album */}
              <div className="space-y-2">
                <label className="text-white font-bold flex items-center gap-2">
                  <FolderOpen size={18} className="text-orange-400" />
                  Album *
                </label>
                <select
                  name="album"
                  value={form.album}
                  onChange={handleChange}
                  className="w-full bg-white text-black border-2 border-orange-500/30 rounded-xl px-4 py-3 focus:border-orange-500 focus:outline-none transition-all"
                  required
                >
                  <option value="">-- Choisir un album --</option>
                  {albums.map((album) => (
                    <option key={album.id} value={album.id}>
                      {album.title_fr}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => setShowAlbumForm(!showAlbumForm)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg text-blue-400 font-semibold transition-all"
                >
                  <Plus size={18} />
                  {showAlbumForm ? "Annuler" : "Créer un nouvel album"}
                </button>
              </div>

              {/* Formulaire album */}
              {showAlbumForm && (
                <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-2xl p-6 space-y-4">
                  <h3 className="text-xl font-bold text-blue-400 mb-4">
                    Nouvel Album
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="title_fr"
                      value={newAlbum.title_fr}
                      onChange={handleAlbumChange}
                      placeholder="Titre (Français)"
                      className="bg-white/10 border border-blue-500/30 rounded-lg px-4 py-2 text-white"
                    />
                    <input
                      type="text"
                      name="title_en"
                      value={newAlbum.title_en}
                      onChange={handleAlbumChange}
                      placeholder="Title (English)"
                      className="bg-white/10 border border-blue-500/30 rounded-lg px-4 py-2 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <textarea
                      name="description_fr"
                      value={newAlbum.description_fr}
                      onChange={handleAlbumChange}
                      placeholder="Description (Français)"
                      className="bg-white/10 border border-blue-500/30 rounded-lg px-4 py-2 text-white"
                    />
                    <textarea
                      name="description_en"
                      value={newAlbum.description_en}
                      onChange={handleAlbumChange}
                      placeholder="Description (English)"
                      className="bg-white/10 border border-blue-500/30 rounded-lg px-4 py-2 text-white"
                    />
                  </div>

                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleAlbumChange}
                    className="bg-white/10 border border-blue-500/30 rounded-lg px-4 py-2 text-white"
                    required
                  />

                  <button
                    onClick={handleCreateAlbum}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl text-white font-bold transition-all"
                  >
                    <Save size={20} />
                    Créer l’album
                  </button>
                </div>
              )}

              {/* Français */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 bg-orange-500/5 border border-orange-500/20 rounded-2xl p-4">
                  <h3 className="text-lg font-bold text-orange-400">🇫🇷 Français</h3>
                  <input
                    type="text"
                    name="title_fr"
                    value={form.title_fr}
                    onChange={handleChange}
                    placeholder="Titre de la photo"
                    className="w-full bg-white/10 border border-orange-500/30 rounded-lg px-4 py-2 text-white"
                  />
                  <textarea
                    name="comment_fr"
                    value={form.comment_fr}
                    onChange={handleChange}
                    placeholder="Commentaire..."
                    className="w-full bg-white/10 border border-orange-500/30 rounded-lg px-4 py-2 text-white"
                  />
                </div>

                {/* Anglais */}
                <div className="space-y-4 bg-blue-500/5 border border-blue-500/20 rounded-2xl p-4">
                  <h3 className="text-lg font-bold text-blue-400">🇬🇧 English</h3>
                  <input
                    type="text"
                    name="title_en"
                    value={form.title_en}
                    onChange={handleChange}
                    placeholder="Photo title"
                    className="w-full bg-white/10 border border-blue-500/30 rounded-lg px-4 py-2 text-white"
                  />
                  <textarea
                    name="comment_en"
                    value={form.comment_en}
                    onChange={handleChange}
                    placeholder="Comment..."
                    className="w-full bg-white/10 border border-blue-500/30 rounded-lg px-4 py-2 text-white"
                  />
                </div>
              </div>

              {/* Image */}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full bg-white/10 border-2 border-orange-500/30 rounded-xl px-4 py-3 text-white"
                required={!editId}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-orange-500 to-blue-600 rounded-xl text-white font-bold text-lg transition-all"
              >
                {loading ? "⏳ Envoi..." : editId ? "💾 Mettre à jour" : "➕ Ajouter"}
              </button>
            </form>
          </section>

          {/* Albums + Photos */}
          <section className="bg-white/5 rounded-3xl border-2 border-blue-500/20 p-6 shadow-2xl">
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-500 mb-6">
              📂 Albums & Photos
            </h2>

            {albums.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                Aucun album créé.
              </p>
            ) : (
              albums.map((album) => (
                <div
                  key={album.id}
                  className="bg-white/5 border-2 border-orange-500/20 rounded-2xl mb-4"
                >
                  <button
                    onClick={() =>
                      setOpenAlbum(openAlbum === album.id ? null : album.id)
                    }
                    className="w-full flex items-center justify-between p-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          album.image?.startsWith("http")
                            ? album.image
                            : `${CONFIG.MEDIA_URL}${album.image}`
                        }
                        alt={album.title_fr}
                        className="w-16 h-16 object-cover rounded-lg border-2 border-orange-500/50"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {album.title_fr}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {getPhotosByAlbum(album.id).length} photo(s)
                        </p>
                      </div>
                    </div>
                    {openAlbum === album.id ? (
                      <ChevronUp className="text-orange-400" />
                    ) : (
                      <ChevronDown className="text-orange-400" />
                    )}
                  </button>

                  {openAlbum === album.id && (
                    <div className="p-6 border-t border-orange-500/20 space-y-4 bg-[#0f1729]/50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p className="text-gray-300">
                          <strong>FR :</strong> {album.description_fr}
                        </p>
                        <p className="text-gray-300">
                          <strong>EN :</strong> {album.description_en}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {getPhotosByAlbum(album.id).map((photo) => (
                          <div
                            key={photo.id}
                            className="relative group bg-white/5 rounded-xl overflow-hidden border-2 border-blue-500/20"
                          >
                            <img
                              src={
                                photo.image?.startsWith("http")
                                  ? photo.image
                                  : `${CONFIG.MEDIA_URL}${photo.image}`
                              }
                              alt={photo.title_fr}
                              className="w-full h-48 object-cover"
                            />
                            <div className="p-3">
                              <p className="text-white font-semibold text-sm">
                                {photo.title_fr}
                              </p>
                              <p className="text-gray-400 text-xs">
                                {photo.title_en}
                              </p>
                            </div>
                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100">
                              <button
                                onClick={() => handleEditPhoto(photo)}
                                className="p-2 bg-blue-500 rounded-lg"
                              >
                                <Edit2 size={16} className="text-white" />
                              </button>
                              <button
                                onClick={() => handleDeletePhoto(photo.id)}
                                className="p-2 bg-red-500 rounded-lg"
                              >
                                <Trash2 size={16} className="text-white" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default PhotoPost;

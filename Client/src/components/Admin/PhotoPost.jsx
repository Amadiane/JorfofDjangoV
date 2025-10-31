import React, { useEffect, useState } from "react";
import CONFIG from "../../config/config";

const PhotoPost = () => {
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // === Formulaires ===
  const [newAlbum, setNewAlbum] = useState({
    title_fr: "",
    title_en: "",
    description_fr: "",
    description_en: "",
    image: null,
  });

  const [newPhoto, setNewPhoto] = useState({
    album: "",
    title_fr: "",
    title_en: "",
    comment_fr: "",
    comment_en: "",
    image: null,
  });

  // === Charger albums & photos ===
  const fetchAlbums = async () => {
    try {
      const res = await fetch(CONFIG.API_ALBUM_LIST);
      if (!res.ok) throw new Error("Erreur de chargement des albums");
      const data = await res.json();
      setAlbums(data);
    } catch (err) {
      console.error("Erreur de chargement albums:", err);
    }
  };

  const fetchPhotos = async () => {
    try {
      const res = await fetch(CONFIG.API_PHOTO_LIST);
      if (!res.ok) throw new Error("Erreur de chargement des photos");
      const data = await res.json();
      setPhotos(data);
    } catch (err) {
      console.error("Erreur de chargement photos:", err);
    }
  };

  useEffect(() => {
    fetchAlbums();
    fetchPhotos();
  }, []);

  // === 🔼 Upload image vers Cloudinary ===
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
      console.error("Erreur d’upload Cloudinary:", err);
      return null;
    }
  };

  // === Créer un album ===
  const handleCreateAlbum = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let imageUrl = null;
      if (newAlbum.image) imageUrl = await uploadToCloudinary(newAlbum.image);

      const payload = {
        title_fr: newAlbum.title_fr,
        title_en: newAlbum.title_en,
        description_fr: newAlbum.description_fr,
        description_en: newAlbum.description_en,
        image: imageUrl,
      };

      const res = await fetch(CONFIG.API_ALBUM_LIST, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erreur lors de la création de l'album");

      await fetchAlbums();
      setNewAlbum({
        title_fr: "",
        title_en: "",
        description_fr: "",
        description_en: "",
        image: null,
      });
      setMessage("✅ Album créé avec succès !");
    } catch (err) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // === Ajouter une photo ===
  const handleCreatePhoto = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let imageUrl = null;
      if (newPhoto.image) imageUrl = await uploadToCloudinary(newPhoto.image);

      const payload = {
        album: newPhoto.album,
        title_fr: newPhoto.title_fr,
        title_en: newPhoto.title_en,
        comment_fr: newPhoto.comment_fr,
        comment_en: newPhoto.comment_en,
        image: imageUrl,
      };

      const res = await fetch(CONFIG.API_PHOTO_LIST, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi de la photo");

      await fetchPhotos();
      setNewPhoto({
        album: "",
        title_fr: "",
        title_en: "",
        comment_fr: "",
        comment_en: "",
        image: null,
      });
      setMessage("✅ Photo ajoutée avec succès !");
    } catch (err) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // === Photos par album ===
  const getPhotosByAlbum = (albumId) =>
    photos.filter((photo) => photo.album === albumId);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📸 Gestion des Albums & Photos
      </h1>

      {message && (
        <div className="mb-4 text-center text-sm font-semibold">{message}</div>
      )}

      {/* === FORMULAIRE ALBUM === */}
      <div className="bg-slate-800 p-4 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">➕ Créer un Album</h2>
        <form onSubmit={handleCreateAlbum} className="grid gap-2 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Titre FR"
            value={newAlbum.title_fr}
            onChange={(e) =>
              setNewAlbum({ ...newAlbum, title_fr: e.target.value })
            }
            className="p-2 rounded bg-slate-700"
            required
          />
          <input
            type="text"
            placeholder="Titre EN"
            value={newAlbum.title_en}
            onChange={(e) =>
              setNewAlbum({ ...newAlbum, title_en: e.target.value })
            }
            className="p-2 rounded bg-slate-700"
            required
          />
          <textarea
            placeholder="Description FR"
            value={newAlbum.description_fr}
            onChange={(e) =>
              setNewAlbum({ ...newAlbum, description_fr: e.target.value })
            }
            className="p-2 rounded bg-slate-700 sm:col-span-2"
            required
          />
          <textarea
            placeholder="Description EN"
            value={newAlbum.description_en}
            onChange={(e) =>
              setNewAlbum({ ...newAlbum, description_en: e.target.value })
            }
            className="p-2 rounded bg-slate-700 sm:col-span-2"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setNewAlbum({ ...newAlbum, image: e.target.files[0] })
            }
            className="p-2 bg-slate-700 rounded sm:col-span-2"
            required
          />
          <button
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded sm:col-span-2"
          >
            {loading ? "Envoi..." : "Créer l'album"}
          </button>
        </form>
      </div>

      {/* === LISTE DES ALBUMS === */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">📂 Albums existants</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {albums.map((album) => (
            <div
              key={album.id}
              className="bg-slate-800 rounded-xl overflow-hidden shadow"
            >
              <img
                src={
                  album.image?.startsWith("http")
                    ? album.image
                    : `${CONFIG.MEDIA_URL}${album.image}`
                }
                alt={album.title_fr}
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <h3 className="text-lg font-bold">{album.title_fr}</h3>
                <p className="text-sm text-gray-300 mb-2">
                  {album.description_fr}
                </p>

                {/* 🔽 Photos de cet album */}
                <details className="bg-slate-700 rounded p-2">
                  <summary className="cursor-pointer text-sm">
                    Voir les photos ({getPhotosByAlbum(album.id).length})
                  </summary>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {getPhotosByAlbum(album.id).map((photo) => (
                      <img
                        key={photo.id}
                        src={
                          photo.image?.startsWith("http")
                            ? photo.image
                            : `${CONFIG.MEDIA_URL}${photo.image}`
                        }
                        alt={photo.title_fr}
                        className="w-full h-24 object-cover rounded"
                      />
                    ))}
                  </div>
                </details>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === FORMULAIRE PHOTO === */}
      <div className="bg-slate-800 p-4 rounded-xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-3">🖼️ Ajouter une Photo</h2>
        <form onSubmit={handleCreatePhoto} className="grid gap-2 sm:grid-cols-2">
          <select
            value={newPhoto.album}
            onChange={(e) =>
              setNewPhoto({ ...newPhoto, album: e.target.value })
            }
            className="p-2 bg-slate-700 rounded sm:col-span-2"
            required
          >
            <option value="">-- Choisir un album --</option>
            {albums.map((a) => (
              <option key={a.id} value={a.id}>
                {a.title_fr}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Titre FR"
            value={newPhoto.title_fr}
            onChange={(e) =>
              setNewPhoto({ ...newPhoto, title_fr: e.target.value })
            }
            className="p-2 rounded bg-slate-700"
            required
          />
          <input
            type="text"
            placeholder="Titre EN"
            value={newPhoto.title_en}
            onChange={(e) =>
              setNewPhoto({ ...newPhoto, title_en: e.target.value })
            }
            className="p-2 rounded bg-slate-700"
            required
          />
          <textarea
            placeholder="Commentaire FR"
            value={newPhoto.comment_fr}
            onChange={(e) =>
              setNewPhoto({ ...newPhoto, comment_fr: e.target.value })
            }
            className="p-2 rounded bg-slate-700 sm:col-span-2"
          />
          <textarea
            placeholder="Commentaire EN"
            value={newPhoto.comment_en}
            onChange={(e) =>
              setNewPhoto({ ...newPhoto, comment_en: e.target.value })
            }
            className="p-2 rounded bg-slate-700 sm:col-span-2"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setNewPhoto({ ...newPhoto, image: e.target.files[0] })
            }
            className="p-2 bg-slate-700 rounded sm:col-span-2"
            required
          />
          <button
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded sm:col-span-2"
          >
            {loading ? "Envoi..." : "Ajouter la photo"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PhotoPost;

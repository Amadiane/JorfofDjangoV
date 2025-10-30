import React, { useState, useEffect } from "react";
import axios from "axios";
import CONFIG from '../../config/config.js';

const PartnerPost = () => {
  const [partners, setPartners] = useState([]);
  const [formData, setFormData] = useState({
    name_fr: "",
    name_en: "",
    website_url: "",
    cover_image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔄 Charger la liste au montage
  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const res = await axios.get(CONFIG.API_PARTNER_LIST);
      setPartners(res.data);
    } catch (error) {
      console.error("❌ Error loading partners:", error);
    }
  };

  // 📤 Upload direct vers Cloudinary
  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CONFIG.CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", CONFIG.CLOUDINARY_NAME);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CONFIG.CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const cloudData = await res.json();
    return cloudData.secure_url; // ✅ renvoie l’URL finale
  };

  // 💾 Création ou modification
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = null;

      if (formData.cover_image) {
        imageUrl = await uploadToCloudinary(formData.cover_image);
      }

      const payload = {
        name_fr: formData.name_fr,
        name_en: formData.name_en,
        website_url: formData.website_url,
        cover_image: imageUrl || null,
      };

      if (editingId) {
        await axios.put(CONFIG.API_PARTNER_UPDATE(editingId), payload);
      } else {
        await axios.post(CONFIG.API_PARTNER_CREATE, payload);
      }

      setFormData({ name_fr: "", name_en: "", website_url: "", cover_image: null });
      setEditingId(null);
      fetchPartners();
    } catch (error) {
      console.error("❌ Error saving partner:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✏️ Éditer
  const handleEdit = (partner) => {
    setFormData({
      name_fr: partner.name_fr,
      name_en: partner.name_en,
      website_url: partner.website_url,
      cover_image: null,
    });
    setEditingId(partner.id);
  };

  // 🗑️ Supprimer
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this partner?")) return;

    try {
      await axios.delete(CONFIG.API_PARTNER_DELETE(id));
      fetchPartners();
    } catch (error) {
      console.error("❌ Error deleting partner:", error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {editingId ? "✏️ Edit Partner" : "➕ Add Partner"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Nom (FR)"
          value={formData.name_fr}
          onChange={(e) => setFormData({ ...formData, name_fr: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Name (EN)"
          value={formData.name_en}
          onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="url"
          placeholder="Website URL"
          value={formData.website_url}
          onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFormData({ ...formData, cover_image: e.target.files[0] })
          }
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading
            ? "Saving..."
            : editingId
            ? "Update Partner"
            : "Add Partner"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-3">📋 Partner List</h2>
      <div className="grid grid-cols-2 gap-4">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="border rounded p-3 shadow hover:shadow-md"
          >
            <a
              href={partner.website_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={partner.cover_image_url || "/placeholder.png"}
                alt={partner.name_en}
                className="w-full h-32 object-contain mb-2"
                />

              <h3 className="text-lg font-bold">{partner.name_en}</h3>
            </a>
            <p className="text-sm text-gray-600">{partner.name_fr}</p>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => handleEdit(partner)}
                className="text-yellow-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(partner.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerPost;

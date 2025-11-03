import React, { useEffect, useState } from "react";
import axios from "axios";
import CONFIG from "../../config/config.js";

const ListeCommunity = () => {
  const [communityList, setCommunityList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyMessage, setReplyMessage] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState(null);

  // 📥 Charger la liste
  useEffect(() => {
    fetchCommunity();
  }, []);

  const fetchCommunity = async () => {
    try {
      const response = await axios.get(CONFIG.API_COMMUNITY_LIST);
      setCommunityList(response.data);
    } catch (err) {
      console.error("Erreur lors du chargement :", err);
      setError("Impossible de charger la liste des membres.");
    } finally {
      setLoading(false);
    }
  };

  // 📤 Répondre à un membre
  const handleReply = async (id) => {
    if (!replyMessage.trim()) {
      alert("Veuillez saisir un message avant d'envoyer.");
      return;
    }
    try {
      await axios.post(CONFIG.API_COMMUNITY_REPLY(id), { reply: replyMessage });
      alert("Email envoyé avec succès ✅");
      setReplyMessage("");
      setSelectedId(null);
      fetchCommunity();
    } catch (err) {
      console.error("Erreur lors de l'envoi :", err);
      alert("Erreur lors de l'envoi de l'email ❌");
    }
  };

  // 🗑️ Supprimer
  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce membre ?")) {
      try {
        await axios.delete(CONFIG.API_COMMUNITY_DELETE(id));
        setCommunityList((prev) => prev.filter((item) => item.id !== id));
      } catch (err) {
        console.error("Erreur lors de la suppression :", err);
        alert("Erreur lors de la suppression.");
      }
    }
  };

  if (loading) return <p className="text-center text-gray-600">Chargement...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">
        👥 Liste des membres de la communauté
      </h2>

      {communityList.length === 0 ? (
        <p className="text-center text-gray-500">Aucun membre trouvé.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Nom</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Rôle</th>
              <th className="py-3 px-4 text-left">Message</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {communityList.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.email}</td>
                <td className="py-2 px-4 capitalize">
                  {item.role.replace("_", " ")}
                </td>
                <td className="py-2 px-4">
                  {item.message ? item.message : <em>Aucun message</em>}
                </td>
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() =>
                      setSelectedId(selectedId === item.id ? null : item.id)
                    }
                    className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 mr-2"
                  >
                    Répondre
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 📨 Zone de réponse */}
      {selectedId && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">✉️ Répondre au membre</h3>
          <textarea
            rows="5"
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 mb-3"
            placeholder="Écrivez votre réponse ici..."
          />
          <div className="flex gap-3">
            <button
              onClick={() => handleReply(selectedId)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Envoyer
            </button>
            <button
              onClick={() => setSelectedId(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeCommunity;

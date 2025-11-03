import React, { useEffect, useState } from "react";
import CONFIG from "../../config/config"; // ✅ bon chemin
import { Mail, Edit, Trash2, Send, RefreshCw } from "lucide-react";

const ListeAbonnement = () => {
  const [abonnements, setAbonnements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyMessage, setReplyMessage] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // 🔹 Charger la liste des abonnés
  const fetchAbonnements = async () => {
    try {
      setLoading(true);
      const res = await fetch(CONFIG.API_NEWSLETTER_LIST);
      if (!res.ok) throw new Error("Erreur lors du chargement des abonnements");
      const data = await res.json();
      setAbonnements(data);
    } catch (err) {
      console.error(err);
      alert("Erreur de chargement !");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbonnements();
  }, []);

  // 🔹 Supprimer un abonné
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet abonné ?")) return;
    try {
      const res = await fetch(CONFIG.API_NEWSLETTER_DELETE(id), { method: "DELETE" });
      if (res.ok) {
        setAbonnements((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert("Erreur lors de la suppression !");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur réseau !");
    }
  };

  // 🔹 Envoyer une réponse manuelle à un abonné
  const handleReply = async (id) => {
    if (!replyMessage.trim()) {
      alert("Veuillez écrire un message avant d’envoyer.");
      return;
    }
    try {
      const res = await fetch(CONFIG.API_NEWSLETTER_REPLY(id), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: replyMessage }),
      });
      if (res.ok) {
        alert("Message envoyé avec succès !");
        setReplyMessage("");
        setSelectedId(null);
        fetchAbonnements();
      } else {
        alert("Erreur lors de l’envoi du message.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur réseau !");
    }
  };

  // 🔹 Modifier un abonné (juste le mail ici)
  const handleEdit = async (id, newEmail) => {
    const newValue = prompt("Modifier l’adresse email :", newEmail);
    if (!newValue || newValue === newEmail) return;
    try {
      const res = await fetch(CONFIG.API_NEWSLETTER_UPDATE(id), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newValue }),
      });
      if (res.ok) {
        alert("Email mis à jour !");
        fetchAbonnements();
      } else {
        alert("Erreur de mise à jour !");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        <RefreshCw className="animate-spin w-6 h-6 mr-2" /> Chargement...
      </div>
    );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Liste des abonnés à la Newsletter
        </h2>
        <button
          onClick={fetchAbonnements}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <RefreshCw className="w-4 h-4 mr-2" /> Actualiser
        </button>
      </div>

      {abonnements.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          Aucun abonné trouvé pour le moment.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 border-b text-left">#</th>
                <th className="px-4 py-3 border-b text-left">Email</th>
                <th className="px-4 py-3 border-b text-left">Date d’inscription</th>
                <th className="px-4 py-3 border-b text-center">Répondu</th>
                <th className="px-4 py-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {abonnements.map((abonnement, index) => (
                <tr
                  key={abonnement.id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-4 py-3 border-b">{index + 1}</td>
                  <td className="px-4 py-3 border-b">{abonnement.email}</td>
                  <td className="px-4 py-3 border-b text-sm text-gray-500">
                    {new Date(abonnement.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 border-b text-center">
                    {abonnement.is_replied ? (
                      <span className="text-green-600 font-semibold">Oui</span>
                    ) : (
                      <span className="text-red-500 font-semibold">Non</span>
                    )}
                  </td>
                  <td className="px-4 py-3 border-b text-center space-x-2">
                    <button
                      onClick={() => handleEdit(abonnement.id, abonnement.email)}
                      className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(abonnement.id)}
                      className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setSelectedId(
                          selectedId === abonnement.id ? null : abonnement.id
                        )
                      }
                      className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedId && (
        <div className="mt-6 bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
            <Send className="w-5 h-5 mr-2 text-blue-600" /> Répondre à l’abonné
          </h3>
          <textarea
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            rows="4"
            placeholder="Écrivez votre message ici..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          />
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setSelectedId(null)}
              className="px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-100 transition"
            >
              Annuler
            </button>
            <button
              onClick={() => handleReply(selectedId)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Envoyer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeAbonnement;

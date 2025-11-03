import React, { useEffect, useState } from "react";
import CONFIG from "../../config/config.js";

const ListeContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  // 📨 Charger la liste des contacts
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch(CONFIG.API_CONTACT_LIST);
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error("Erreur de chargement :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // 🗑️ Supprimer un contact
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce contact ?")) return;
    try {
      const res = await fetch(CONFIG.API_CONTACT_DETAIL(id), { method: "DELETE" });
      if (res.ok) {
        alert("Contact supprimé !");
        fetchContacts();
      } else {
        alert("Erreur lors de la suppression.");
      }
    } catch (err) {
      console.error("Erreur suppression :", err);
    }
  };

  // ✏️ Modifier un contact
  const handleEdit = async (id, updatedData) => {
    try {
      const res = await fetch(CONFIG.API_CONTACT_DETAIL(id), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (res.ok) {
        alert("Contact mis à jour !");
        fetchContacts();
      } else {
        alert("Erreur lors de la modification.");
      }
    } catch (err) {
      console.error("Erreur update :", err);
    }
  };

  // 📬 Préparer la réponse
  const handleReply = (contact) => {
    setSelectedContact(contact);
  };

  // 📤 Envoyer la réponse par mail
  const sendReply = async () => {
    if (!replyMessage.trim()) return alert("Veuillez écrire un message.");
    setSending(true);
    try {
      const res = await fetch(CONFIG.API_CONTACT_REPLY(selectedContact.id), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply: replyMessage }),
      });

      if (res.ok) {
        alert("Réponse envoyée avec succès !");
        setSelectedContact(null);
        setReplyMessage("");
        fetchContacts();
      } else {
        alert("Erreur lors de l’envoi du mail.");
      }
    } catch (err) {
      console.error("Erreur d’envoi :", err);
    } finally {
      setSending(false);
    }
  };

  if (loading) return <p className="text-center p-6">Chargement...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-[#1C1C47] mb-6">📬 Liste des Contacts</h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#1C1C47] text-white">
              <th className="p-3 text-left">Nom</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Sujet</th>
              <th className="p-3 text-left">Catégorie</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Statut</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-600">
                  Aucun contact trouvé.
                </td>
              </tr>
            ) : (
              contacts.map((contact) => (
                <tr key={contact.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{contact.name}</td>
                  <td className="p-3">{contact.email}</td>
                  <td className="p-3">{contact.subject}</td>
                  <td className="p-3 capitalize">{contact.category}</td>
                  <td className="p-3">
                    {new Date(contact.created_at).toLocaleString("fr-FR")}
                  </td>
                  <td className="p-3">
                    {contact.is_replied ? (
                      <span className="text-green-600 font-semibold">✅ Répondu</span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">⏳ En attente</span>
                    )}
                  </td>
                  <td className="p-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleReply(contact)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 text-sm"
                    >
                      Répondre
                    </button>
                    <button
                      onClick={() =>
                        handleEdit(contact.id, {
                          ...contact,
                          subject: prompt("Nouveau sujet :", contact.subject),
                        })
                      }
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 text-sm"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 text-sm"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🧩 Fenêtre modale de réponse */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-3 text-[#1C1C47]">
              Répondre à : {selectedContact.name} ({selectedContact.email})
            </h2>
            <textarea
              rows="5"
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Écrivez votre réponse ici..."
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#1C1C47]"
            ></textarea>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setSelectedContact(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                onClick={sendReply}
                disabled={sending}
                className={`px-4 py-2 rounded-lg text-white ${
                  sending ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {sending ? "Envoi..." : "Envoyer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeContacts;

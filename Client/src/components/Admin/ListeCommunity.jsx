import React, { useEffect, useState } from "react";
import {
  Users, Loader2, Trash2, Eye, Send, X,
  Calendar, Briefcase, MessageCircle
} from "lucide-react";
import CONFIG from "../../config/config.js";

const ListeCommunity = () => {
  const [communityList, setCommunityList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("pending"); // ✅ En attente / Répondus / Tous

  // 📥 Charger la liste
  useEffect(() => {
    fetchCommunity();
  }, []);

  const fetchCommunity = async () => {
    setLoading(true);
    try {
      const response = await fetch(CONFIG.API_COMMUNITY_LIST);
      if (!response.ok) throw new Error("Erreur de chargement");
      const data = await response.json();
      setCommunityList(data);
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
      setError("Veuillez saisir un message avant d'envoyer.");
      return;
    }

    setSending(true);
    setError(null);

    try {
      const response = await fetch(CONFIG.API_COMMUNITY_REPLY(id), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply: replyMessage }),
      });

      if (!response.ok) throw new Error("Erreur d'envoi");

      // ✅ Mettre à jour localement le statut du membre
      setCommunityList(prev =>
        prev.map(member =>
          member.id === id ? { ...member, is_replied: true } : member
        )
      );

      setSuccessMessage("Email envoyé avec succès !");
      setReplyMessage("");
      setSelectedMember(null);
    } catch (err) {
      console.error("Erreur lors de l'envoi :", err);
      setError("Erreur lors de l'envoi de l'email");
    } finally {
      setSending(false);
    }
  };

  // 🗑️ Supprimer un membre
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce membre ?")) return;

    try {
      const response = await fetch(CONFIG.API_COMMUNITY_DELETE(id), {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erreur de suppression");

      setCommunityList((prev) => prev.filter((item) => item.id !== id));
      setSuccessMessage("Membre supprimé avec succès !");
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      setError("Erreur lors de la suppression");
    }
  };

  // 🎯 Filtres combinés (rôle + statut)
  const filteredMembers = communityList.filter((member) => {
    const roleOK = filterRole === "all" || member.role === filterRole;
    const statusOK =
      filterStatus === "all"
        ? true
        : filterStatus === "replied"
        ? member.is_replied
        : !member.is_replied;
    return roleOK && statusOK;
  });

  // 📊 Rôles uniques
  const uniqueRoles = [...new Set(communityList.map((m) => m.role))];

  // 🎨 Couleurs par rôle
  const getRoleColor = (role) => {
    const colors = {
      player: "bg-blue-500/20 text-blue-300 border-blue-500/50",
      coach: "bg-green-500/20 text-green-300 border-green-500/50",
      fan: "bg-purple-500/20 text-purple-300 border-purple-500/50",
      volunteer: "bg-orange-500/20 text-orange-300 border-orange-500/50",
      sponsor: "bg-pink-500/20 text-pink-300 border-pink-500/50",
      other: "bg-gray-500/20 text-gray-300 border-gray-500/50",
    };
    return colors[role] || colors.other;
  };

  const getRoleLabel = (role) => {
    const labels = {
      player: "Joueur",
      coach: "Entraîneur",
      fan: "Supporter",
      volunteer: "Bénévole",
      sponsor: "Sponsor",
      other: "Autre",
    };
    return labels[role] || role;
  };

  if (loading) {
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
      {/* 🟣 Effets de fond */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 w-64 md:w-96 h-64 md:h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto p-6">
        {/* 🧭 Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-xl">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">Communauté</h1>
              <p className="text-sm text-gray-400">
                {filteredMembers.length} membre{filteredMembers.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* 🧩 Filtres par rôle */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterRole("all")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filterRole === "all"
                  ? "bg-orange-500 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              Tous ({communityList.length})
            </button>
            {uniqueRoles.map((role) => (
              <button
                key={role}
                onClick={() => setFilterRole(role)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filterRole === role
                    ? "bg-orange-500 text-white"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                {getRoleLabel(role)} (
                {communityList.filter((m) => m.role === role).length})
              </button>
            ))}
          </div>
        </div>

        {/* 🟠 Filtres statut */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setFilterStatus("pending")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              filterStatus === "pending"
                ? "bg-orange-500 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            En attente ({communityList.filter((m) => !m.is_replied).length})
          </button>
          <button
            onClick={() => setFilterStatus("replied")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              filterStatus === "replied"
                ? "bg-green-500 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            Répondus ({communityList.filter((m) => m.is_replied).length})
          </button>
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              filterStatus === "all"
                ? "bg-blue-500 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            Tous ({communityList.length})
          </button>
        </div>

        {/* 🧱 Liste des membres */}
        {filteredMembers.length === 0 ? (
          <div className="text-center py-12">
            <Users size={64} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400 text-lg">Aucun membre trouvé</p>
          </div>
        ) : (
          filteredMembers.map((member) => (
            <div
              key={member.id}
              className="relative bg-[#0f1729]/90 border border-white/10 rounded-2xl p-6 mb-4 hover:border-orange-500/40 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-sm text-gray-400">📧 {member.email}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    <Calendar size={12} className="inline mr-1" />
                    {new Date(member.created_at).toLocaleDateString("fr-FR")}
                  </p>
                  {member.message && (
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 mt-3">
                      <p className="text-xs text-purple-400 mb-1 flex items-center gap-1">
                        <MessageCircle size={12} /> Message
                      </p>
                      <p className="text-gray-300 text-sm">{member.message}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setSelectedMember(member);
                      setReplyMessage("");
                    }}
                    className="bg-green-500/20 border border-green-500/50 text-green-300 px-4 py-2 rounded-lg hover:bg-green-500/30 text-sm font-semibold flex items-center gap-2"
                  >
                    <Send size={16} /> Répondre
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="bg-red-500/20 border border-red-500/50 text-red-300 p-2 rounded-lg hover:bg-red-500/30 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListeCommunity;

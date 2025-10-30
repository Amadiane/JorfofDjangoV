import React, { useEffect, useState } from "react";
import CONFIG from "../../config/config.js";
import ChatBotNew from "../ChatBot/ChatbotNew";

const Partner = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les partenaires depuis l’API
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch(CONFIG.API_PARTNER_LIST);
        if (!response.ok) throw new Error("Erreur lors du chargement des partenaires");
        const data = await response.json();

        // tri pour n’afficher que les plus récents
        const sorted = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setPartners(sorted);
      } catch (error) {
        console.error("Erreur API partenaires:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-[#121212] to-[#1E3A8A] text-white text-center py-16 shadow-md">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Partenaires Officiels</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Découvrez les partenaires qui soutiennent le <strong>Jorfof Club</strong> dans son aventure !
        </p>
      </header>

      {/* SECTION PARTENAIRES */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#12138B] mb-10">
          Nos partenaires récents 🤝
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Chargement des partenaires...</p>
        ) : partners.length === 0 ? (
          <p className="text-center text-gray-600">Aucun partenaire disponible pour le moment.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer text-center w-full max-w-[180px]"
                onClick={() => window.open(partner.website_url || "#", "_blank")}
              >
                <img
                  src={partner.cover_image_url || "/placeholder.png"}
                  alt={partner.name_en || partner.name_fr}
                  className="w-full h-24 object-contain mb-3"
                />
                <h3 className="text-md font-semibold text-[#12138B] hover:text-blue-600 transition truncate">
                  {partner.name_en || partner.name_fr}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER CTA */}
      <div className="bg-white py-16 text-center mt-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Rejoignez nos partenaires</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Soutenez le <strong>Jorfof Club</strong> et participez à notre passion commune : le basket-ball.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-[#12138B] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-800 transition"
        >
          Devenir partenaire
        </button>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <ChatBotNew />
      </div>
    </div>
  );
};

export default Partner;

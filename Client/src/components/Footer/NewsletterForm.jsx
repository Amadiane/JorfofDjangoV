import React, { useState } from "react";
import CONFIG from "../../config/config.js";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("⚠ Veuillez entrer une adresse e-mail valide.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const res = await fetch(CONFIG.API_NEWSLETTER_CREATE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Merci pour votre abonnement à la newsletter !");
        setEmail("");
      } else if (res.status === 400 && data.email) {
        setMessage("⚠ Cet e-mail est déjà inscrit à la newsletter.");
      } else {
        setMessage(data.error || "⚠ Une erreur est survenue, réessayez.");
      }
    } catch (err) {
      console.error("Erreur :", err);
      setMessage("⚠ Erreur de connexion au serveur.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <div className="newsletter-form text-center p-4">
      <h2 className="text-lg font-bold mb-2 text-white">Abonnez-vous à notre newsletter</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-2">
        <input
          type="email"
          placeholder="Votre adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-2 rounded-lg w-full sm:w-72 text-black focus:outline-none"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold disabled:opacity-50"
        >
          {isSubmitting ? "Envoi..." : "S'abonner"}
        </button>
      </form>
      {message && (
        <p
          className={`mt-3 text-sm font-semibold ${
            message.includes("✅")
              ? "text-green-400"
              : message.includes("⚠")
              ? "text-yellow-400"
              : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default NewsletterForm;

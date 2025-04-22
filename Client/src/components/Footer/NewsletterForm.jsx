import React, { useState } from 'react';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/newsletter/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log("email message: "+data)
      if (res.ok) {
        
        setMessage('Merci pour votre abonnement !');
        setEmail('');
      } else {
        setMessage(data.message || 'Une erreur est survenue');
      }
    } catch (err) {
      setMessage('Erreur serveur, veuillez réessayer plus tard.');
    }
  };

  return (
    <div className="newsletter-form">
      <h2>Abonnez-vous à notre newsletter</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Votre adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">S'abonner</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NewsletterForm;

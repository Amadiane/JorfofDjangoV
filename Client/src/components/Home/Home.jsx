import React, { useEffect, useState } from 'react';
import Blogcard from './Blogcard';
import Blogcard2 from './Blogcard2';
import ChatBot from '../ChatBot/ChatBot'; // Chemin d'importation relatif corrigé
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [latestPost, setLatestPost] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Pour naviguer à une autre page si besoin

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté avant de charger les blogs
    if (!localStorage.getItem('accessToken')) {
      navigate('/login'); // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
      return;
    }

    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/blog/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        console.log('Data received:', data); // Log des données récupérées
        
        // Trier les blogs par date
        const sortedBlogs = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        setBlogs(sortedBlogs);
        setLatestPost(sortedBlogs[0]); // Mettre à jour le dernier post
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [navigate]); // Ajout de `navigate` dans les dépendances pour garantir qu'il est à jour

  return (
    <div>
      <ChatBot /> {/* Affichage du chatbot */}

      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 pb-24 pt-16 mx-auto">
          <div className="main-bl pb-10">
            {latestPost && (
              <Blogcard latestpost={latestPost} /> // Affichage du dernier post si disponible
            )}
          </div>

          <h1 className="text-3xl font-bold py-8">Recent News</h1>
          <div className="blog flex justify-center space-x-5 flex-wrap">
            {blogs?.map((data) => (
              <Blogcard2 key={data.id} data={data} /> // Ajout de la clé pour chaque élément de la liste
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

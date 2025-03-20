import React, { useEffect, useState } from 'react';
import Blogcard from './Blogcard';
import Blogcard2 from './Blogcard2';
import ChatBot from '../ChatBot/ChatBot';  // Chemin d'importation relatif corrigé

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [latestPost, setLatestPost] = useState(null); // Correction du nom de la variable pour respecter les conventions
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/blog/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLatestPost(data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))[0]); // Trier les blogs par date
        setBlogs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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

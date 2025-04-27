import React, { useEffect, useState } from 'react';
import ChatBot from '../ChatBot/ChatBot';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';

const Actualites = () => {
  const [blogs, setBlogs] = useState([]);
  const [latestPost, setLatestPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login');
      return;
    }

    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/blog/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const sortedBlogs = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setBlogs(sortedBlogs);
        setLatestPost(sortedBlogs[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [navigate]);

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="h-16"></div>
      <div className="pt-16"></div>

      <main className="container mx-auto px-4 py-8 mt-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Erreur lors du chargement des actualités: {error}</p>
          </div>
        ) : (
          <>
            {latestPost && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex flex-wrap items-center">
                  <span className="bg-red-600 text-white px-3 py-1 mr-3 mb-2 rounded">À LA UNE</span>
                  L'actualité du moment
                </h2>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2">
                      {latestPost.image ? (
                        <img
                          src={latestPost.image}
                          alt={latestPost.title}
                          className="w-full h-64 sm:h-80 md:h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-64 sm:h-80 md:h-full bg-gray-200 flex items-center justify-center">
                          <p className="text-gray-500">Image non disponible</p>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col justify-between w-full md:w-1/2">
                      <div>
                        <h3 className="text-xl font-bold mb-3">{latestPost.title}</h3>
                        <p className="text-gray-600 mb-4">{latestPost.content}</p>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <Clock size={16} className="mr-1" />
                          <span>{formatDate(latestPost.created_at)}</span>
                        </div>
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full md:w-auto"
                          onClick={() => navigate(`/blog/${latestPost.id}`)}
                        >
                          Lire l'article complet
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-12">
              <h2 className="text-xl font-bold mb-6">Actualités récentes</h2>
              {filteredBlogs.length === 0 ? (
                <p className="text-gray-600">Aucun article ne correspond à votre recherche.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBlogs.slice(1).map((blog) => (
                    <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                      {blog.image ? (
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="h-48 w-full object-cover"
                        />
                      ) : (
                        <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                          <p className="text-gray-500">Image non disponible</p>
                        </div>
                      )}
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="font-bold mb-2 line-clamp-2">{blog.title}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">{blog.content}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock size={14} className="mr-1" />
                            {formatDate(blog.created_at)}
                          </span>
                          <button
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            onClick={() => navigate(`/blog/${blog.id}`)}
                          >
                            Lire plus
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>

      <div className="fixed bottom-6 right-6 z-50">
        <ChatBot />
      </div>
    </div>
  );
};

export default Actualites;

import React, { useEffect, useState } from 'react';
import ChatBotNew from "../ChatBot/ChatbotNew";
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Actualites = () => {
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [latestPost, setLatestPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFullContent, setShowFullContent] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/blog/');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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

  // Categories pour le filtrage (exemple - à adapter selon vos besoins)
  const categories = ['all', 'events', 'news', 'announcements'];
  
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeFilter === 'all' || blog.category === activeFilter;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const toggleFullContent = () => setShowFullContent(!showFullContent);

  const toggleCardContent = (id) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Couleurs alternées pour les carreaux décoratifs 
  const squareColors = ['bg-blue-200', 'bg-yellow-200', 'bg-green-200', 'bg-red-200', 'bg-purple-200'];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen relative overflow-hidden">
      {/* Background squares animation */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${squareColors[i % squareColors.length]} rounded-lg opacity-20`}
            style={{
              width: `${Math.random() * 120 + 50}px`,
              height: `${Math.random() * 120 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              rotate: [0, Math.random() * 20 - 10],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="h-16"></div>
      <div className="pt-8"></div>

      <main className="container mx-auto px-4 py-8 relative z-10">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          </div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-5 rounded shadow-md"
          >
            <p className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {t('error_loading')} {error}
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 inline-block">
                {t('news')}
              </h1>
              <div className="h-1.5 w-32 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
            </motion.div>

            {/* Search bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative mx-auto max-w-2xl mb-12 group"
            >
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full p-4 pl-10 text-sm rounded-lg border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-md transition-all duration-300 group-hover:shadow-lg"
                placeholder={t('search_news')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>

            {/* Filter tabs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center mb-12 gap-2"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeFilter === category
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                  }`}
                >
                  {t(category)}
                </button>
              ))}
            </motion.div>

            {latestPost && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-16"
              >
                <h2 className="text-2xl font-bold mb-6 flex flex-wrap items-center justify-center md:justify-start">
                  <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-1.5 mr-3 mb-2 rounded-lg shadow-md">
                    {t('À LA UNE')}
                  </span>
                  {t('Dernière nouvelle')}
                </h2>
                <motion.div 
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-xl overflow-hidden border-t-4 border-blue-500"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 relative overflow-hidden">
                      {latestPost.image ? (
                        <motion.img 
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                          src={latestPost.image} 
                          alt={latestPost.title} 
                          className="w-full h-64 sm:h-80 md:h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-64 sm:h-80 md:h-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
                          <p className="text-gray-500">{t('no_image')}</p>
                        </div>
                      )}
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/30 to-transparent opacity-60"></div>
                    </div>
                    <div className="p-8 flex flex-col justify-between w-full md:w-1/2">
                      <div className="flex flex-col h-full">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">{latestPost.title}</h3>
                        <div className="flex-grow overflow-hidden">
                          <motion.div
                            initial={false}
                            animate={{ height: showFullContent ? "auto" : "12em" }}
                            transition={{ duration: 0.5 }}
                            className="overflow-hidden"
                          >
                            <p className="text-gray-600" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', lineHeight: '1.8' }}>
                              {latestPost.content}
                            </p>
                          </motion.div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <Clock size={16} className="mr-2 text-blue-500" />
                          <span>{formatDate(latestPost.created_at)}</span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg flex items-center justify-center w-full md:w-auto shadow-md hover:shadow-lg transition-all duration-300"
                          onClick={toggleFullContent}
                        >
                          {showFullContent ? (
                            <>
                              {t('read_less')}
                              <ChevronUp size={16} className="ml-2" />
                            </>
                          ) : (
                            <>
                              {t('read_more')}
                              <ChevronDown size={16} className="ml-2" />
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            <div className="mb-12">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl font-bold mb-8 text-center md:text-left flex items-center"
              >
                <span className="inline-block w-10 h-1 bg-blue-600 mr-3"></span>
                {t('Nouvelles récentes')}
                <span className="inline-block w-10 h-1 bg-blue-600 ml-3"></span>
              </motion.h2>
              
              {filteredBlogs.length === 0 ? (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-600 text-center py-10"
                >
                  {t('no_match')}
                </motion.p>
              ) : (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredBlogs.slice(1).map((blog, index) => (
                    <motion.div
                      key={blog.id}
                      variants={itemVariants}
                      whileHover={{ 
                        y: -10,
                        transition: { duration: 0.3 }
                      }}
                      className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col h-full border-t-4 ${
                        index % 5 === 0 ? 'border-blue-500' : 
                        index % 5 === 1 ? 'border-purple-500' : 
                        index % 5 === 2 ? 'border-green-500' : 
                        index % 5 === 3 ? 'border-yellow-500' : 
                        'border-red-500'
                      }`}
                    >
                      <div className="relative overflow-hidden">
                        {blog.image ? (
                          <motion.img 
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                            src={blog.image} 
                            alt={blog.title} 
                            className="h-52 w-full object-cover transform transition-transform duration-500" 
                          />
                        ) : (
                          <div className={`h-52 w-full ${
                            index % 5 === 0 ? 'bg-gradient-to-r from-blue-50 to-blue-100' : 
                            index % 5 === 1 ? 'bg-gradient-to-r from-purple-50 to-purple-100' : 
                            index % 5 === 2 ? 'bg-gradient-to-r from-green-50 to-green-100' : 
                            index % 5 === 3 ? 'bg-gradient-to-r from-yellow-50 to-yellow-100' : 
                            'bg-gradient-to-r from-red-50 to-red-100'
                          } flex items-center justify-center`}>
                            <p className="text-gray-500">{t('no_image')}</p>
                          </div>
                        )}
                        <div className="absolute top-3 right-3">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            index % 5 === 0 ? 'bg-blue-100 text-blue-800' : 
                            index % 5 === 1 ? 'bg-purple-100 text-purple-800' : 
                            index % 5 === 2 ? 'bg-green-100 text-green-800' : 
                            index % 5 === 3 ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {blog.category || t('news')}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="font-bold mb-3 text-xl text-gray-800">{blog.title}</h3>
                        <div className="flex-grow">
                          <motion.div
                            initial={false}
                            animate={{ height: expandedCards[blog.id] ? "auto" : "4.5em" }}
                            transition={{ duration: 0.5 }}
                            className="overflow-hidden"
                          >
                            <p className="text-gray-600 text-sm">
                              {blog.content}
                            </p>
                          </motion.div>
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock size={14} className="mr-1" />
                            {formatDate(blog.created_at)}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`text-sm font-medium flex items-center px-3 py-1 rounded-full ${
                              index % 5 === 0 ? 'text-blue-600 hover:bg-blue-50' : 
                              index % 5 === 1 ? 'text-purple-600 hover:bg-purple-50' : 
                              index % 5 === 2 ? 'text-green-600 hover:bg-green-50' : 
                              index % 5 === 3 ? 'text-yellow-600 hover:bg-yellow-50' : 
                              'text-red-600 hover:bg-red-50'
                            }`}
                            onClick={() => toggleCardContent(blog.id)}
                          >
                            {expandedCards[blog.id] ? (
                              <>
                                {t('collapse')}
                                <ChevronUp size={14} className="ml-1" />
                              </>
                            ) : (
                              <>
                                {t('read')}
                                <ChevronDown size={14} className="ml-1" />
                              </>
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </>
        )}
      </main>

      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <ChatBotNew />
        </motion.div>
      </div>
    </div>
  );
};

export default Actualites;
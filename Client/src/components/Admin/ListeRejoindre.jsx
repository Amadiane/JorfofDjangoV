import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ListeRejoindre = () => {
  const [rejoindres, setRejoindres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login');
      return;
    }

    const fetchRejoindres = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/rejoindre/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP! statut: ${response.status}`);
        }

        const data = await response.json();
        setRejoindres(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRejoindres();
  }, [navigate]);

  const filteredRejoindres = rejoindres.filter(item =>
    (item.nom && item.nom.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.message && item.message.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedRejoindres = [...filteredRejoindres].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.created_at || Date.now()) - new Date(a.created_at || Date.now());
    } else if (sortOrder === 'oldest') {
      return new Date(a.created_at || Date.now()) - new Date(b.created_at || Date.now());
    } else if (sortOrder === 'name') {
      return a.nom.localeCompare(b.nom);
    }
    return 0;
  });

  if (loading) {
    return <p className="text-center mt-8">Chargement des demandes...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-8">Erreur : {error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Demandes de Rejoindre</h1>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md text-sm transition"
            >
              Retour
            </button>
          </div>

          <div className="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center gap-4">
            <input
              type="text"
              placeholder="Rechercher par nom, email, message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-md"
            />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="newest">Plus récents</option>
              <option value="oldest">Plus anciens</option>
              <option value="name">Nom (A-Z)</option>
            </select>
          </div>

          <div className="px-6 py-4">
            {sortedRejoindres.length === 0 ? (
              <p className="text-center text-gray-600">Aucune demande trouvée.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedRejoindres.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                    <h2 className="text-xl font-semibold text-gray-800">{item.nom}</h2>
                    <a href={`mailto:${item.email}`} className="text-blue-600 hover:underline">{item.email}</a>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Date inconnue'}
                    </p>
                    {item.message && (
                      <div className="mt-4">
                        <p className="text-gray-700 whitespace-pre-line">{item.message}</p>
                      </div>
                    )}
                    <div className="flex justify-end mt-4">
                      <button
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        onClick={() => window.open(`mailto:${item.email}?subject=Rejoindre&body=Bonjour ${item.nom},`)}
                      >
                        Répondre
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeRejoindre;

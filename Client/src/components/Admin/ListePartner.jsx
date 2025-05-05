import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ListPartners = () => {
  const [partenaires, setPartenaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const navigate = useNavigate();

  useEffect(() => {
    // if (!localStorage.getItem('accessToken')) {
    //   navigate('/login');
    //   return;
    // }

    const fetchPartenaires = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/partners/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP! statut: ${response.status}`);
        }

        const data = await response.json();
        setPartenaires(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPartenaires();
  }, [navigate]);

  const safeString = (value) => (value ? value.toLowerCase() : '');

  const filteredPartenaires = partenaires.filter((p) =>
    safeString(p.first_name).includes(searchTerm.toLowerCase()) ||
    safeString(p.last_name).includes(searchTerm.toLowerCase()) ||
    safeString(p.email).includes(searchTerm.toLowerCase())
  );

  const sortedPartenaires = [...filteredPartenaires].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.created_at || Date.now()) - new Date(a.created_at || Date.now());
    } else if (sortOrder === 'oldest') {
      return new Date(a.created_at || Date.now()) - new Date(b.created_at || Date.now());
    } else if (sortOrder === 'name') {
      return (a.first_name + ' ' + a.last_name).localeCompare(b.first_name + ' ' + b.last_name);
    }
    return 0;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Chargement des partenaires...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-lg w-full">
          <h2 className="font-bold text-lg">Erreur</h2>
          <p>{error}</p>
          <button
            className="mt-3 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => window.location.reload()}
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-800 text-white px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 className="text-2xl font-bold">Partenaires</h1>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <span className="text-sm text-gray-300">
                  {filteredPartenaires.length} {filteredPartenaires.length > 1 ? 'partenaires' : 'partenaire'}
                </span>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md text-sm transition duration-150"
                >
                  Retour
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Rechercher par nom, email..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="flex-shrink-0">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="newest">Plus récents</option>
                  <option value="oldest">Plus anciens</option>
                  <option value="name">Nom (A-Z)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="px-6 py-4">
            {sortedPartenaires.length === 0 ? (
              <div className="text-center py-16">
                <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun partenaire trouvé</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm ? 'Essayez d’ajuster votre recherche.' : 'Aucun partenaire pour le moment.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedPartenaires.map((p) => (
                  <div key={p.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-800">{p.first_name} {p.last_name}</h2>
                          <a href={`mailto:${p.email}`} className="text-blue-600 hover:underline">{p.email}</a>
                        </div>
                        <span className="text-xs text-gray-500">
                          {p.created_at ? new Date(p.created_at).toLocaleDateString() : 'Date inconnue'}
                        </span>
                      </div>
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-gray-700">Organisation: {p.organisation || 'Non spécifiée'}</p>
                        <p className="text-gray-700">Site Web: <a href={p.website_url} target="_blank" className="text-blue-600 hover:underline">{p.website_url}</a></p>
                        <p className="text-gray-700">Téléphone: {p.phone}</p>
                      </div>
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

export default ListPartners;

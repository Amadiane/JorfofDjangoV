import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavAdmin from '../header/NavAdmin'; // Chemin du NavAdmin adapté à ton projet

const DashboardAdmin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login'); // Redirige vers la page de login si l'utilisateur n'est pas connecté
        }
    }, [navigate]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Le NavAdmin est déjà affiché dans App, pas besoin de le répéter ici */}

            {/* Le contenu principal du dashboard */}
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:px-8 md:py-16">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
                    Bienvenue Admin sur le Dashboard
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mb-4 text-center">
                    Cette page est uniquement accessible aux administrateurs.
                </p>
                <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Section de gestion</h2>
                    {/* Ajoutez d'autres sections de gestion ici */}
                </div>
            </main>
        </div>
    );
};

export default DashboardAdmin;

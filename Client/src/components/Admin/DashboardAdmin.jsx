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
        <div className="flex flex-col min-h-screen">
            {/* Le NavAdmin est déjà affiché dans App, pas besoin de le répéter ici */}
            
            {/* Le contenu principal du dashboard */}
            <main className="flex-1 flex items-center justify-center p-4">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Bienvenue Admin sur le Dashboard
                </h1>
            </main>
        </div>
    );
};

export default DashboardAdmin;

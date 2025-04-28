import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Utilisation de useNavigate pour la redirection
import { login } from '../endpoints/api'; // Import de la fonction login pour l'API
import Logo from "../header/Logo"; // Import du Logo

const Login = () => {
    const [username, setUsername] = useState(''); // Nom d'utilisateur
    const [password, setPassword] = useState(''); // Mot de passe
    const [error, setError] = useState(''); // Erreur de connexion
    const [loading, setLoading] = useState(false); // Gestion du chargement
    const [passwordVisible, setPasswordVisible] = useState(false); // Pour afficher/masquer le mot de passe
    const navigate = useNavigate(); // Initialisation de la redirection avec useNavigate

    // Fonction pour gérer la soumission du formulaire
    const handleLogin = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        setLoading(true); // Démarre le chargement
        setError(''); // Réinitialise les erreurs

        try {
            // Appel de l'API de connexion
            const response = await login(username, password);
            
            if (response.success) {
                localStorage.setItem('access', response.access); // Sauvegarde du token d'accès
                navigate('/dashboardAdmin'); // Redirection vers le dashboard admin après connexion réussie
            } else {
                setError('Nom d\'utilisateur ou mot de passe incorrect'); // Gère l'échec de la connexion
            }
        } catch (err) {
            setError('Une erreur est survenue. Veuillez réessayer plus tard.'); // Gère les erreurs de réseau
        } finally {
            setLoading(false); // Arrête le chargement
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-white">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                {/* Logo en haut du formulaire */}
                <div className="flex justify-center mb-6">
                    <Logo />
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Welcome Back</h2>

                {/* Affichage des erreurs de connexion */}
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                {/* Formulaire de connexion */}
                <form onSubmit={handleLogin}>
                    {/* Champ pour le nom d'utilisateur */}
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium">Username</label>
                        <input
                            type="text"
                            className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    {/* Champ pour le mot de passe avec visibilité toggle */}
                    <div className="mb-4 relative">
                        <label className="block text-gray-600 text-sm font-medium">Password</label>
                        <input
                            type={passwordVisible ? "text" : "password"} // Change le type en fonction de l'état
                            className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {/* Icône d'œil pour afficher/masquer le mot de passe */}
                        <span
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                            {passwordVisible ? "👁️" : "👁️‍🗨️"} {/* Icône d'œil */}
                        </span>

                        {/* Lien pour le mot de passe oublié */}
                        <p className="mt-4 text-left text-sm text-gray-600">
                            <a href="/register" className="text-blue-500 hover:underline">Forgot Password ?</a>
                        </p>
                    </div>

                    {/* Bouton de soumission */}
                    <button
                        type="submit"
                        className={`w-full text-white font-semibold py-3 rounded-lg transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                        disabled={loading}
                    >
                        {loading ? 'Connexion...' : 'Login'}
                    </button>
                </form>                
            </div>
        </div>
    );
};

export default Login;

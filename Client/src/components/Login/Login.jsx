import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CONFIG from '../../config/config.js';
import Logo from "../Header/Logo";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log("Tentative de login:", username, password);
      console.log("URL d’API utilisée:", `${CONFIG.BASE_URL}${CONFIG.API_LOGIN}`);

      const response = await fetch(`${CONFIG.BASE_URL}${CONFIG.API_LOGIN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      console.log("Status HTTP:", response.status);

      const data = await response.json();
      console.log("Réponse brute:", data);

      if (data.access) {
        // ✅ Authentification réussie
        localStorage.setItem('access', data.access);
        localStorage.setItem('user', JSON.stringify({ username }));
        navigate('/dashboardAdmin');
      } else {
        setError("Nom d'utilisateur ou mot de passe incorrect");
      }
    } catch (err) {
      console.error("Erreur réseau:", err);
      setError("Une erreur est survenue. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Welcome Back</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleLogin}>
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

          <div className="mb-4 relative">
            <label className="block text-gray-600 text-sm font-medium">Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "👁️" : "👁️‍🗨️"}
            </span>

            <p className="mt-4 text-left text-sm text-gray-600">
              <a href="/register" className="text-blue-500 hover:underline">
                Forgot Password ?
              </a>
            </p>
          </div>

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

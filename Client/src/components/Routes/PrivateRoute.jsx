import { Navigate } from 'react-router-dom';

// PrivateRoute pour vérifier si l'utilisateur est authentifié
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('access'); // Vérifiez si un token existe dans le localStorage
  if (!token) {
    return <Navigate to="/login" />; // Si pas de token, redirige vers la page de login
  }
  return children; // Sinon, affiche les enfants (les pages protégées)
};

export default PrivateRoute;

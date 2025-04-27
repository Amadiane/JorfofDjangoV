import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const token = localStorage.getItem('accessToken'); // Vérifie si un token existe
    return token ? <Outlet /> : <Navigate to="/login" replace />; // Redirige vers la page login si aucun token
};

export default PrivateRoute;

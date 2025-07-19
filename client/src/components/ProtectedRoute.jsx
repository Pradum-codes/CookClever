import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

const ProtectedRoute = () => {
  const { user } = useUser();
  const authToken = localStorage.getItem('authToken');
  
  console.log('ProtectedRoute check:', { user, authToken: !!authToken }); // Debug log

  // User is authenticated if they have both user data and valid token
  const isAuthenticated = user && authToken;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

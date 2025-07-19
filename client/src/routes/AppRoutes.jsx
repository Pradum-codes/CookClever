import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Search from '../pages/FindRecipe';
import Favorites from '../pages/Favorites';
import Login from '../pages/Login';
import Register from '../pages/Register';
import RecipeDetail from '@/pages/RecipeDetail';
import History from '@/pages/History';
import ProtectedRoute from '@/components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes layout */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/history" element={<History />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

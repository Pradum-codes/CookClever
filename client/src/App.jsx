import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/shared/Navbar.jsx';
import AppRoutes from './routes/AppRoutes';

function App() {
  const location = useLocation();
  const hideNavbar = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      {!hideNavbar && <Navbar />}
      <main>
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
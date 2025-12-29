import { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { AuthContext } from "@/context/AuthContext";
import { useTheme } from '@/context/ThemeContext';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) =>
        location.pathname === path ? 'text-orange-600 font-semibold' : 'text-gray-600 hover:text-orange-500';

    const getInitial = (name) => (name ? name.trim()[0].toUpperCase() : '?');

    return (
        <nav className="flex items-center justify-between px-6 py-4 shadow bg-background sticky top-0 z-50">
            <Link to="/dashboard" className="text-2xl font-bold text-orange-600">
                CookClever
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
                <Link to="/dashboard" className={isActive('/dashboard')}>
                    Home
                </Link>
                <Link to="/search" className={isActive('/search')}>
                    Search
                </Link>
                <Link to="/favorites" className={isActive('/favorites')}>
                    Favorites
                </Link>
                <Link to="/history" className={isActive('/history')}>
                    History
                </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                    {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>

                {/* Mobile Menu Toggle */}
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </Button>

                <Link to="/profile">
                    <Avatar className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-orange-500 transition-all">
                        <AvatarFallback>{getInitial(user?.username || user?.name)}</AvatarFallback>
                        <AvatarImage src={user?.avatarUrl} />
                    </Avatar>
                </Link>

                {/* Logout Button - visible on all screen sizes */}
                <Button variant="destructive" onClick={handleLogout}>
                    Logout
                </Button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-background border-t shadow-md md:hidden">
                    <div className="flex flex-col items-center py-4 space-y-3">
                        <Link to="/dashboard" className={isActive('/dashboard')} onClick={() => setIsMobileMenuOpen(false)}>
                            Home
                        </Link>
                        <Link to="/search" className={isActive('/search')} onClick={() => setIsMobileMenuOpen(false)}>
                            Search
                        </Link>
                        <Link to="/favorites" className={isActive('/favorites')} onClick={() => setIsMobileMenuOpen(false)}>
                            Favorites
                        </Link>
                        <Link to="/history" className={isActive('/history')} onClick={() => setIsMobileMenuOpen(false)}>
                            History
                        </Link>
                        <Button variant="destructive" onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}>
                            Logout
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
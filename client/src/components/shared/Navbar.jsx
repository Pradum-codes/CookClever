import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Sun, Moon, Menu, X, User } from 'lucide-react';
import { useUser } from '@/context/UserContext';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useUser();
    const [ darkMode, toggleTheme ] = useState(false);

    // Debug logging
    console.log('Navbar user data:', user);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setIsProfileOpen(false); // Close profile dropdown when mobile menu toggles
    };

    const toggleProfileDropdown = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const isActive = (path) =>
        location.pathname === path
        ? 'text-primary font-semibold border-b-2 border-primary'
        : 'text-muted-foreground hover:text-primary transition-colors duration-200';

    const getInitial = (name) => {
        if (!name) return "?";
        return name.trim()[0].toUpperCase();
    };
    return (
        <nav className="flex items-center justify-between px-4 py-3 border-b bg-amber-50 shadow-sm sticky top-0 z-50">
        <Link to="/" className="text-2xl font-bold text-primary">CookClever</Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/search" className={isActive('/search')}>Search</Link>
            <Link to="/favorites" className={isActive('/favorites')}>Favorites</Link>
            <Link to="/history" className={isActive('/history')}>History</Link>
        </div>

        {/* Mobile Menu Button and Theme Toggle */}
        <div className="md:hidden flex items-center gap-4">
            <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
            >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
            >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-amber-50 border-b md:hidden">
            <div className="flex flex-col items-center gap-4 py-4">
                <Link
                to="/"
                className={isActive('/')}
                onClick={toggleMobileMenu}
                >
                Home
                </Link>
                <Link
                to="/search"
                className={isActive('/search')}
                onClick={toggleMobileMenu}
                >
                Search
                </Link>
                <Link
                to="/favorites"
                className={isActive('/favorites')}
                onClick={toggleMobileMenu}
                >
                Favorites
                </Link>
                <Link
                to="/history"
                className={isActive('/history')}
                onClick={toggleMobileMenu}
                >
                History
                </Link>
                <button
                onClick={toggleProfileDropdown}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                <User className="w-5 h-5" />
                Profile
                </button>
                {isProfileOpen && (
                <div className="flex flex-col gap-2 py-2 px-4 bg-gray-100 dark:bg-gray-800 rounded-md">
                    <Link to="/profile" className="text-sm hover:text-primary" onClick={toggleMobileMenu}>
                    View Profile
                    </Link>
                    <Link to="/settings" className="text-sm hover:text-primary" onClick={toggleMobileMenu}>
                    Settings
                    </Link>
                    <Link to="/account" className="text-sm hover:text-primary" onClick={toggleMobileMenu}>
                    Account
                    </Link>
                    <button 
                        onClick={() => {
                            handleLogout();
                            toggleMobileMenu();
                        }}
                        className="text-sm hover:text-primary"
                    >
                    Logout
                    </button>
                </div>
                )}
            </div>
            </div>
        )}

        {/* Desktop Theme Toggle and Profile */}
        <div className="hidden md:flex items-center gap-4">
            <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
            >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="relative">
            <button
                onClick={toggleProfileDropdown}
                className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Profile menu"
            >
<div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center font-semibold">
  {getInitial(user?.username)}
</div>
                <span className="text-sm font-medium">
                {user?.username || user?.name || "Guest"}
                </span>
            </button>
            {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-2 z-50">
                <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={toggleProfileDropdown}
                >
                    View Profile
                </Link>
                <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={toggleProfileDropdown}
                >
                    Settings
                </Link>
                <Link
                    to="/account"
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={toggleProfileDropdown}
                >
                    Account
                </Link>
                <button
                    onClick={() => {
                        handleLogout();
                        toggleProfileDropdown();
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    Logout
                </button>
                </div>
            )}
            </div>
        </div>
        </nav>
    );
};

export default Navbar;
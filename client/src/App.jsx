import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/routes/ProtectedRoute";

import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Favorites from "@/pages/Favorites";
import History from "./pages/History";
import Layout from "@/components/Layout";
import { RecipesProvider } from "./context/RecipeContext";
import RecipeDetail from "./pages/RecipeDetails";
import SearchRecipes from "./pages/Search";
import Profile from "./pages/Profile";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
    return (
        <Router>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <AuthProvider>
                    <RecipesProvider>
                        <Routes>
                            {/* Public routes */}
                            <Route path="/" element={<Landing />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />

                            {/* Protected routes wrapped in Layout */}
                            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                                <Route path="/dashboard" element={<Home />} />
                                <Route path="/favorites" element={<Favorites />} />
                                <Route path="/recipe/:id" element={<RecipeDetail />} />
                                <Route path="/search" element={<SearchRecipes />} />
                                <Route path="/search" element={<SearchRecipes />} />
                                <Route path="/history" element={<History />} />
                                <Route path="/profile" element={<Profile />} />
                            </Route>
                        </Routes>
                    </RecipesProvider>
                </AuthProvider>
            </ThemeProvider>
        </Router>
    );
}


export default App;

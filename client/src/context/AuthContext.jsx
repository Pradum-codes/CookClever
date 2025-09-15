import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

// Axios instance with baseURL
const api = axios.create({
    baseURL: "http://localhost:3000/api",
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = () => {
        const token = localStorage.getItem("accessToken");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
            setUser(JSON.parse(storedUser));  // Restore user state directly
        }

        setLoading(false);
    };


    useEffect(() => {
        fetchUser();
    }, []);

    const login = async (email, password, rememberUser) => {
        try {
            const res = await api.post("/auth/login", { email, password });
            const { token, user } = res.data;

            if (rememberUser) {
                localStorage.setItem("accessToken", token);
                localStorage.setItem("user", JSON.stringify(user));
            }
            setUser(user);
        } catch (err) {
            console.error("Login failed:", err);
            throw new Error("Invalid email or password");
        }
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

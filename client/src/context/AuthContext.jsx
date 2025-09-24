import { createContext, useState, useEffect } from "react";
import url from "@/lib/api";

export const AuthContext = createContext();


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

    const login = async (email, password) => {
        try {
            const res = await url.post("/auth/login", { email, password });
            const { token, user } = res.data;

            localStorage.setItem("accessToken", token);
            localStorage.setItem("user", JSON.stringify(user));
            url.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setUser(user);
        } catch (err) {
            console.error("Login failed:", err);
            throw new Error("Invalid email or password");
        }
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        delete url.defaults.headers.common["Authorization"];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
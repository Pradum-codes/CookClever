import { Navigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from 'react';

export default function ProtectedRoute({ children }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <p>Loading...</p>;

    return user ? children : <Navigate to="/login" replace />;
}

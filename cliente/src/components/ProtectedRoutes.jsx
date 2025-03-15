import useAuth from "../hooks/auth/UseAuth";
import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const ProtectedRoutes = () => {
    const { authenticated } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simular un delay en la autenticación
        const timer = setTimeout(() => {
            setLoading(false);
        }, 100); // Espera 100ms antes de decidir

        return () => clearTimeout(timer);
    }, [authenticated]);

    if (loading) {
        return <div>Cargando...</div>; // Muestra algo mientras se determina la autenticación
    }

    return authenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;

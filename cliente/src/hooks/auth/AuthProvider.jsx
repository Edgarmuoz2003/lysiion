import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import AuthContext from "../auth/AuthContext"; 
import Swal from "sweetalert2";

const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedAuthenticated = JSON.parse(localStorage.getItem("authenticated"));
        if (storedAuthenticated) {
            setAuthenticated(storedAuthenticated);
        }
    }, []);

    const login = async (email, setEmail, password, setPassword) => {
        setError(null); // Reiniciar error antes de la petición

        try {
            const response = await axios.post("http://localhost:4000/api/login", { email, password });

            if (response.status === 200) {
                setAuthenticated(true);
                setError(null); // Eliminar mensaje de error al iniciar sesión correctamente
                localStorage.setItem("authenticated", true);
                return true;
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.status); // Captura el mensaje del backend
                setEmail("");
                setPassword("");
            } else {
                setError("Error de conexión");
            }
            return false;
        }
    };

    const logout = () => {
        setAuthenticated(false);
        setError(null); // Limpiar errores al cerrar sesión
        localStorage.removeItem("authenticated");
        Swal.fire({
            icon: "success",
            title: "Hasta luego",
            text: "Has cerrado sesión correctamente",
        });
    };

    return (
        <AuthContext.Provider value={{ authenticated, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;

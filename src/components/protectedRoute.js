import { useEffect } from "react";
import { useAuth } from "./context/userAuth";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { authtoken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authtoken) {
            navigate("/login");
        }
    }, [authtoken, navigate]);

    return authtoken ? children : null;
};
export default ProtectedRoute;

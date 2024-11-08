import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const userAuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authtoken, setAuthToken] = useState(localStorage.getItem("token"));
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (authtoken) {
            setIsLoggedIn(true);
        }
    }, [authtoken]);

    const setToken = (token) => {
        setAuthToken(token);
        return localStorage.setItem("token", token);
    };

    const removeToken = () => {
        setAuthToken(null);
        setIsLoggedIn(false);
        return localStorage.removeItem("token");
    };

    const baseUrl = process.env.REACT_APP_BACKEND_API_BASE_URL;

    const logout = async () => {
        try {
            const response = await axios.post(
                `${baseUrl}/user/logout`,
                {},
                {
                    headers: {
                        Authorization: authtoken,
                    },
                }
            );
            if (response.data.result) {
                toast.success(response.data.message);
                removeToken();
            }
        } catch (error) {
            toast.error(error.response.data?.message);
        }
    };

    return (
        <userAuthContext.Provider
            value={{ setToken, removeToken, authtoken, isLoggedIn, logout }}
        >
            {children}
        </userAuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(userAuthContext);
};

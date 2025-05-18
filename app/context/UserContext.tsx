/* Services */
import api from '~/services/api';

/* Interfaces */
import type { UserContextType } from '~/interfaces/UserContext.interface';

/*  React */
import { createContext, useContext, useState, useEffect } from 'react';



const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isValid, setIsValid] = useState<boolean | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                console.log("Found stored token:", storedToken);
                setToken(storedToken);
            }
        }
    }, []);

    useEffect(() => {
        if (token) {
            console.log("Token set, validating...");
            validateToken(token);
        }
    }, [token]);

    const validateToken = async (jwtToken?: string) => {
        const tokenToValidate = jwtToken || token;

        if (!tokenToValidate) {
            console.warn("No token found for validation");
            setIsValid(false);
            return;
        }

        try {
            console.log("Validating Token:", tokenToValidate);
            const response = await api.validate(tokenToValidate);
            if (response.valid) {
                console.log("Token validated successfully:", response.user);
                setUser(response.user);
                setIsValid(true);
            } else {
                console.warn("Token invalid, logging out.");
                logout();
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error('Token validation failed:', error.message);
            } else {
                console.error('Unknown error during token validation');
            }
            logout();
        }
    };

    const login = (jwtToken: string) => {
        console.log("Logging in with token:", jwtToken);
        setToken(jwtToken);
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', jwtToken);
        }
    };

    const logout = () => {
        console.log("Logging out...");
        setToken(null);
        setUser(null);
        setIsValid(false);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
        }
    };

    return (
        <UserContext.Provider value={{ user, token, isValid, login, logout, validateToken }}>
            {children}
        </UserContext.Provider>
    );
};

import { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of the user context
interface UserContextType {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

// Create the context
const UserContext = createContext<UserContextType | null>(null);

// Custom hook for easy usage
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

// User Provider Component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    // Load the user and token from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) setToken(storedToken);
    }, []);

    // Login handler
    const login = (jwtToken: string) => {
        setToken(jwtToken);
        localStorage.setItem('token', jwtToken);
    };

    // Logout handler
    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <UserContext.Provider value={{ token, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const UserContext = createContext();

// Provider
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    console.log('UserProvider rendering, current user:', user); // Debug log

    // Load user from localStorage on app start
    useEffect(() => {
        console.log('UserProvider useEffect running'); // Debug log
        const storedUser = localStorage.getItem('user');
        const authToken = localStorage.getItem('authToken');
        
        console.log('Stored user:', storedUser, 'Auth token exists:', !!authToken);
        
        if (storedUser && authToken) {
            const parsedUser = JSON.parse(storedUser);
            console.log('Loading user from localStorage:', parsedUser);
            setUser(parsedUser);
        }
    }, []);

    const login = (userData) => {
        console.log('UserContext login called with:', userData);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('User set in context and localStorage');
    };
    
    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };


    return (
        <UserContext.Provider value={{ user, login, logout }}>
        {children}
        </UserContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);

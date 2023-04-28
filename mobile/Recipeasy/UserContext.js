import React, { createContext, useState } from 'react';

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        userId: null,
        email: null,
        username: null,
        password: null,
        dateOfBirth: null,
    });

    const updateUser = (userData) => {
        setUser(userData);
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const UserContext = createContext();

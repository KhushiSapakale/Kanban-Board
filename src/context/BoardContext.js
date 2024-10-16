// src/context/BoardContext.js
import React, { createContext, useEffect, useState } from 'react';

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
                const data = await response.json();
                setTickets(data.tickets);
                setUsers(data.users); // Fetch users from the API
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, []);

    return (
        <BoardContext.Provider value={{ tickets, users }}>
            {children}
        </BoardContext.Provider>
    );
};

// src/components/TicketCard.js
import React from 'react';

const TicketCard = ({ ticket, getUserName }) => {
    // Map priority values to labels
    const priorityLabels = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];

    return (
        <div className={`ticket-card priority-${ticket.priority}`}>
            <h3>{ticket.title}</h3>
            <p>Status: {ticket.status}</p>
            <p>User: {getUserName(ticket.userId)}</p> {/* Get user name */}
            <p>Priority: {priorityLabels[ticket.priority]}</p> {/* Show priority label */}
        </div>
    );
};

export default TicketCard;

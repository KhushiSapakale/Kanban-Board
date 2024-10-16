import React, { useEffect, useState } from 'react';
import './KanbanBoard.css';

// Importing icons
import backlogIcon from '../assets/icons/Backlog.svg';
import todoIcon from '../assets/icons/To-do.svg';
import inProgressIcon from '../assets/icons/in-progress.svg';
import doneIcon from '../assets/icons/Done.svg';
import cancelledIcon from '../assets/icons/Cancelled.svg';
import plusIcon from '../assets/icons/add.svg';
import dotsIcon from '../assets/icons/3 dot menu.svg';

// Importing priority images
import priority0Icon from '../assets/icons/No-priority.svg';
import priority1Icon from '../assets/icons/Img - Low Priority.svg';
import priority2Icon from '../assets/icons/Img - Medium Priority.svg';
import priority3Icon from '../assets/icons/Img - High Priority.svg';
import priority4Icon from '../assets/icons/SVG - Urgent Priority grey.svg';

// Importing Display button icons
import leftSideIcon from '../assets/icons/Display.svg';
import downArrowIcon from '../assets/icons/down.svg';

const KanbanBoard = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [grouping, setGrouping] = useState('status');
    const [ordering, setOrdering] = useState('priority');
    const [isDisplayOptionsVisible, setDisplayOptionsVisible] = useState(false);

    const statusIcons = {
        backlog: backlogIcon,
        todo: todoIcon,
        'in progress': inProgressIcon,
        done: doneIcon,
        cancelled: cancelledIcon,
    };

    const priorityIcons = {
        0: priority0Icon,
        1: priority1Icon,
        2: priority2Icon,
        3: priority3Icon,
        4: priority4Icon,
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
            const data = await response.json();
            setTickets(data.tickets);
            setUsers(data.users);
        };

        fetchData();
    }, []);

    const handleDisplayClick = () => {
        setDisplayOptionsVisible(!isDisplayOptionsVisible);
    };

    const handleGroupingChange = (e) => {
        setGrouping(e.target.value);
    };

    const handleOrderingChange = (e) => {
        setOrdering(e.target.value);
    };

    const getGroupedTickets = () => {
        let groupedTickets = {
            backlog: [],
            todo: [],
            'in progress': [],
            done: [],
            cancelled: [],
        };

        tickets.forEach(ticket => {
            let groupKey = ticket.status.toLowerCase();
            if (!groupedTickets[groupKey]) {
                groupedTickets[groupKey] = [];
            }
            groupedTickets[groupKey].push(ticket);
        });

        // Sort tickets within each group based on ordering
        for (const groupKey in groupedTickets) {
            groupedTickets[groupKey].sort((a, b) => {
                if (ordering === 'priority') {
                    return a.priority - b.priority;
                } else {
                    return a.title.localeCompare(b.title);
                }
            });
        }

        return groupedTickets;
    };

    const groupedTickets = getGroupedTickets();

    return (
        <div className="kanban-container">
            <div className="controls">
                <button className="display-button" onClick={handleDisplayClick}>
                    <img src={leftSideIcon} alt="Left Icon" className="left-icon" />
                    Display
                    <img src={downArrowIcon} alt="Down Arrow" className="down-arrow-icon" />
                </button>

                {isDisplayOptionsVisible && (
                    <div className="options">
                        <div className="option-group">
                            <label htmlFor="grouping">Grouping:</label>
                            <select id="grouping" value={grouping} onChange={handleGroupingChange}>
                                <option value="status">Status</option>
                                <option value="user">User</option>
                                <option value="priority">Priority</option>
                            </select>
                        </div>

                        <div className="option-group">
                            <label htmlFor="ordering">Ordering:</label>
                            <select id="ordering" value={ordering} onChange={handleOrderingChange}>
                                <option value="priority">Priority</option>
                                <option value="title">Title</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            <div className="kanban-columns">
                {Object.keys(groupedTickets).map(groupKey => (
                    <div key={groupKey} className="kanban-column">
                        <h3>
                            <div className="status-title-left">
                                <img src={statusIcons[groupKey]} alt={groupKey} className="status-icon" />
                                {groupKey.charAt(0).toUpperCase() + groupKey.slice(1)}
                            </div>
                            <div className="status-title-right">
                                <img src={plusIcon} alt="Add" className="icon" />
                                <img src={dotsIcon} alt="More Options" className="icon" />
                            </div>
                        </h3>
                        {groupedTickets[groupKey].length === 0 ? (
                            <p>No tickets</p>
                        ) : (
                            groupedTickets[groupKey].map(ticket => (
                                <div key={ticket.id} className="ticket">
                                    <h4>{ticket.id}</h4>
                                    <p>{ticket.title}</p>
                                    <div className="priority-container">
                                        <img
                                            src={priorityIcons[ticket.priority]}
                                            alt={`Priority ${ticket.priority}`}
                                            className="priority-icon"
                                        />
                                    </div>

                                    {ticket.type === 'feature-request' && (
                                        <div className="feature-request-label">
                                            <span className="grey-circle"></span>
                                            Feature Request
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KanbanBoard;

// src/App.js
import React from 'react';
import { BoardProvider } from './context/BoardContext';
import KanbanBoard from './components/KanbanBoard';
import './App.css';

const App = () => {
    return (
        <BoardProvider>
            <div className="App">
                {/* <h1>Kanban Board</h1> */}
                <KanbanBoard />
            </div>
        </BoardProvider>
    );
};

export default App;

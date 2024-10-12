/* TabbedInterface.jsx imports */
import React, { useState } from 'react';

import './TagsTabInterface.css';

/* Component for the tags tab interface */
const TagsTabInterface = () => {

    /* State variable for the active tab */
    const [activeTab, setActiveTab] = useState('Professors');

    /* Render the content for the active tab */
    const renderTabContent = () => {
        switch (activeTab) {
            case 'Professors':
                return <p>Manage Professors here.</p>;
            case 'Assignment Types':
                return <p>Manage Assignment Types here.</p>;
            case 'Class Names':
                return <p>Manage Class Names here.</p>;
            case 'Semesters':
                return <p>Manage Semesters here.</p>;
            default:
                return null;
        }
    };

    /* Render the tags tab interface */
    return (
        <div className="right-panel">
            <h2>Manage Tags</h2>
            <div className="tabs">
                <button onClick={() => setActiveTab('Professors')} className={activeTab === 'Professors' ? 'active' : ''}>Professors</button>
                <button onClick={() => setActiveTab('Assignment Types')} className={activeTab === 'Assignment Types' ? 'active' : ''}>Assignment Types</button>
                <button onClick={() => setActiveTab('Class Names')} className={activeTab === 'Class Names' ? 'active' : ''}>Class Names</button>
                <button onClick={() => setActiveTab('Semesters')} className={activeTab === 'Semesters' ? 'active' : ''}>Semesters</button>
            </div>
            <div className="tab-content">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default TagsTabInterface;

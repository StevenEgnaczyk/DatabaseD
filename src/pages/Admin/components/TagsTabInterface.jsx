/* TabbedInterface.jsx imports */
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, getFirestore } from 'firebase/firestore';
import { FaSyncAlt, FaCheck, FaEdit, FaTrashAlt } from 'react-icons/fa';  // Import icons

import './TagsTabInterface.css';
import App from './../../../App';

/* Component for the tags tab interface */
const TagsTabInterface = () => {

    /* State variable for the active tab */
    const [activeTab, setActiveTab] = useState('Professors');

    /* State variables for the tags data */
    const [professors, setProfessors] = useState([]);
    const [assignmentTypes, setAssignmentTypes] = useState([]);
    const [classNames, setClassNames] = useState([]);
    const [semesters, setSemesters] = useState([]);

    /* State for loading */
    const [loading, setLoading] = useState(true);

    /* Firebase services */
    const db = getFirestore();

    /* Fetch all tags */
    const fetchAllTags = async () => {
        setLoading(true); // Set loading to true before fetch starts
        const fetchData = async (collectionName, setState) => {
            const q = query(collection(db, collectionName));
            const querySnapshot = await getDocs(q);
            let data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            setState(data);
        };

        await Promise.all([
            fetchData("professors", setProfessors),
            fetchData("assignment_types", setAssignmentTypes),
            fetchData("class_names", setClassNames),
            fetchData("semesters", setSemesters)
        ]);
        setLoading(false); // Set loading to false once data is fetched
    };

    /* useEffect to fetch all tags on component mount */
    useEffect(() => {
        fetchAllTags();
    }, []);

    /* Render the content for the active tab */
    const renderTabContent = () => {
        const renderStatusTag = (status) => {
            if (status === 'active') {
                return <span className="tag green">Active</span>;
            } else if (status === 'inactive') {
                return <span className="tag gray">Inactive</span>;
            } else {
                return <span className="tag purple">Pending</span>;
            }
        };

        const renderActions = (status) => {
            const approveColor = status === 'pending' ? 'green' : 'gray';
            return (
                <td className="action-buttons">
                    <FaCheck className={`icon ${approveColor}`} />
                    <FaEdit className="icon blue" />
                    <FaTrashAlt className="icon red" />
                </td>
            );
        };

        if (loading) {
            return <div className="loading">Loading...</div>;
        }

        switch (activeTab) {
            case 'Professors':
                return (
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Documents For</th>
                                    <th class='status-tag'>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {professors.map(prof => (
                                    <tr key={prof.id}>
                                        <td>{prof.name}</td>
                                        <td>{prof.documents_for}</td>
                                        <td class='status-tag'>{renderStatusTag(prof.status)}</td>
                                        {renderActions(prof.status)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'Assignment Types':
                return (
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Assignment Type</th>
                                    <th>Documents For</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignmentTypes.map(type => (
                                    <tr key={type.id}>
                                        <td>{type.type}</td>
                                        <td>{type.documents_for}</td>
                                        <td>{renderStatusTag(type.status)}</td>
                                        {renderActions(type.status)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'Class Names':
                return (
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Class ID</th>
                                    <th>Course Name</th>
                                    <th>Documents For</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classNames.map(name => (
                                    <tr key={name.id}>
                                        <td>{name.department} {name.course_number}</td>
                                        <td>{name.course_name}</td>
                                        <td>{name.documents_for}</td>
                                        <td>{renderStatusTag(name.status)}</td>
                                        {renderActions(name.status)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'Semesters':
                return (
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Semester</th>
                                    <th>Documents For</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {semesters.map(semester => (
                                    <tr key={semester.id}>
                                        <td>{semester.semester}</td>
                                        <td>{semester.documents_for}</td>
                                        <td>{renderStatusTag(semester.status)}</td>
                                        {renderActions(semester.status)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            default:
                return null;
        }
    };

    /* Render the tags tab interface */
    return (
        <div className="tags-tab-panel">
            <h2>Manage Tags</h2>
            <div className="tabs-header">
                <button onClick={() => setActiveTab('Professors')} className={activeTab === 'Professors' ? 'active' : ''}>Professors</button>
                <button onClick={() => setActiveTab('Assignment Types')} className={activeTab === 'Assignment Types' ? 'active' : ''}>Assignment Types</button>
                <button onClick={() => setActiveTab('Class Names')} className={activeTab === 'Class Names' ? 'active' : ''}>Class Names</button>
                <button onClick={() => setActiveTab('Semesters')} className={activeTab === 'Semesters' ? 'active' : ''}>Semesters</button>
                <FaSyncAlt className="refresh-icon" onClick={fetchAllTags} /> {/* Refresh Icon */}
            </div>
            <div className="tab-content">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default TagsTabInterface;

/* TabbedInterface.jsx imports */
import React, { useState } from 'react';
import { collection, getDocs, query, where, doc, getFirestore, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import './TagsTabInterface.css';

/* Component for the tags tab interface */
const TagsTabInterface = () => {

    /* State variable for the active tab */
    const [activeTab, setActiveTab] = useState('Professors');

    const [professors, setProfessors] = useState([]);
    const [assignmentTypes, setAssignmentTypes] = useState([]);
    const [classNames, setClassNames] = useState([]);
    const [semesters, setSemesters] = useState([]);

    /* Firebase services */
    const db = getFirestore();
    const auth = getAuth();

    /* Fetch the Professors */
    const fetchProfessors = async () => {
        const q = query(collection(db, "professors"));
        const querySnapshot = await getDocs(q);
        let profs = [];
        querySnapshot.forEach((doc) => {
            profs.push(doc.data());
        });
        setProfessors(profs);
    };

    /* Fetch the Assignment Types */
    const fetchAssignmentTypes = async () => {
        const q = query(collection(db, "assignment_types"));
        const querySnapshot = await getDocs(q);
        let types = [];
        querySnapshot.forEach((doc) => {
            types.push(doc.data());
        });
        setAssignmentTypes(types);
    };

    /* Fetch the Class Names */
    const fetchClassNames = async () => {
        const q = query(collection(db, "class_names"));
        const querySnapshot = await getDocs(q);
        let names = [];
        querySnapshot.forEach((doc) => {
            names.push(doc.data());
        });
        setClassNames(names);
    };

    /* Fetch the Semesters */
    const fetchSemesters = async () => {
        const q = query(collection(db, "semesters"));
        const querySnapshot = await getDocs(q);
        let sems = [];
        querySnapshot.forEach((doc) => {
            sems.push(doc.data());
        });
        setSemesters(sems);
    };

    /* Render the content for the active tab */
    const renderTabContent = () => {
        switch (activeTab) {
            case 'Professors':
                return (
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Documents For</th>
                                </tr>
                            </thead>
                            <tbody>
                                {professors.map(prof => (
                                    <tr key={prof.id}>
                                        <td>{prof.name}</td>  
                                        <td>{prof.documents_for}</td>                                  
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            case 'Assignment Types':
                return (
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Assignment Type</th>
                                    <th>Documents For</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignmentTypes.map(type => (
                                    <tr key={type.id}>
                                        <td>{type.type}</td>
                                        <td>{type.documents_for}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            case 'Class Names':
                return (
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Class ID</th>
                                    <th>Course Name</th>
                                    <th>Documents For</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classNames.map(name => (
                                    <tr key={name.id}>
                                        <td>{name.department} {name.course_number}</td>
                                        <td>{name.course_name}</td>
                                        <td>{name.documents_for}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            case 'Semesters':
                return (
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Semester</th>
                                    <th>Documents For</th>
                                </tr>
                            </thead>
                            <tbody>
                                {semesters.map(semester => (
                                    <tr key={semester.id}>
                                        <td>{semester.semester}</td>
                                        <td>{semester.documents_for}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            default:
                return null;
        }
    };

    /* Render the tags tab interface */
    return (
        <div className="right-panel">
            <h2>Manage Tags</h2>
            <div className="tabs">
                <button onClick={() => { setActiveTab('Professors'); fetchProfessors(); }} className={activeTab === 'Professors' ? 'active' : ''}>Professors</button>
                <button onClick={() => { setActiveTab('Assignment Types'); fetchAssignmentTypes(); }} className={activeTab === 'Assignment Types' ? 'active' : ''}>Assignment Types</button>
                <button onClick={() => { setActiveTab('Class Names'); fetchClassNames(); }} className={activeTab === 'Class Names' ? 'active' : ''}>Class Names</button>
                <button onClick={() => { setActiveTab('Semesters'); fetchSemesters(); }} className={activeTab === 'Semesters' ? 'active' : ''}>Semesters</button>
            </div>
            <div className="tab-content">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default TagsTabInterface;

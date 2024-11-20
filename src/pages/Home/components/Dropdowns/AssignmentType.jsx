/* AssignmentType.jsx imports */
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import './FilterDropdowns.css';

/* Initialize Firestore */
const db = getFirestore();

/* Assignment Type dropdown component */
const AssignmentTypeDropdown = ({ selectedAssignmentType, setSelectedAssignmentType }) => {
    const [assignmentTypes, setAssignmentTypes] = useState([]);

    /* Fetch the assignment types from the Firestore database */
    useEffect(() => {
        const fetchAssignmentTypes = async () => {
            const assignmentTypesCollection = collection(db, 'assignment_types');
            const assignmentTypesSnapshot = await getDocs(assignmentTypesCollection);
            const assignmentTypesList = assignmentTypesSnapshot.docs.map(doc => {
                const data = doc.data();
                return `${data.type}`; // Assuming 'type' holds the data to display
            });
            setAssignmentTypes(assignmentTypesList);
        };
        fetchAssignmentTypes();
    }, []);

    /* Handle selection change */
    const handleChange = (event) => {
        setSelectedAssignmentType(event.target.value);
    };

    return (
        <select value={selectedAssignmentType} onChange={handleChange}>
            {/* Display 'Assignment Type' as a non-selectable placeholder */}
            <option value="" disabled hidden>
                Assignment Type
            </option>
            {/* Render actual assignment types */}
            {assignmentTypes.map((type, index) => (
                <option className={'filter-dropdown'} key={index} value={type}>
                    {type}
                </option>
            ))}
        </select>
    );
};

export default AssignmentTypeDropdown;

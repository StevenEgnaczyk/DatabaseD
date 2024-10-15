/* AssignmentType.jsx imports */
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import './FilterDropdowns.css';

/* Initialize Firestore */
const db = getFirestore();

/* Assignment Type dropdown component */
const AssignmentTypeDropdown = () => {
    const [assignmentTypes, setAssignmentTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(""); // Track the selected value

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
        setSelectedType(event.target.value); // Update the selected value
    };

    return (
        <select value={selectedType} onChange={handleChange}>
            {/* Placeholder as the default option, not in the list */}
            {selectedType === "" && (
                <option value="" disabled>
                    Assignment Type
                </option>
            )}
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

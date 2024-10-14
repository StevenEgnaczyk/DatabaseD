/* ClassNameDropdown.jsx imports */
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Papa from 'papaparse';

import './FilterDropdowns.css';

/* Initialize Firestore */
const db = getFirestore();

/* Class Name dropdown component */
const ClassNameDropdown = () => {
    const [classNames, setClassNames] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");

    /* Fetch the assignment types from the Firestore database */
    useEffect(() => {
        const fetchClassNames = async () => {
            const classNamesCollection = collection(db, 'class_names');
            const classNamesSnapshot = await getDocs(classNamesCollection);
            const classNamesList = classNamesSnapshot.docs.map(doc => {
                const data = doc.data();
                return `${data.department} ${data.course_number}`; // Assuming 'type' holds the data to display
            });
            setClassNames(classNamesList);
        };
        fetchClassNames();
    }, []);

    /* Handle selection change */
    const handleChange = (event) => {
        setSelectedClass(event.target.value);
    }

    return (
        <select value={selectedClass} onChange={handleChange}>
            {/* Placeholder as the default option, not in the list */}
            {selectedClass === "" && (
                <option value="" disabled>
                    Class Name
                </option>
            )}
            {/* Render actual assignment types */}
            {classNames.map((type, index) => (
                <option className={'filter-dropdown'} key={index} value={type}>
                    {type}
                </option>
            ))}
        </select>
    );
};

export default ClassNameDropdown;
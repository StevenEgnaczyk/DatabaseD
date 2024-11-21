/* ClassNameDropdown.jsx imports */
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import './FilterDropdowns.css';

/* Initialize Firestore */
const db = getFirestore();

/* Class Name dropdown component */
const ClassNameDropdown = ({ selectedClassName, setSelectedClassName }) => {
    const [classNames, setClassNames] = useState([]);

    /* Fetch the assignment types from the Firestore database */
    useEffect(() => {
        const fetchClassNames = async () => {
            const classNamesCollection = collection(db, 'class_names');
            const classNamesSnapshot = await getDocs(classNamesCollection);
            const classNamesList = classNamesSnapshot.docs.map(doc => {
                const data = doc.data();
                return `${data.department} ${data.course_number}`;
            });
            setClassNames(classNamesList);
        };
        fetchClassNames();
    }, []);

    /* Handle selection change */
    const handleChange = (event) => {
        setSelectedClassName(event.target.value);
    }

    return (
        <select value={selectedClassName} onChange={handleChange}>
            {/* Display 'Class Name' as a non-selectable placeholder */}
            <option value="" disabled hidden>
                Class Name
            </option>
            {/* Render actual class names */}
            {classNames.map((type, index) => (
                <option className={'filter-dropdown'} key={index} value={type}>
                    {type}
                </option>
            ))}
        </select>
    );
};

export default ClassNameDropdown;
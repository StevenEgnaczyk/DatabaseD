/* ProfessorName.jsx imports */
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import './FilterDropdowns.css';

/* Initialize Firestore */
const db = getFirestore();

/* Professor Name dropdown component */
const ProfessorNameDropdown = ({ selectedProfessorName, setSelectedProfessorName }) => {

    const [professorNames, setProfessors] = useState([]);

    /* Fetch the assignment types from the Firestore database */
    useEffect(() => {
        const fetchProfessors = async () => {
            const professorsCollection = collection(db, 'professors');
            const professorsSnapshot = await getDocs(professorsCollection);
            const professorNamesList = professorsSnapshot.docs.map(doc => {
                const data = doc.data();
                return `${data.name}`;
            });
            setProfessors(professorNamesList);
        };
        fetchProfessors();
    }, []);

    /* Handle selection change */
    const handleChange = (event) => {
        setSelectedProfessorName(event.target.value);
    };

    return (
        <select value={selectedProfessorName} onChange={handleChange}>
            {/* Make 'Professor Name' a selectable first option */}
            <option value="">Professor Name</option>
            {/* Render professor names */}
            {professorNames.map((name, index) => (
                <option className={'filter-dropdown'} key={index} value={name}>
                    {name}
                </option>
            ))}
        </select>
    );
};

export default ProfessorNameDropdown;

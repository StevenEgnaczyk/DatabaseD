/* ProfessorName.jsx imports */
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import './FilterDropdowns.css';

/* Initialize Firestore */
const db = getFirestore();

/* Professor Name dropdown component */
const ProfessorNameDropdown = () => {
    const [professorNames, setProfessors] = useState([]);
    const [selectedProfessor, setSelectedProfessor] = useState(""); // Track selected professor

    /* Fetch the assignment types from the Firestore database */
    useEffect(() => {
        const fetchProfessors = async () => {
            const professorsCollection = collection(db, 'professors');
            const proessorsSnapshot = await getDocs(professorsCollection);
            const assignmentTypesList = proessorsSnapshot.docs.map(doc => {
                const data = doc.data();
                return `${data.name}`;
            });
            setProfessors(assignmentTypesList);
        };
        fetchProfessors();
    }, []);

    /* Handle selection change */
    const handleChange = (event) => {
        setSelectedProfessor(event.target.value); // Update the selected professor
    };

    return (
        <select value={selectedProfessor} onChange={handleChange}>
            {/* Static placeholder that is not part of the actual dropdown options */}
            {selectedProfessor === "" && (
                <option value="" disabled>
                    Professor Name
                </option>
            )}
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

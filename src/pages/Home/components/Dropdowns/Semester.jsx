/* Semester.jsx imports */
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import './FilterDropdowns.css';

/* Initialize Firestore */
const db = getFirestore();

/* Semester dropdown component */
const SemesterDropdown = () => {
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState(""); // Track selected semester

    /* Fetch the semesters from the Firestore database */
    useEffect(() => {
        const fetchSemesters = async () => {
            const semestersCollection = collection(db, 'semesters');
            const semestersSnapshot = await getDocs(semestersCollection);
            const semestersList = semestersSnapshot.docs.map(doc => {
                const data = doc.data();
                return `${data.semester}`;
            });
            setSemesters(semestersList);
        };
        fetchSemesters();
    }, []);

    /* Handle selection change */
    const handleChange = (event) => {
        setSelectedSemester(event.target.value); // Update the selected semester
    }
                        
    return (
        <select value={selectedSemester} onChange={handleChange}>
            {/* Display 'Semester' as a non-selectable placeholder */}
            <option value="" disabled hidden>
                Semester
            </option>
            {/* Render semester options */}
            {semesters.map((type, index) => (
                <option className={'filter-dropdown'} key={index} value={type}>
                    {type}
                </option>
            ))}
        </select>
    );
};

export default SemesterDropdown;
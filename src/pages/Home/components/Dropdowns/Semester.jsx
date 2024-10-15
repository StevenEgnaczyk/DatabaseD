/* Semester.jsx imports */
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import './FilterDropdowns.css';

/* Initialize Firestore */
const db = getFirestore();

/* Semester dropdown component */
const SemesterDropdown = () => {

    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState("");

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

    return (
        <select>
            <option value="" disabled selected>Semester</option>
            {semesters.map((type, index) => (
                <option className={'filter-dropdown'} key={index} value={type}>
                    {type}
                </option>
            ))}
        </select>
    );
};

export default SemesterDropdown;
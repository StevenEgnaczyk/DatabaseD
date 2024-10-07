/* ProfessorName.jsx imports */
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

import './FilterDropdowns.css';

/* Professor Name dropdown component */
const ProfessorNameDropdown = () => {
    const [ProfessorNames, setProfessorNames] = useState([]);

    /* Fetch the professor names from the CSV file */
    useEffect(() => {
        fetch('./ProfessorNames.csv')
            .then(response => response.text())
            .then(data => {
                Papa.parse(data, {
                    complete: (results) => {
                        setProfessorNames(results.data.map(row => row[0]));
                    }
                });
            });
    }, []);

    return (
        <select>
            <option value="" disabled selected>Professor Name</option>
            {ProfessorNames.map((type, index) => (
                <option className={'filter-dropdown'} key={index} value={type}>
                    {type}
                </option>
            ))}
        </select>
    );
};

export default ProfessorNameDropdown;
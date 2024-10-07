/* ClassNameDropdown.jsx imports */
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

import './FilterDropdowns.css';

/* Class Name dropdown component */
const ClassNameDropdown = () => {
    const [classNames, setclassNames] = useState([]);

    /* Fetch the class names from the CSV file */
    useEffect(() => {
        fetch('./ClassNames.csv')
            .then(response => response.text())
            .then(data => {
                Papa.parse(data, {
                    complete: (results) => {
                        setclassNames(results.data.map(row => row[0]));
                    }
                });
            });
    }, []);

    return (
        <select>
            <option value="" disabled selected>Class Name</option>
            {classNames.map((type, index) => (
                <option className={'filter-dropdown'} key={index} value={type}>
                    {type}
                </option>
            ))}
        </select>
    );
};

export default ClassNameDropdown;
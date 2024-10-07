/* Year.jsx imports */
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

import './FilterDropdowns.css';

/* Year dropdown component */
const YearDropdown = () => {

    const [Years, setYears] = useState([]);

    /* Fetch the years from the CSV file */
    useEffect(() => {
        fetch('./Years.csv')
            .then(response => response.text())
            .then(data => {
                Papa.parse(data, {
                    complete: (results) => {
                        setYears(results.data.map(row => row[0]));
                    }
                });
            });
    }, []);

    return (
        <select>
            <option value="" disabled selected>Year</option>
            {Years.map((type, index) => (
                <option className={'filter-dropdown'} key={index} value={type}>
                    {type}
                </option>
            ))}
        </select>
    );
};

export default YearDropdown;
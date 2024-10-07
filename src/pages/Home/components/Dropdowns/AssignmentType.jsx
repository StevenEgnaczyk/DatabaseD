/* AssignmentType.jsx imports */
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

import './FilterDropdowns.css';

/* Assignment Type dropdown component */
const AssignmentTypeDropdown = () => {

    const [assignmentTypes, setAssignmentTypes] = useState([]);

    /* Fetch the assignment types from the CSV file */
    useEffect(() => {
        fetch('./AssignmentTypes.csv')
            .then(response => response.text())
            .then(data => {
                Papa.parse(data, {
                    complete: (results) => {
                        setAssignmentTypes(results.data.map(row => row[0]));
                    }
                });
            });
    }, []);

    return (
        <select>
            <option value="" disabled selected>Assignment Type</option>
            {assignmentTypes.map((type, index) => (
                <option className={'filter-dropdown'} key={index} value={type}>
                    {type}
                </option>
            ))}
        </select>
    );
};

export default AssignmentTypeDropdown;

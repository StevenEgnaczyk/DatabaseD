/* FileQueryBar.jsx Imports */
import React, {useState} from "react";
import AssignmentTypeDropdown from './../Dropdowns/AssignmentType';
import ClassNameDropdown from './../Dropdowns/ClassName';
import ProfessorNameDropdown from './../Dropdowns/ProfessorName';
import SemesterDropdown from './../Dropdowns/Semester';

import './SmallFileQueryBar.css'

/* Component for the search bar and filter dropdowns
    files - array of file objects
    setFilteredFiles - function to update the filtered files in Home */
const SmallFileQueryBar = ({ files, setFilteredFiles }) => {

    const [search, setSearch] = useState('');

    function handleSearch(event) {

        /* Prevent the form from submitting */
        event.preventDefault();

        /* Exit if files prop is undefined */
        if (!files) {
            console.error("Files prop is undefined");
            return;
        }

        /* If search is empty, set filtered files to all files */
        if (!search || search.trim() === '') {
            setFilteredFiles(files);
            return;
        }

        /* Split search terms by spaces and filter out empty strings */
        const searchTerms = search.split(' ').filter(term => term.trim() !== '');

        /* Filter files by search terms */
        const results = files.filter(file =>
            searchTerms.some(term =>
                (file.name && new RegExp(`\\b${term}\\b`, 'i').test(file.name)) ||
                (file.className && new RegExp(`\\b${term}\\b`, 'i').test(file.className)) ||
                (file.professor && new RegExp(`\\b${term}\\b`, 'i').test(file.professor)) ||
                (file.year && new RegExp(`\\b${term}\\b`, 'i').test(file.year.toString())) ||
                (file.fileType && new RegExp(`\\b${term}\\b`, 'i').test(file.fileType))
            )
        );
        setFilteredFiles(results);
    }

    function handleInputChange(event) {
        setSearch(event.target.value);
    }

    return (
        <div className={"small-filter-container"}>
            <form className={"search-bar"} onSubmit={handleSearch}>
                <input
                    className={"search-bar"}
                    type="text"
                    value={search}
                    onChange={handleInputChange}
                    placeholder="Search Documents..."
                    onFocus={(e) => e.target.placeholder = ''}
                    onBlur={(e) => e.target.placeholder = 'search documents'}
                />
                <button type="button"  className={"search-button"} onClick={handleSearch}>🔍</button>
            </form>



            {/* Filter dropdowns */}
            <div className={"filter-dropdowns-small"}>
                <ClassNameDropdown />
                <ProfessorNameDropdown />
                <SemesterDropdown />
                <AssignmentTypeDropdown />
            </div>
        </div>
    )
}

export default SmallFileQueryBar;
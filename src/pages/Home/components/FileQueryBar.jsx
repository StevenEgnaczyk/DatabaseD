/* FileQueryBar.jsx Imports */
import React, {useState} from "react";
import './FileQueryBar.css'
import AssignmentTypeDropdown from './Dropdowns/AssignmentType';
import ClassNameDropdown from './Dropdowns/ClassName';
import ProfessorNameDropdown from './Dropdowns/ProfessorName';
import YearDropdown from './Dropdowns/Year';

/* Component for the search bar and filter dropdowns 
    files - array of file objects
    setFilteredFiles - function to update the filtered files in Home */
const FileQueryBar = ({ files, setFilteredFiles }) => {

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

        /* Update filtered files */
        setFilteredFiles(results);

    }

    /* Update search state with input value */
    function handleInputChange(event) {
        setSearch(event.target.value);
    }

    /* Render the search bar and filter dropdowns */
    return (
        <div className={"filter-container"}>

            {/* Search bar */}
            <form className={"search-bar"} onSubmit={handleSearch}>
                <input 
                    className={"search-bar"} 
                    type="text" 
                    value={search}
                    onChange={handleInputChange}
                    placeholder="Search Documents..." // Added placeholder
                    onFocus={(e) => e.target.placeholder = ''} // Clear placeholder on focus
                    onBlur={(e) => e.target.placeholder = 'search documents'} // Restore placeholder on blur
                />
                <button type="button"  className={"search-button"} onClick={handleSearch}>🔍</button>
            </form>

            {/* Filter dropdowns */}
            <div className={"filter-dropdowns"}>
                <ClassNameDropdown />
                <ProfessorNameDropdown />
                <YearDropdown />
                <AssignmentTypeDropdown />
            </div>
        </div>
    )
}

export default FileQueryBar;
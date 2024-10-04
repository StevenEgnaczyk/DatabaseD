import React, {useState} from "react";

import './FileQueryBar.css'


const FileQueryBar = ({ files, setFilteredFiles }) => { // Accept files as props

    const [search, setSearch] = useState('');

    function handleSearch(event) {
        event.preventDefault();

        if (!files) {
            console.error("Files prop is undefined");
            return; // Exit the function if files is undefined
        }
        
        if (!search || search.trim() === '') {
            setFilteredFiles(files); // Reset to full list if search is empty
            return;
        }

        const searchTerms = search.split(' ').filter(term => term.trim() !== ''); // Split search into terms

        const results = files.filter(file => 
            searchTerms.some(term => 
                (file.name && new RegExp(`\\b${term}\\b`, 'i').test(file.name)) || 
                (file.className && new RegExp(`\\b${term}\\b`, 'i').test(file.className)) || 
                (file.professor && new RegExp(`\\b${term}\\b`, 'i').test(file.professor)) ||
                (file.year && new RegExp(`\\b${term}\\b`, 'i').test(file.year.toString())) || 
                (file.fileType && new RegExp(`\\b${term}\\b`, 'i').test(file.fileType))
            )
        );
        setFilteredFiles(results); // Update the state in Home with filtered results

    }

    function handleInputChange(event) {
        setSearch(event.target.value); // Update search state with input value
    }

    return (
        <div className={"filter-container"}>
            <form className={"search-bar"} onSubmit={handleSearch}>
                <input 
                    className={"search-bar"} 
                    type="text" 

                    value={search}
                    onChange={handleInputChange}

                />
            </form>
            <div className={"filter-dropdowns"}>
                <button>Class</button>
                <button>Professor</button>
                <button>Year</button>
                <button>Assignment</button>
                <button>File Type</button>
            </div>
        </div>
    )
}

export default FileQueryBar;
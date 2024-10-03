import React, {useState} from "react";

import './FileQueryBar.css'

const FileQueryBar = ({ files }) => { // Accept files as props
    const [search, setSearch] = useState('');

    function handleSearch(event) {
        event.preventDefault();
        // Logic to filter files based on search
        const filteredFiles = files.filter(file => 
            file.name.includes(search) || 
            file.className.includes(search) || 
            file.professor.includes(search)
        );
        // Make it so it actually displays filteredFiles
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
                    onChange={handleInputChange} // Use handleInputChange here
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
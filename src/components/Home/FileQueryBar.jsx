import React, {useState} from "react";

import './FileQueryBar.css'
import { toast } from 'react-toastify';


const FileQueryBar = ({ files, setFilteredFiles }) => { // Accept files as props

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false); // New loading state

    async function handleSearch(event) {
        setLoading(true); // Set loading to true
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
        if(results.length === 0){
            toast.info("No results found", { position: "top-center", autoClose: 1000});
            await new Promise(resolve => setTimeout(resolve, 1500)); // Wait for 5 seconds
            setFilteredFiles(files); // Reset filteredFiles state to full list
        }else{
            setFilteredFiles(results); // Update the state in Home with filtered results
        }
        setLoading(false); // Reset loading state to false when search is finished
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
                    disabled={loading} // Disable input when loading
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
import React, {useState} from "react";

import './FileQueryBar.css'



const FileQueryBar = () => {
    const [search] = useState('');


    function handleSearch() {
        //This function will search db for files based on user input
    }

    return (

        <div className={"filter-container"}>
            <form className={"search-bar"} onSubmit={handleSearch}>
                <input className={"search-bar"} type="text" value={search}/>
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
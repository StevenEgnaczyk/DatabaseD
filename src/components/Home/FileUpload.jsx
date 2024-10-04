import React, {useState} from "react";

import './FileUpload.css'
import './FileQueryBar.css'



const FileUpload = ({onClose}) => {

    const handleFileChange = () => {

    }

    const handleSubmit = () => {

    }

    return (
        <div className="lightbox">
            <div className="lightbox-content">
                <div className={"upload-header"}>
                    <h2>Upload a file</h2>
                    <button className={"close-button"} onClick={onClose}> X </button>
                </div>

                <div className={"file-selector"}>
                    <form onSubmit={handleSubmit}>
                        <input type={"file"} onChange={handleFileChange} />

                        {/*Put every element in here so the submit button is at the bottom ?*/}

                        <div className={"filter-dropdowns"}>
                            <button>Class</button>
                            <button>Professor</button>
                            <button>Year</button>
                            <button>Assignment</button>
                            <button>File Type</button>
                        </div>

                        <div className={"file-display"}>
                            <iframe
                                src={"./Anime.pdf"}
                                className="pdf-preview"
                                title="PDF Preview"
                                width="100%"
                                height="400px">
                            </iframe>
                        </div>


                        <button type={"submit"}>Submit</button>
                    </form>

                </div>


            </div>
        </div>
    )
}

export default FileUpload;

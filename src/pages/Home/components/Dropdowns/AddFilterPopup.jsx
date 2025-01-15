import React, { useState } from "react";
import './AddFilterPopup.css';
import { BsXCircle } from "react-icons/bs";

function AddFilterPopup({ closePopup, handleAddValue }) {
    const [inputValue, setInputValue] = useState(""); // State to track input value

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault()

        if (inputValue.trim() !== "") {
            handleAddValue(inputValue);
            setInputValue("");
        } else {
            alert("Please enter a valid value.");
        }

    };

    return (
        <div className="lightbox">
            <div className="add-filter-page">
                <div className="upload-header">
                    <h2>Add a New Filter</h2>
                    <BsXCircle onClick={closePopup} className="close-icon" />
                </div>
                <form onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Enter filter name"
                        className="filter-input"
                    />
                    <button type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddFilterPopup;

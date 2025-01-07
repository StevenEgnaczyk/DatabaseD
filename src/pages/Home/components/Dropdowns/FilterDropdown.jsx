import React, { useState } from "react";
import AddFilterPopup from "./AddFilterPopup";

function FilterDropdown({ data, handleChange }) {
    const [selectedValue, setSelectedValue] = useState(data[0]);
    const [popupOpen, setPopupOpen] = useState(false);

    const handleSelectChange = (event) => {
        const value = event.target.value;
        if (value === "Add") {
            setPopupOpen(true);
        } else {
            setSelectedValue(value);
            handleChange(event);
        }
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    const formatTile = (title) => {
        let words = title.split('_');
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
        return words.join(' ');
    };


    return (
        <>
            <select value={selectedValue} onChange={handleSelectChange}>
                <option value="" hidden>
                    {formatTile(selectedValue)}
                </option>
                {data.slice(1).map((type, index) => (
                    <option key={index} value={type}>
                        {type}
                    </option>
                ))}
                <option value="Add">
                    Add
                </option>
            </select>

            {popupOpen && (
                <AddFilterPopup
                    closePopup={closePopup}
                    handleSelectChange={handleSelectChange}
                />
            )}
        </>
    );
}

export default FilterDropdown;

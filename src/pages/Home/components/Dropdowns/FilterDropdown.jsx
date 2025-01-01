import React, {useState} from "react";


function FilterDropdown({data, handleChange}) {
    const [title, setTitle] = useState(data[0]);

    return (
        <select value={data} onChange={handleChange}>
            <option value="" disabled hidden>
                {title}
            </option>
            {data.slice(1).map((type, index) => (
                <option key={index} value={type} >
                    {type}
                </option>
            ))}
        </select>
    );
}

export default FilterDropdown;
import React, {useState} from "react";


function FilterDropdown({data, handleChange}) {
    const [title, setTitle] = useState(data[0]);

    return (
        <select value={data} onChange={handleChange}>
            <option value="" disabled hidden>
                {title}
            </option>
            {data.map((type, index) => (
                <option key={index} value={type} {type === 'add' && (onclick())} >
                    {type}
                </option>
            ))}
        </select>
    );
}

export default FilterDropdown;
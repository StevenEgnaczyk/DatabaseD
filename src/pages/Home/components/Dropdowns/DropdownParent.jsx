import React, { useEffect, useState } from "react";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import FilterDropdown from "./FilterDropdown";

const db = getFirestore();

// Parses the filter and type passed as props then creates an array to pass to child
function DropdownParent({ collectionName, type, setSelected }) {
    const collectionsNames = ["assignment_types", "class_names", "professors", "semesters"];
    const [dropdownData, setDropdownData] = useState([collectionName]);

    /* Fetch the dropdown data from the Firestore database */
    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const dataCollection = collection(db, collectionName);
                const dataSnapshot = await getDocs(dataCollection);

                let dataList = dataSnapshot.docs.map((doc) => {
                    const data = doc.data();
                    switch (collectionName) {
                        case "assignment_types":
                            return data.type;
                        case "class_names":
                            return `${data.department} ${data.course_number}`;
                        case "professors":
                            return data.name;
                        case "semesters":
                            return data.semester;
                        default:
                            return null;
                    }
                }).filter(Boolean); // Remove undefined/null values

                setDropdownData([collectionName, ...dataList]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDropdownData();
    }, [collectionName]); // Removed `type` since it is not used

    const handleChange = (event) => {
        const value = event.target.value;
        if (!dropdownData.includes(value)) {
            addFilter(value);
        }
        setSelected(value);
    };

    // This needs moved to when onSubmit in fileupload page
    const addFilter = async (value) => {
        try {
            if (value !== "Add") {
                // Dynamically set the field key based on collectionName
                const fieldKey = {
                    assignment_types: "type",
                    class_names: "department", // Add relevant field here
                    professors: "name",
                    semesters: "semester",
                }[collectionName];

                if (fieldKey) {
                    await addDoc(collection(db, collectionName), {
                        [fieldKey]: value,
                    });
                }
            }
        } catch (e) {
            console.error("Error adding new filter:", e);
            alert("Failed to add data.");
        }
    };

    return (
        <FilterDropdown data={dropdownData} handleChange={handleChange} />
    );
}

export default DropdownParent;

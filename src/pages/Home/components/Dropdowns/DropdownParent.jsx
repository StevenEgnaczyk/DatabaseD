import React, {useEffect, useState} from "react";
import {addDoc, collection, getDocs, getFirestore} from "firebase/firestore";
import FilterDropdown from "./FilterDropdown";
import {validateElement} from "react-modal/lib/helpers/ariaAppHider";

const db = getFirestore();


// Parses the filter and type passed as props then creates an array to pass to child
function DropdownParent({collectionName, type, setSelected}) {
    const collectionNames = useState([
        'class_name', 'assignment_types', 'professors', 'semesters',
    ])
    const [dropdownData, setDropdownData] = useState([])

    /* Fetch the assignment types from the Firestore database */
    useEffect(() => {
        const fetchDropdownData = async () => {
            //Fetch specific data from DB
            const dataCollection = collection(db, collectionName);
            const dataSnapshot = await getDocs(dataCollection);
            const dataList = dataSnapshot.docs.map(doc => {
                const data = doc.data();
                return `${data.type}`;
            });

            //Append add option if needed
            if (type === 'submit') {
                dataList.push('add')
            }
            setDropdownData(dataList);
        };
        fetchDropdownData();
    }, []);

    const handleChange = (event) => {
        let value = event.target.value;
        if (!dropdownData.includes(value)) {
            addFilter(value);
        }
        setSelected(value);
    }

    const addFilter = async (value) => {
        try {
            await addDoc(collection(db, collectionName), {
                value
            })
        } catch (e) {
            console.error("Error adding new Filter: ", e);
            alert("Failed to add data.");
        }
    };

    return (
        <>
            <FilterDropdown data={dropdownData} handleChange={handleChange} />
        </>
    )
}

export default DropdownParent;
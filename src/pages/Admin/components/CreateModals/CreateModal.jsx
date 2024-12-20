import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';

const CreateModal = ({ db, collectionName, onSubmit, onClose, fields }) => {
    const [formData, setFormData] = useState({
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        documents_for: 0,
        status: 'pending'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
            updated_at: new Date().toISOString()
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, collectionName), formData);
            onClose();
            onSubmit();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const returnCollectionName = () => {
        if (collectionName === 'professors') {
            return 'Professor';
        } else if (collectionName === 'assignment_types') {
            return 'Assignment Type';
        } else if (collectionName === 'class_names') {
            return 'Class Name';
        } else if (collectionName === 'semesters') {
            return 'Semester';
        }
        return collectionName;
    }

    return (
        <form className="create-tag-form" onSubmit={handleSubmit}>
            <h2 className="modal-title">Create New {returnCollectionName()}</h2>
            {fields.map(field => (
                <input
                    key={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    required={field.required}
                />
            ))}
            <button type="submit">Add {returnCollectionName()}</button>
        </form>
    );
};

export default CreateModal; 
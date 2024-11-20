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

    return (
        <form className="create-tag-form" onSubmit={handleSubmit}>
            <h2 className="modal-title">Create New {collectionName}</h2>
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
            <button type="submit">Add {collectionName}</button>
        </form>
    );
};

export default CreateModal; 
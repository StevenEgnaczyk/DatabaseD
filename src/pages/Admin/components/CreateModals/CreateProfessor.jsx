import React, { useState } from 'react';
import './CreateStyling.css';

const CreateProfessor = ({ onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        documents_for: '0',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
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
            await onSubmit(formData);
            onClose();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form className="create-tag-form" onSubmit={handleSubmit}>
            <h2 className="modal-title">Create New Professor</h2>
            <input 
                name="name" 
                placeholder="Professor Name" 
                value={formData.name}
                onChange={handleInputChange} 
                required 
            />
            <button type="submit">Add Professor</button>
        </form>
    );
};

export default CreateProfessor; 
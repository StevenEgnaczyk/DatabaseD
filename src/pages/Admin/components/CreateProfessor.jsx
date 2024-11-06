import React, { useState } from 'react';

const CreateProfessor = ({ onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        documents_for: '',
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
        <form onSubmit={handleSubmit}>
            <input 
                name="name" 
                placeholder="Professor Name" 
                value={formData.name}
                onChange={handleInputChange} 
                required 
            />
            <input 
                name="documents_for" 
                placeholder="Documents For" 
                value={formData.documents_for}
                onChange={handleInputChange} 
                required 
            />
            <button type="submit">Add Professor</button>
        </form>
    );
};

export default CreateProfessor; 
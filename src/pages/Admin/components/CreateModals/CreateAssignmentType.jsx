import React, { useState } from 'react';

const CreateAssignmentType = ({ onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        type: '',
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
        <form onSubmit={handleSubmit}>
            <input 
                name="type" 
                placeholder="Assignment Type" 
                value={formData.type}
                onChange={handleInputChange} 
                required 
            />
            <button type="submit">Add Assignment Type</button>
        </form>
    );
};

export default CreateAssignmentType; 
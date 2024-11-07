import React, { useState } from 'react';

const CreateSemester = ({ onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        semester: '',
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
                name="semester" 
                placeholder="Semester" 
                value={formData.semester}
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
            <button type="submit">Add Semester</button>
        </form>
    );
};

export default CreateSemester; 
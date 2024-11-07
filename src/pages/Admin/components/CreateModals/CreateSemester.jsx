import React, { useState } from 'react';
import './CreateStyling.css';

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
        <form className="create-tag-form" onSubmit={handleSubmit}>
            <h2 className="modal-title">Create New Semester</h2>
            <input 
                name="semester" 
                placeholder="Semester" 
                value={formData.semester}
                onChange={handleInputChange} 
                required 
            />
            <button type="submit">Add Semester</button>
        </form>
    );
};

export default CreateSemester; 
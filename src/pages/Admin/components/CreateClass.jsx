import React, { useState } from 'react';

const CreateClass = ({ onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        department: '',
        course_number: '',
        course_name: '',
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
                name="department" 
                placeholder="Department" 
                value={formData.department}
                onChange={handleInputChange} 
                required 
            />
            <input 
                name="course_number" 
                placeholder="Course Number" 
                value={formData.course_number}
                onChange={handleInputChange} 
                required 
            />
            <input 
                name="course_name" 
                placeholder="Course Name" 
                value={formData.course_name}
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
            <button type="submit">Add Class</button>
        </form>
    );
};

export default CreateClass; 
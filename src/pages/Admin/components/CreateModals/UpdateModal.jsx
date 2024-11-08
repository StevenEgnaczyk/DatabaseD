import React, { useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import '../TagsTabInterface.css';

const UpdateModal = ({ db, collectionName, onSubmit, onClose, initialData, fields }) => {
    const [formData, setFormData] = useState({
        updated_at: new Date().toISOString(),
        ...initialData
    });
    const [oldNameInput, setOldNameInput] = useState('');
    const [newNameInput, setNewNameInput] = useState('');
    const [confirmNewNameInput, setConfirmNewNameInput] = useState('');

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            ...initialData
        }));
    }, [initialData]);

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
        if (oldNameInput !== initialData.name) {
            toast.error('The old name entered does not match.');
            return;
        }
        if (newNameInput !== confirmNewNameInput) {
            toast.error('The new names do not match.');
            return;
        }
        try {
            const docRef = doc(db, collectionName, initialData.id);
            await updateDoc(docRef, { ...formData, name: newNameInput });
            onClose();
            onSubmit();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Modal
            isOpen={true}
            onRequestClose={onClose}
            className="update-modal-content"
            overlayClassName="update-modal-overlay"
        >
            <h2 className="modal-title">Edit {collectionName}</h2>
            <form className="create-tag-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={oldNameInput}
                    onChange={(e) => setOldNameInput(e.target.value)}
                    placeholder={`Type old name "${initialData.name}" to confirm`}
                    required
                />
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
                <input
                    type="text"
                    value={newNameInput}
                    onChange={(e) => setNewNameInput(e.target.value)}
                    placeholder="Enter new name"
                    required
                />
                <input
                    type="text"
                    value={confirmNewNameInput}
                    onChange={(e) => setConfirmNewNameInput(e.target.value)}
                    placeholder="Confirm new name"
                    required
                />
                <div className="update-modal-actions">
                    <button className="update-cancel-button" type="button" onClick={onClose}>Cancel</button>
                    <button className="update-confirm-button" type="submit">Update {collectionName}</button>
                </div>
            </form>
        </Modal>
    );
};

export default UpdateModal; 
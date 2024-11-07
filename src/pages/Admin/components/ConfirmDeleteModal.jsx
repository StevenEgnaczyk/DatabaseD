import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

const ConfirmDeleteModal = ({ isOpen, onRequestClose, onConfirm, itemName }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleConfirm = () => {
        if (inputValue === itemName) {
            onConfirm();
            onRequestClose();
        } else {
            toast.error('The name entered does not match.');
        }
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h2 className="modal-title">Confirm Deletion</h2>
                <p className="modal-description">
                    You are about to delete:
                    <div className="item-name">
                        {itemName}
                    </div>
                    from the database. Please type the full name of the item to confirm deletion. DO NOT DO THIS IF YOU ARE:
                    <ol>
                        <li>NOT SURE</li>
                        <li>DRUNK</li>
                        <li>ADAM</li>
                    </ol>
                </p>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder={`Type "${itemName}" to confirm`}
                    className="modal-input"
                />
                <div className="modal-actions">
                    <button className="cancel-button" type="button" onClick={onRequestClose}>Cancel</button>
                    <button className="confirm-button" type="button" onClick={handleConfirm}>Confirm</button>
                </div>
            </Modal>
        </>
    );
};

export default ConfirmDeleteModal;
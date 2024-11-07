/* TabbedInterface.jsx imports */
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, getFirestore, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { FaSyncAlt, FaCheck, FaEdit, FaTrashAlt } from 'react-icons/fa';  // Import icons
import Modal from 'react-modal';
import { toast } from 'react-toastify';

import CreateProfessor from './CreateModals/CreateProfessor.jsx';
import CreateAssignmentType from './CreateModals/CreateAssignmentType.jsx';
import CreateClass from './CreateModals/CreateClass.jsx';
import CreateSemester from './CreateModals/CreateSemester.jsx';
import ConfirmDeleteModal from './ConfirmDeleteModal';

import './TagsTabInterface.css';

/* Component for the tags tab interface */
const TagsTabInterface = () => {

    /* State variable for the active tab */
    const [activeTab, setActiveTab] = useState('Professors');

    /* State variables for the tags data */
    const [professors, setProfessors] = useState([]);
    const [assignmentTypes, setAssignmentTypes] = useState([]);
    const [classNames, setClassNames] = useState([]);
    const [semesters, setSemesters] = useState([]);

    /* State for loading */
    const [loading, setLoading] = useState(true);

    /* State for modal visibility */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    /* Firebase services */
    const db = getFirestore();

    /* Fetch all tags */
    const fetchAllTags = async () => {
        setLoading(true); // Set loading to true before fetch starts
        const fetchData = async (collectionName, setState) => {
            const q = query(collection(db, collectionName));
            const querySnapshot = await getDocs(q);
            let data = [];
            querySnapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            });
            setState(data);
        };

        await Promise.all([
            fetchData("professors", setProfessors),
            fetchData("assignment_types", setAssignmentTypes),
            fetchData("class_names", setClassNames),
            fetchData("semesters", setSemesters)
        ]);
        setLoading(false); // Set loading to false once data is fetched
    };

    /* useEffect to fetch all tags on component mount */
    useEffect(() => {
        fetchAllTags();
    }, []);

    const handleSubmit = async (data) => {
        try {
            let collectionName = '';
            let formattedData = { ...data, status: 'pending' };

            switch (activeTab) {
                case 'Professors':
                    collectionName = 'professors';
                    break;
                case 'Assignment Types':
                    collectionName = 'assignment_types';
                    break;
                case 'Class Names':
                    collectionName = 'class_names';
                    break;
                case 'Semesters':
                    collectionName = 'semesters';
                    break;
                default:
                    console.error('Invalid tab selected');
                    return;
            }

            await addDoc(collection(db, collectionName), formattedData);
            await fetchAllTags();
            setIsModalOpen(false);
            toast.success(`New ${activeTab.slice(0, -1)} added successfully!`);
        } catch (error) {
            toast.error('Error adding document: ', error);
        }
    };

    const handleDelete = async (id) => {
        let collectionName = '';

        switch (activeTab) {
            case 'Professors':
                collectionName = 'professors';
                break;
            case 'Assignment Types':
                collectionName = 'assignment_types';
                break;
            case 'Class Names':
                collectionName = 'class_names';
                break;
            case 'Semesters':
                collectionName = 'semesters';
                break;
            default:
                console.error('Invalid tab selected');
                return;
        }

        console.log(`Attempting to delete document with id: ${id} from collection: ${collectionName}`);

        try {
            // Find the row element and add the animation class
            const rowElement = document.querySelector(`tr[data-id="${id}"]`);
            if (rowElement) {
                rowElement.classList.add('thanos-snap');
            }

            // Wait for the animation to complete before deleting
            setTimeout(async () => {
                await deleteDoc(doc(db, collectionName, id));
                console.log(`Document with id: ${id} from collection: ${collectionName} deleted successfully`);
                toast.success('Item deleted successfully!');
                fetchAllTags();
            }, 500); // Match the duration of the CSS animation
        } catch (error) {
            console.error(`Error deleting document with id: ${id} from collection: ${collectionName}`, error);
            toast.error('Error deleting document: ', error);
        }
    };

    const openConfirmModal = (item) => {
        console.log(item);
        setCurrentItem(item);
        setIsConfirmModalOpen(true);
    };

    const closeConfirmModal = () => {
        setIsConfirmModalOpen(false);
        setCurrentItem(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const renderModalContent = () => {
        switch (activeTab) {
            case 'Professors':
                return <CreateProfessor onSubmit={handleSubmit} onClose={closeModal} />;
            case 'Assignment Types':
                return <CreateAssignmentType onSubmit={handleSubmit} onClose={closeModal} />;
            case 'Class Names':
                return <CreateClass onSubmit={handleSubmit} onClose={closeModal} />;
            case 'Semesters':
                return <CreateSemester onSubmit={handleSubmit} onClose={closeModal} />;
            default:
                return null;
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const updateStatus = async (id, newStatus) => {
        const collectionName = {
            'Professors': 'professors',
            'Assignment Types': 'assignment_types',
            'Class Names': 'class_names',
            'Semesters': 'semesters'
        }[activeTab];

        if (!collectionName) {
            console.error('Invalid tab selected');
            return;
        }

        try {
            const docRef = doc(db, collectionName, id);
            await updateDoc(docRef, { status: newStatus });
            toast.success(`Status updated to ${newStatus}!`);
            fetchAllTags(); // Refresh the data to reflect changes
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Error updating status: ', error);
        }
    };

    /* Render the content for the active tab */
    const renderTabContent = () => {
        const getStatusBackgroundColor = (status) => {
            switch (status) {
                case 'active':
                    return 'green';
                case 'inactive':
                    return 'gray';
                default:
                    return 'purple';
            }
        };

        const renderActions = (item) => {
            const approveColor = item.status === 'pending' ? 'green' : 'gray';
            return (
                <td className="actions-cell">
                    <div className="action-buttons">
                        <FaCheck
                            className={`icon ${approveColor}`}
                            onClick={() => item.status === 'pending' && updateStatus(item.id, 'approved')}
                        />
                        <FaEdit className="icon blue" />
                        <FaTrashAlt className="icon red" onClick={() => openConfirmModal(item)} />
                    </div>
                </td>
            );
        };

        if (loading) {
            return <div className="loading">Loading...</div>;
        }

        switch (activeTab) {
            case 'Professors':
                return (
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Documents For</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {professors.map(prof => (
                                    <tr key={prof.id} data-id={prof.id}>
                                        <td data-label="Name">{prof.name}</td>
                                        <td data-label="Documents For">{prof.documents_for}</td>
                                        <td
                                            style={{ backgroundColor: getStatusBackgroundColor(prof.status), textAlign: 'center' }}
                                            data-label="Status"
                                        >
                                            {prof.status}
                                        </td>
                                        {renderActions(prof)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'Assignment Types':
                return (
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Assignment Type</th>
                                    <th>Documents For</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignmentTypes.map(type => (
                                    <tr key={type.id} data-id={type.id}>
                                        <td data-label="Assignment Type">{type.type}</td>
                                        <td data-label="Documents For">{type.documents_for}</td>
                                        <td
                                            style={{ backgroundColor: getStatusBackgroundColor(type.status), textAlign: 'center' }}
                                            data-label="Status"
                                        >
                                            {type.status}
                                        </td>
                                        {renderActions(type)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'Class Names':
                return (
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Class ID</th>
                                    <th>Course Name</th>
                                    <th>Documents For</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classNames.map(name => (
                                    <tr key={name.id} data-id={name.id}>
                                        <td data-label="Class ID">{name.department} {name.course_number}</td>
                                        <td data-label="Course Name">{name.course_name}</td>
                                        <td data-label="Documents For">{name.documents_for}</td>
                                        <td
                                            style={{ backgroundColor: getStatusBackgroundColor(name.status), textAlign: 'center' }}
                                            data-label="Status"
                                        >
                                            {name.status}
                                        </td>
                                        {renderActions(name)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'Semesters':
                return (
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Semester</th>
                                    <th>Documents For</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {semesters.map(semester => (
                                    <tr key={semester.id} data-id={semester.id}>
                                        <td data-label="Semester">{semester.semester}</td>
                                        <td data-label="Documents For">{semester.documents_for}</td>
                                        <td
                                            style={{ backgroundColor: getStatusBackgroundColor(semester.status), textAlign: 'center' }}
                                            data-label="Status"
                                        >
                                            {semester.status}
                                        </td>
                                        {renderActions(semester)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            default:
                return null;
        }
    };

    /* Render the tags tab interface */
    return (
        <div className="tags-tab-panel">
            <h2>
                Manage Tags
                <button onClick={openModal} className="open-modal-button">Create New</button>
            </h2>
            <div className="tabs-header">
                <button onClick={() => setActiveTab('Professors')} className={activeTab === 'Professors' ? 'active' : ''}>Professors</button>
                <button onClick={() => setActiveTab('Assignment Types')} className={activeTab === 'Assignment Types' ? 'active' : ''}>Assignment Types</button>
                <button onClick={() => setActiveTab('Class Names')} className={activeTab === 'Class Names' ? 'active' : ''}>Class Names</button>
                <button onClick={() => setActiveTab('Semesters')} className={activeTab === 'Semesters' ? 'active' : ''}>Semesters</button>
                <FaSyncAlt className="refresh-icon" onClick={fetchAllTags} /> {/* Refresh Icon */}
            </div>
            <div className="tab-content">
                {renderTabContent()}
            </div>
            <Modal 
                isOpen={isModalOpen} 
                onRequestClose={closeModal}
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                {renderModalContent()}
            </Modal>
            {currentItem && (
                <ConfirmDeleteModal
                    isOpen={isConfirmModalOpen}
                    onRequestClose={closeConfirmModal}
                    onConfirm={() => handleDelete(currentItem.id)}
                    itemName={currentItem.name || currentItem.course_name || currentItem.semester || currentItem.type}
                />
            )}
        </div>
    );
};

export default TagsTabInterface;

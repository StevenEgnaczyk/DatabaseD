/* FileQueryBar.jsx Imports */
import React, {useState, useEffect} from "react";
import './FileQueryBar.css'
import AssignmentTypeDropdown from './../Dropdowns/AssignmentType';
import ClassNameDropdown from './../Dropdowns/ClassName';
import ProfessorNameDropdown from './../Dropdowns/ProfessorName';
import SemesterDropdown from './../Dropdowns/Semester';

/* Component for the search bar and filter dropdowns 
    files - array of file objects
    setFilteredFiles - function to update the filtered files in Home */
const FileQueryBar = ({ files, setFilteredFiles }) => {

    const [search, setSearch] = useState('');
    const [selectedClassName, setSelectedClassName] = useState('');
    const [selectedProfessorName, setSelectedProfessorName] = useState('');
    const [selectedAssignmentType, setSelectedAssignmentType] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');

    // Add reset function
    const resetFilters = () => {
        setSearch('');
        setSelectedClassName('');
        setSelectedProfessorName('');
        setSelectedAssignmentType('');
        setSelectedSemester('');
        // Reset filtered files to show all files
        setFilteredFiles(files);
    };

    // Add useEffect to handle filtering when any dropdown selection changes
    useEffect(() => {
        if (!files) return;
        
        let filtered = [...files];

        // Filter by class name
        if (selectedClassName) {
            filtered = filtered.filter(file => file.className === selectedClassName);
        }

        // Filter by professor
        if (selectedProfessorName) {
            filtered = filtered.filter(file => file.professor === selectedProfessorName);
        }

        // Filter by assignment type
        if (selectedAssignmentType) {
            filtered = filtered.filter(file => file.type === selectedAssignmentType);
        }

        // Filter by semester
        if (selectedSemester) {
            filtered = filtered.filter(file => file.semester === selectedSemester);
        }

        // Apply search filter if exists
        if (search && search.trim() !== '') {
            const searchTerms = search.split(' ').filter(term => term.trim() !== '');
            filtered = filtered.filter(file => 
                searchTerms.some(term => 
                    (file.name && new RegExp(`\\b${term}\\b`, 'i').test(file.name)) || 
                    (file.className && new RegExp(`\\b${term}\\b`, 'i').test(file.className)) || 
                    (file.professor && new RegExp(`\\b${term}\\b`, 'i').test(file.professor)) ||
                    (file.year && new RegExp(`\\b${term}\\b`, 'i').test(file.year.toString())) || 
                    (file.fileType && new RegExp(`\\b${term}\\b`, 'i').test(file.fileType))
                )
            );
        }

        setFilteredFiles(filtered);
    }, [selectedClassName, selectedProfessorName, selectedAssignmentType, selectedSemester, search, files, setFilteredFiles]);

    /* Update search state with input value */
    function handleInputChange(event) {
        setSearch(event.target.value);
    }

    /* Render the search bar and filter dropdowns */
    return (
        <div className={"filter-container"}>

            {/* Search bar */}
            <div className={"search-bar"}>
                <input 
                    type="text" 
                    value={search}
                    onChange={handleInputChange}
                    placeholder="Search Documents..."
                    onFocus={(e) => e.target.placeholder = ''} 
                    onBlur={(e) => e.target.placeholder = 'Search Documents...'} 
                />
                <button type="button" className={"search-button"}>🔍</button>
                <button 
                    type="button" 
                    className={"reset-button"}
                    onClick={resetFilters}
                >
                    Reset Filters
                </button>
            </div>

            {/* Filter dropdowns */}
            <div className={"filter-dropdowns"}>
                <ClassNameDropdown 
                    selectedClassName={selectedClassName}
                    setSelectedClassName={setSelectedClassName}
                />
                <ProfessorNameDropdown 
                    selectedProfessorName={selectedProfessorName}
                    setSelectedProfessorName={setSelectedProfessorName}
                />
                <SemesterDropdown 
                    selectedSemester={selectedSemester}
                    setSelectedSemester={setSelectedSemester}
                />
                <AssignmentTypeDropdown 
                    selectedAssignmentType={selectedAssignmentType}
                    setSelectedAssignmentType={setSelectedAssignmentType}
                />
            </div>
        </div>
    )
}

export default FileQueryBar;
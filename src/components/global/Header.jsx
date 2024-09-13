import React, {useState} from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import {Link, useLocation} from 'react-router-dom'
import './Header.css'
import Modal from '../model/Modal';
import AddEmployee from '../add-employee/AddEmployee';

export default function Header({ showNav, setShowNav, handleLogout, addEmployee, updateEmployee, deleteEmployee, employees, moveToFormer }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [viewOnly, setViewOnly] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAllEmployeesPage = location.pathname === '/all-employees';


  const handleAddEmployee = () => {
    setCurrentEmployee(null);
    setIsEditing(false);
    setViewOnly(false);
    setIsModalOpen(true);
  };


  const handleEmployeeClick = (employee) => {
    setCurrentEmployee(employee);
    setIsModalOpen(true);
    setIsEditing(false);
    setViewOnly(true);
  };


  const handleSearch = () => {
    const employee = employees.find(emp => emp.id === searchQuery);
    if (employee) {
      console.log('Searched Employee:', employee);
      setCurrentEmployee(employee)
      setSearchResult(employee);
      setIsModalOpen(true);
      setIsEditing(true);
      setViewOnly(true);
    } else {
      setSearchResult(null);
      alert('Employee not found');
    }
  };


  const handleDelete = (employee) => {
    deleteEmployee(employee);
    moveToFormer(employee);
    setIsModalOpen(false);
  };


  const handleLogoutConfirmation = () => {
    const isConfirmed = window.confirm('Are you sure you want to log out?');
    if (isConfirmed) {
      handleLogout();
    }
  };


  return (
    <>
    <header className="header">
      <div className='logoAndMenu'>
        <img src="Green Simple Eco Energy Logo1.png" alt="logo" className="logo" />
      <GiHamburgerMenu className="burger-menu" onClick={() => setShowNav(!showNav)} />
      
      </div>
      
      <div className="header-right">
        
        <div className="search">
          <input type="text" placeholder="Search by ID..."
          className="search-input" value ={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
        
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>

        <div className="btns">
          {isAllEmployeesPage && (
          <button className="add-employee-button" onClick={handleAddEmployee}>Add Employee</button>
        )}
        {isHomePage && (
          <button className="logout-button" onClick={handleLogoutConfirmation}>Logout</button>
        )}
        
        </div>
        
      </div>
    </header>


    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <AddEmployee
      addEmployee={addEmployee}
      updateEmployee={updateEmployee}
      isEditing={isEditing}
      onDelete={handleDelete}
      currentEmployee={currentEmployee}
      setIsEditing={setIsEditing}
      viewOnly={viewOnly}
      setViewOnly={setViewOnly} />
    </Modal>
    </>
  )
}

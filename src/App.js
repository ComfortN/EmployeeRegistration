import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login/login';
import Home from './components/home/home';
import Header from './components/global/Header'
import SideNav from './components/global/Side-nav';
import AllEmployees from './components/all-employees/AllEmp';
import FormerEmployees from './components/all-employees/FormerEmpl'
import AddEmployee from './components/add-employee/AddEmployee';
import Modal from './components/model/Modal';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [showNav, setShowNav] = useState(false)
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState([]);
  const [formerEmployees, setFormerEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [viewOnly, setViewOnly] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const adminDetails = {
    name: 'Nqobile Ngwenya',
    email: 'admin@example.com',
    image: './258Comfort Ngwenya congwen022.jpg'
  };

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  useEffect(() => {
    const storedEmployees = localStorage.getItem('employees');
    const storedFormerEmployees = localStorage.getItem('formerEmployees');
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    }
    if (storedFormerEmployees) {
      setFormerEmployees(JSON.parse(storedFormerEmployees));
    }
  }, []);

  // Save employees to local storage whenever they change
  useEffect(() => {
    
    localStorage.setItem('employees', JSON.stringify(employees));
    localStorage.setItem('formerEmployees', JSON.stringify(formerEmployees));
  }, [employees, formerEmployees]);


  const handleLogin = () => {
    setIsAuthenticated(true);
  };


  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('employees');
  localStorage.removeItem('formerEmployees');
  }



  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);

  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(employees.map(emp => (emp.id === updatedEmployee.id ? updatedEmployee : emp)));
   
  };

  const deleteEmployee = (employee) => {
   
    // setEmployees(employees.filter(emp => emp.id !== employee.id));
    moveToFormerEmployees(employee);
  };


  const moveToFormerEmployees = (employee) => {
    setFormerEmployees([...formerEmployees, employee]);
    setEmployees(employees.filter(emp => emp.id !== employee.id))
  };


  const handleEmployeeClick = (employee) => {
    setCurrentEmployee(employee);
    setIsEditing(true);
    setViewOnly(true);
    setIsModalOpen(true);
  };



  return (
    <div className="App">
      
  
    <>
      <Router>
        
      {isAuthenticated && (
        <>
          <Header
          showNav={showNav}
          setShowNav={setShowNav}
          handleLogout={handleLogout}
          addEmployee={addEmployee}
          updateEmployee={updateEmployee}
          deleteEmployee={deleteEmployee}
          employees={employees}
          moveToFormer={moveToFormerEmployees}
          />
          <SideNav show={showNav} adminDetails={adminDetails} />
        </>
      )}
        
      
        <div className={isAuthenticated ? 'main': ''}>
          <Routes>
            <Route path='/login' element={<Login onLogin={handleLogin}/>} />
            <Route path='/' element={isAuthenticated ? <Home employees={employees} /> : <Navigate to={"/login"}/>} />
            <Route path='/all-employees' element={isAuthenticated ? <AllEmployees title="All Employees" employees={employees} onEmployeeClick={handleEmployeeClick}/> : <Navigate to={"/login"}/>} />
            <Route path='/former-employees' element={isAuthenticated ? <AllEmployees title="Former Employees" employees={formerEmployees} onEmployeeClick={handleEmployeeClick}/> : <Navigate to={"/login"}/>} />

          </Routes>
          
        </div>
          
      </Router>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddEmployee
          addEmployee={addEmployee}
          updateEmployee={updateEmployee}
          isEditing={isEditing}
          onDelete={deleteEmployee}
          currentEmployee={currentEmployee}
          setIsEditing={setIsEditing}
          viewOnly={viewOnly}
          setViewOnly={setViewOnly}
        />
      </Modal>
    </>
    </div>
  );
}

export default App;

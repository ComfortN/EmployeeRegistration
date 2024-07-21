import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login/login';
import Home from './components/home/home';
import Header from './components/global/Header'
import SideNav from './components/global/Side-nav';
import AllEmployees from './components/all-employees/AllEmp';
import FormerEmployees from './components/all-employees/FormerEmpl'
// import { GiHamburgerMenu } from "react-icons/gi";
// import AddEmployee from './components/add-employee/AddEmployee';
import Modal from './components/model/Modal';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showNav, setShowNav] = useState(false)
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState([]);
  const [formerEmployees, setFormerEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [viewOnly, setViewOnly] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleLogin = () => {
    setIsAuthenticated(true);
  };


  const handleLogout = () => {
    setIsAuthenticated(false);
  }

  

  // const employees = [
  //   { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', position: 'Manager' },
  //   { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', position: 'Developer' },
  //   { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', position: 'Manager' },
  //   { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', position: 'Developer' }
  // ];


  // const formerEmployees = [
  //   { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '123-456-7890', position: 'Analyst' },
  //   { id: 4, name: 'Emily Davis', email: 'emily@example.com', phone: '098-765-4321', position: 'Designer' }
  // ];


  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
    // setIsModalOpen(false);
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(employees.map(emp => (emp.id === updatedEmployee.id ? updatedEmployee : emp)));
   
  };

  const deleteEmployee = (employee) => {
    setFormerEmployees([...formerEmployees, employee]);
    setEmployees(employees.filter(emp => emp.id !== employee.id));
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
          />
          <SideNav show={showNav} />
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
    </>
    </div>
  );
}

export default App;

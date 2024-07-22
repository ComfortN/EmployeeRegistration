// import React, {useState} from 'react';
import './home.css'
// import SideNav from '../global/Side-nav'
import AllEmp from '../all-employees/AllEmp'


export default function Home({employees, onEmployeeClick}) {

  

  
  const totalEmployees = Array.isArray(employees) ? employees.length : 0;
  const recentEmployees = Array.isArray(employees) ? employees.slice(-5) : [];
  return (
    <div className="dashboard">
        <h1>Employee Registration System</h1>
        <div className="dashboard-summary">
          <div className="summary-card">
            <h2>Total Employees</h2>
            <p>{totalEmployees}</p>
          </div>
          <div className="summary-card">
            <h2>Recently Added</h2>
            <ul>
              {recentEmployees.map(employee => (
                <li key={employee.id}>{employee.name}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="employee-table">
        <AllEmp title="All Employees" employees={employees} onEmployeeClick={onEmployeeClick} />
      </div>

       
      </div>
  )
}

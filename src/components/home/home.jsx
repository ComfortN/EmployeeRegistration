// import React, {useState} from 'react';
import './home.css'
// import SideNav from '../global/Side-nav'
import AllEmp from '../all-employees/AllEmp'


export default function Home(employees) {

  const currentEmployees = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', position: 'Manager' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', position: 'Developer' },
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', position: 'Manager' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', position: 'Developer' }
  ];

  // const [showNav, setShowNav] = useState(false)
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
        <div className="dashboard-actions">
          <button onClick={() => { /* Handle add new employee action */ }}>Add New Employee</button>
          <button onClick={() => { /* Handle view all employees action */ }}>View All Employees</button>
          <button onClick={() => { /* Handle view employees who left action */ }}>View Employees Who Left</button>
        </div>
        <div className="dashboard-recent-activities">
          <h2>Recent Activities</h2>
          {/* Display recent activities like additions, updates, and deletions */}
        </div>


        <div className="employee-list-section">
        <AllEmp title="All Employees" employees={currentEmployees} />
      </div>
      </div>
  )
}

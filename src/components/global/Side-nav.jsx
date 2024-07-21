import React from 'react'
import './sideNav.css'
// import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';

export default function SideNav({show}) {
  return (
    <div className={show ? 'sidebar active' : 'sidebar'}>
      <div className='profile'>
        <div className="profileImg">
          <img src="./258Comfort Ngwenya congwen022.jpg" alt="" className='prof' />
        </div>
        <p>Name</p>
      </div>
      <div className="sideLinks">
        <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/all-employees'>All employees</Link></li>
        <li><Link to='/former-employees'>Former employees</Link></li>
      </ul>
      </div>
      

    </div>
  )
}

import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../global/Header';
import SideNav from '../global/Side-nav';

export default function Layout() {
  return (
    <div className="main-layout">
      <Header />
      <SideNav />
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}

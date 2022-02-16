import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './Navbar.css'

const NavBar = () => {
  const [sidebar, setSidebar] = useState(false)
  const user = useSelector(state => state.session.user)
  const handleSidebar = () => {
    setSidebar(!sidebar)
  }


  return (
    <>
      <div className='navbar'>
        <NavLink to="#" className="menu-bars">
          <i className="fa-solid fa-bars" onClick={handleSidebar}></i>
        </NavLink>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className='nav-menu-items'>
          <li className='navbar-toggle'>
            <NavLink to="#" className="menu-bars">
            <i className="fa-solid fa-circle-xmark" onClick={handleSidebar}></i>
            </NavLink>
          </li>

          <li className='nav-text' onClick={handleSidebar}>
            <NavLink to="/">
              <span onClick={handleSidebar} >Home</span>
            </NavLink>
          </li>

          <li className='nav-text' onClick={handleSidebar}>
            <NavLink to={`/p/${user.id}`}>
              <span onClick={handleSidebar}>Dashboard</span>
            </NavLink>
          </li>

          <li className='nav-text' onClick={handleSidebar}>
            <NavLink to="#">
              <span onClick={handleSidebar}>Top Increase</span>
            </NavLink>
          </li>

          <li className='nav-text' onClick={handleSidebar}>
            <NavLink to="#">
              <span onClick={handleSidebar}>Top Decrease</span>
            </NavLink>
          </li>

          <li>
            <LogoutButton onClick={handleSidebar}/>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;

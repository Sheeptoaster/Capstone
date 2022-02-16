import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './Navbar.css'

const NavBar = () => {
  const [sidebar, setSidebar] = useState(false)

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

          <li className='nav-text'>
            <NavLink to="#">
              <span>Home</span>
            </NavLink>
          </li>

          <li className='nav-text'>
            <NavLink to="#">
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li className='nav-text'>
            <NavLink to="#">
              <span>Portfolio</span>
            </NavLink>
          </li>

          <li className='nav-text'>
            <NavLink to="#">
              <span>Watchlist</span>
            </NavLink>
          </li>

          <li className='nav-text'>
            <NavLink to="#">
              <span>Top Increase</span>
            </NavLink>
          </li>

          <li className='nav-text'>
            <NavLink to="#">
              <span>Top Decrease</span>
            </NavLink>
          </li>

        </ul>
      </nav>
    </>
  );
}

export default NavBar;

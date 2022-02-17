import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import './Navbar.css'

library.add(faBell);

const NavBar = ({ notifications }) => {
  const [sidebar, setSidebar] = useState(false)
  const user = useSelector(state => state.session.user)
  const handleSidebar = () => {
    setSidebar(!sidebar)
  }

  let alert

  if (notifications > 0) {
    alert = <li className='nav-text alert-ready' onClick={handleSidebar} style={{"backgroundColor": "red", "borderRadius": ".25em"}}>
    <NavLink to={`/p/${user.id}`}>
      <span onClick={handleSidebar}>Dashboard</span>
      <FontAwesomeIcon icon="bell" />
    </NavLink>
  </li>
  } else {
    alert = <li className='nav-text' onClick={handleSidebar}>
    <NavLink to={`/p/${user.id}`}>
      <span onClick={handleSidebar}>Dashboard</span>
    </NavLink>
  </li>
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

          {alert}


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

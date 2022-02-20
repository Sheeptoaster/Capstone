import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBell, faEnvelope, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import './Navbar.css'

library.add(faBell, faEnvelope, faEnvelopeOpen);

const NavBar = ({ notifications }) => {
  const [sidebar, setSidebar] = useState(false)
  const user = useSelector(state => state.session.user)
  const handleSidebar = () => {
    setSidebar(!sidebar)
  }

  //Declare alert var
  let alert
  let envelope
  //Check for amount of stocks that are under priceAlert val in Watchlist
  //Sets styling based on result
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

  if (notifications > 0) {
    envelope = <div className='nav-icon-envelope-open'>
      <NavLink to={`/p/${user.id}`}>
        <FontAwesomeIcon icon='envelope-open' />
      </NavLink>
    </div>
  } else {
    envelope = <div className='nav-icon-envelope'>
      <NavLink to={`/p/${user.id}`}>
        <FontAwesomeIcon className='fas-5x' icon='envelope' />
      </NavLink>
    </div>
  }



  return (
    <>
    <div>
      {envelope}
      <h2 className='h2-nav-logo'><NavLink to={'/'}>Logo Position</NavLink></h2>
    </div>
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
            <a href="https://github.com/Sheeptoaster/Capstone" target={"_blank"}>
              <span onClick={handleSidebar}>Github Repo</span>
            </a>
          </li>

          <li className='nav-text' onClick={handleSidebar}>
            <a href="https://www.linkedin.com/in/jacob-weber-662a08153/" target={"_blank"}>
              <span onClick={handleSidebar}>LinkedIn</span>
            </a>
          </li>

          <li className='nav-text logout-btn'>
            <a href="#">
              <LogoutButton onClick={handleSidebar}/>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;

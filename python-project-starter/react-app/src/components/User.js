import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import PortfolioMain from './auth/Portfolio/PortfolioMain';

function User() {
  const [user, setUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="profile-navbar container">
        <nav className='profile-navbar'>
          <ul className='profile-nav-items'>
            <li className='nav-items'>
              <NavLink className='nav-item-group nav-link text-underlined' to='/portfolio'>
                Portfolio
              </NavLink>
              <NavLink className='nav-item-group nav-link text-underlined' to='/portfolio'>
                Portfolio
              </NavLink>
              <NavLink className='nav-item-group nav-link text-underlined' to='/portfolio'>
                Portfolio
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <PortfolioMain />
    </>
  );
}
export default User;
